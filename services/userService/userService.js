const jwt = require("jsonwebtoken");
const jwt_private_key = process.env.JWT_PRIVATE_KEY;
const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const { userRequestValidator } = require("../../validator/userValidator");
const searchTextFields = require("../../utils/userFilter");
const { encoder, decoder } = require("../../utils/encoder&decoder");
const { STATUSCODE } = require("../../constants/enums");
const enMessage = require("../../constants/enMessage.json");
const { user_type_data } = require("../../constants/common");
const { findOne } = require("../../query/common");

const createUser = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const newUser = req.body;
    let sendToJoiValidator = {};
    sendToJoiValidator.name = newUser.name;
    sendToJoiValidator.user_name = newUser.user_name;
    sendToJoiValidator.password = newUser.password;

    const { error } = userRequestValidator(sendToJoiValidator);
    if (error)
      return res.status(STATUSCODE.badRequest).send({
        statusCode: STATUSCODE.badRequest,
        error: error.details[0].message,
      });

    const query = findOne("users", "user_name", newUser.user_name);
    const existUser = await query;
    if (existUser.rowCount != 0) {
      return res
        .status(STATUSCODE.badRequest)
        .send({ statusCode: STATUSCODE.badRequest, message: en.existUser });
    }
    const hashPassword = await encoder(newUser.password);

    const user = await db.query(
      `INSERT INTO users (name,user_name,password,user_type,is_deleted,created_at,updated_at) VALUES('${
        newUser.name
      }','${newUser.user_name}','${hashPassword}','${
        newUser.user_type
      }',${false},'${now}','${now}') RETURNING *`
    );
    let permissionList = [];
    for (let permission of newUser.permissions) {
      const result = await db.query(
        `INSERT INTO user_access_permissions (user_id,permission_id,created_at,updated_at) VALUES('${user.rows[0].id}','${permission}','${now}','${now}') RETURNING permission_id`
      );
      permissionList.push(result.rows[0].permission_id);
    }

    return res.status(STATUSCODE.created).send({
      statusCode: STATUSCODE.created,
      message: enMessage.user_creation_success,
      user: user.rows[0],
      permissions: permissionList,
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUSCODE.internalServerError).send({
      statusCode: STATUSCODE.internalServerError,
      message: enMessage.user_creation_failure,
      error: err,
    });
  }
};

