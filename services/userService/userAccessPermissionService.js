const { UserAccessPermission } = require("../../models");
const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const RestAPI = require("../../constants/enums");
const enMessage = require("../../constants/enMessage.json");
const { findOne } = require("../../query/common");

const createUserAccessPermission = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const newUserAccessPermission = req.body;
    let userAccessPermission = [];

    for (let permission of newUserAccessPermission) {
      const existUserAccessPermission = await db.query(
        `SELECT * FROM user_access_permissions WHERE user_id = $1 AND permission_id = $2;`,
        [permission.user_id, permission.permission_id]
      );

      if (existUserAccessPermission.rowCount != 0) {
        return res
          .status(RestAPI.STATUSCODE.unauthorized)
          .send({ message: en.permission });
      }

      const result = await db.query(
        `INSERT INTO user_access_permissions (user_id,permission_id,created_at,updated_at) VALUES('${permission.user_id}','${permission.permission_id}','${now}','${now}') RETURNING *`
      );
      userAccessPermission.push(result.rows[0]);
    }
    return res.status(RestAPI.STATUSCODE.created).send({
      statusCode: RestAPI.STATUSCODE.created,
      message: enMessage.userAccessPermission_creation_success,
      access_permission: userAccessPermission,
    });
  } catch (err) {
    console.log(err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.userAccessPermission_creation_failure,
      Error: err,
    });
  }
};

const getAllUserAccessPermissions = async (req, res) => {
  try {
    const query = findOne(
      "user_access_permissions",
      "user_id",
      req.params.user_id
    );

    const UserAccessPermissions = await query;
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      user_access_permission: UserAccessPermissions.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.listed_failure,
      Error: err,
    });
  }
};

const getUserAccessPermissionById = async (req, res) => {
  try {
    const query = findOne("user_access_permissions", "id", req.params.id);
    const isUserAccessPermissionExist = await query;

    if (isUserAccessPermissionExist.rowCount == 0)
      return res
        .status(RestAPI.STATUSCODE.notFound)
        .send({ message: en.userNotFoundWithId });

    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      user_access_permission: isUserAccessPermissionExist.rows[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.listed_failure,
      Error: err,
    });
  }
};

const replaceUserAccessPermission = async (req, res) => {
  try {
    const now = new Date().toISOString();
    let UserAccessPermissionRequest = req.body;
    const query = findOne("user_access_permissions", "id", req.params.id);
    const isUserAccessPermissionExist = await query;

    if (isUserAccessPermissionExist.rowCount == 0)
      return res
        .status(RestAPI.STATUSCODE.notFound)
        .send({ message: en.userNotFoundWithId });
    const updateQuery = `UPDATE user_access_permissions SET 
                             permission_id = '${UserAccessPermissionRequest.permission_id}'
                             updated_at = '${now}'
                             WHERE id = ${req.params.id}`;
    await db.query(updateQuery);
    const updatedData = await query;
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.userAccessPermission_updation_success,
      user_access_permissions: updatedData.rows[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.userAccessPermission_updation_failure,
      error: err,
    });
  }
};

const deleteUserAccessPermission = async (req, res) => {
  try {
    const query = findOne("user_access_permissions", "id", req.params.id);
    const isUserAccessPermissionExist = await query;

    if (isUserAccessPermissionExist.rowCount == 0)
      return res
        .status(RestAPI.STATUSCODE.notFound)
        .send({ message: en.userNotFoundWithId });

    await db.query(
      `DELETE FROM user_access_permissions WHERE id = ${req.params.id}`
    );
    return res.status(RestAPI.STATUSCODE.noContent).send({
      statusCode: RestAPI.STATUSCODE.noContent,
      message: enMessage.userAccessPermission_deletion_success,
    });
  } catch (err) {
    console.log(err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.userAccessPermission_deletion_failure,
      error: err,
    });
  }
};

module.exports = {
  createUserAccessPermission,
  getAllUserAccessPermissions,
  getUserAccessPermissionById,
  replaceUserAccessPermission,
  deleteUserAccessPermission,
};