const loginUser = async (req, res) => {
  const user = req.body;
  try {
    const query = findOne("users", "user_name", user.user_name);
    const existUser = await query;
    if (existUser.rowCount == 0)
      return res
        .status(STATUSCODE.notFound)
        .send({ statusCode: STATUSCODE.notFound, message: en.invalid });

    const hashPassword = existUser.rows[0].password;
    const decryptedPassword = await decoder(hashPassword);
    if (decryptedPassword != user.password)
      return res
        .status(STATUSCODE.badRequest)
        .send({ statusCode: STATUSCODE.badRequest, message: en.invalid });

    const permissions = await db.query(
      `SELECT permission_id FROM user_access_permissions WHERE user_id = ${existUser.rows[0].id}`
    );
    let permissionList = [];
    for (var pId of permissions.rows) {
      permissionList.push(pId.permission_id);
    }
    const token = jwt.sign(
      {
        id: existUser.rows[0].id,
        permissions: permissionList,
      },
      `${jwt_private_key}`
    );
    return res.send({
      message: en.loginSuccessfully,
      data: existUser.rows,
      token: token,
      code: STATUSCODE.ok,
    });
  } catch (err) {
    res.status(STATUSCODE.internalServerError).send({
      statusCode: STATUSCODE.internalServerError,
      message: en.loginFailed,
      error: err,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    var filterQuery = req.query;
    if (Object.keys(filterQuery).length != 0) {
      let users = await db.query(
        `SELECT *,(SELECT ARRAY(SELECT p.permission_id FROM user_access_permissions p WHERE p.user_id = users.id))AS permissions FROM users  ORDER BY users.id`
      );
      for (var i = 0; i < users.rowCount; i++) {
        users.rows[i].password = await decoder(users.rows[i].password);
      }
      //SearchString
      users = users.rows.filter(
        (user) =>
          user.user_name
            .toLowerCase()
            .includes(filterQuery.searchString?.toLowerCase()) ||
          user.name
            .toLowerCase()
            .includes(filterQuery.searchString?.toLowerCase())
      );

      users = users?.map((item, index) => {
        let userTypeData = user_type_data.find(
          (userTypeItem) => userTypeItem.id === Number(item.user_type)
        );
        return {
          ...item,
          sNo: index + 1,
          role: userTypeData?.user_type,
        };
      });

      return res.status(STATUSCODE.ok).send({
        statusCode: STATUSCODE.ok,
        message: enMessage.listed_success,
        users: users,
      });
    }
    const users = await db.query(
      `SELECT *,(SELECT ARRAY(SELECT p.permission_id FROM user_access_permissions p WHERE p.user_id = users.id))AS permissions FROM users ORDER BY users.id`
    );
    for (var i = 0; i < users.rowCount; i++) {
      users.rows[i].password = await decoder(users.rows[i].password);
    }
    console.log(users.rows, " users.rows");
    return res.status(STATUSCODE.ok).send({
      statusCode: STATUSCODE.ok,
      message: enMessage.listed_success,
      users: users.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUSCODE.internalServerError).send({
      statusCode: STATUSCODE.internalServerError,
      message: enMessage.listed_failure,
      error: err,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const users = await db.query(
      `SELECT *,(SELECT ARRAY(SELECT p.permission_id FROM user_access_permissions p WHERE p.user_id = users.id))AS permissions FROM users WHERE users.id = ${req.params.id} ORDER BY users.id`
    );
    if (users.rowCount == 0) {
      return res.status(STATUSCODE.notFound).send({
        statusCode: STATUSCODE.notFound,
        message: en.userNotFoundWithId,
      });
    }
    // Decode the password
    users.rows[0].password = await decoder(users.rows[0].password);

    return res.status(STATUSCODE.ok).send({
      statusCode: STATUSCODE.ok,
      message: enMessage.listed_success,
      user: users.rows[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUSCODE.internalServerError).send({
      statusCode: STATUSCODE.internalServerError,
      message: enMessage.listed_failure,
      error: err,
    });
  }
};

const replaceUser = async (req, res) => {
  try {
    const now = new Date().toISOString();
    let UserRequest = req.body;
    let sendToJoiValidator = {};
    sendToJoiValidator.name = UserRequest.name;
    sendToJoiValidator.user_name = UserRequest.user_name;
    sendToJoiValidator.password = UserRequest.password;

    const { error } = userRequestValidator(sendToJoiValidator);
    if (error)
      return res.status(STATUSCODE.badRequest).send({
        statusCode: STATUSCODE.badRequest,
        error: error.details[0].message,
      });
    const query = findOne("users", "id", req.params.id);

    //Check user already exist in the table
    const existUser = await query;
    if (existUser.rowCount == 0)
      return res
        .status(STATUSCODE.notFound)
        .send({ statusCode: STATUSCODE.notFound, message: en.userNotFound });

    //Check user_name already exist condn
    if (existUser.rows[0].user_name != UserRequest.user_name) {
      const query = findOne("users", "user_name", UserRequest.user_name);
      const userName = await query;
      if (userName.rowCount != 0) {
        return res
          .status(STATUSCODE.badRequest)
          .send({ statusCode: STATUSCODE.badRequest, message: en.existUser });
      }
    }
    // encode the password
    if (UserRequest.password != existUser.rows[0].password) {
      UserRequest.password = await encoder(UserRequest.password);
    }
    const updateQuery = `UPDATE users SET 
                             name = '${UserRequest.name}', 
                             user_name = '${UserRequest.user_name}',
                             password = '${UserRequest.password}',
                             user_type = '${UserRequest.user_type}',
                             updated_at = '${now}'
                             WHERE id = ${req.params.id} RETURNING *`;
    const userResult = await db.query(updateQuery);

    await db.query(
      `DELETE FROM user_access_permissions WHERE user_id = ${req.params.id}`
    );

    let permissionList = [];
    for (let permission of UserRequest.permissions) {
      const result = await db.query(
        `INSERT INTO user_access_permissions (user_id,permission_id,created_at,updated_at) VALUES('${existUser.rows[0].id}','${permission}','${now}','${now}')  RETURNING permission_id`
      );
      permissionList.push(result.rows[0].permission_id);
    }

    return res.status(STATUSCODE.created).send({
      statusCode: STATUSCODE.ok,
      message: enMessage.user_updation_success,
      user: userResult.rows[0],
      permissions: permissionList,
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUSCODE.internalServerError).send({
      statusCode: STATUSCODE.internalServerError,
      message: enMessage.user_updation_failure,
      error: err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const now = new Date().toISOString();
    let UserRequest = req.body;
    const query = findOne("users", "id", req.params.id);
    const existUser = await query;

    if (existUser.rowCount == 0)
      return res
        .status(STATUSCODE.notFound)
        .send({ statusCode: STATUSCODE.notFound, message: en.userNotFound });

    if (existUser.rows[0].user_name != UserRequest.user_name) {
      const query = findOne("users", "user_name", UserRequest.user_name);
      const userName = await query;
      if (userName.rowCount != 0) {
        return res
          .status(STATUSCODE.badRequest)
          .send({ statusCode: STATUSCODE.badRequest, message: en.existUser });
      }
    }

    const updateName =
      UserRequest.name == null ? existUser.rows[0].name : UserRequest.name;
    const updateUserName =
      UserRequest.user_name == null
        ? existUser.rows[0].user_name
        : UserRequest.user_name;
    let updatePassword =
      UserRequest.password == null
        ? existUser.rows[0].password
        : UserRequest.password;
    const updateUserType =
      UserRequest.user_type == null
        ? existUser.rows[0].user_type
        : UserRequest.user_type;

    if (updatePassword != existUser.rows[0].password) {
      updatePassword = await encoder(updatePassword);
    }

    const updateQuery = `UPDATE users SET 
                             name = '${updateName}', 
                             user_name = '${updateUserName}',
                             password = '${updatePassword}',
                             user_type = '${updateUserType}',
                             updated_at = '${now}'
                             WHERE id = ${req.params.id} RETURNING *`;
    const userResult = await db.query(updateQuery);
    // update user_access_permissions
    await db.query(
      `DELETE FROM user_access_permissions WHERE user_id = ${req.params.id}`
    );
    let permissionList = [];
    for (let permission of UserRequest.permissions) {
      const result = await db.query(
        `INSERT INTO user_access_permissions (user_id,permission_id,created_at,updated_at) VALUES('${existUser.rows[0].id}','${permission}','${now}','${now}')  RETURNING permission_id`
      );
      permissionList.push(result.rows[0].permission_id);
    }

    return res.status(STATUSCODE.created).send({
      statusCode: STATUSCODE.ok,
      message: enMessage.user_updation_success,
      user: userResult.rows[0],
      permissions: permissionList,
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUSCODE.internalServerError).send({
      statusCode: STATUSCODE.internalServerError,
      message: enMessage.user_updation_failure,
      error: err,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const query = findOne("users", "id", req.params.id);
    const existUser = await query;
    if (existUser.rowCount == 0) {
      return res
        .status(STATUSCODE.notFound)
        .send({ statusCode: STATUSCODE.notFound, message: en.userNotFound });
    }
    await db.query(`DELETE FROM users WHERE id = ${req.params.id}`);
    await db.query(
      `DELETE FROM user_access_permissions WHERE user_id = ${req.params.id}`
    );
    return res.status(STATUSCODE.noContent).send({
      statusCode: STATUSCODE.noContent,
      message: enMessage.user_deletion_success,
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUSCODE.internalServerError).send({
      statusCode: STATUSCODE.internalServerError,
      message: enMessage.user_deletion_failure,
      error: err,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  replaceUser,
  updateUser,
  deleteUser,
};
