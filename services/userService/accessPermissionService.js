const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const RestAPI = require("../../constants/enums");
const enMessage = require("../../constants/enMessage.json");

const createAccessPermission = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const newAccessPermission = req.body;
    const existAccessPermission = await db.query(
      `SELECT * FROM access_permissions WHERE permission = $1;`,
      [newAccessPermission.permission]
    );

    if (existAccessPermission.rowCount != 0)
      return res
        .status(STATUSCODE.unauthorized)
        .send({ message: en.permission });

    const result = await db.query(
      `INSERT INTO access_permissions (permission,created_at,updated_at) VALUES('${newAccessPermission.permission}','${now}','${now}') RETURNING *`
    );
    return res
      .status(RestAPI.STATUSCODE.created)
      .send({
        statusCode: RestAPI.STATUSCODE.created,
        message: enMessage.accessPermission_creation_success,
        accessPermission: result.rows[0],
      });
  } catch (err) {
    console.log(err);
    return res
      .status(RestAPI.STATUSCODE.internalServerError)
      .send({
        statusCode: RestAPI.STATUSCODE.internalServerError,
        message: enMessage.accessPermission_creation_failure,
        error: err,
      });
  }
};

const getAllAccessPermissions = async (req, res) => {
  try {
    const AccessPermissions = await db.query(
      `SELECT * FROM access_permissions`
    );
    return res
      .status(RestAPI.STATUSCODE.ok)
      .send({
        statusCode: RestAPI.STATUSCODE.ok,
        message: enMessage.listed_success,
        accessPermission: AccessPermissions.rows,
      });
  } catch (err) {
    console.log(err);
    return res
      .status(RestAPI.STATUSCODE.internalServerError)
      .send({
        statusCode: RestAPI.STATUSCODE.internalServerError,
        message: enMessage.listed_failure,
        error: err,
      });
  }
};

const getAccessPermissionById = async (req, res) => {
  try {
    const isAccessPermissionExist = await db.query(
      `SELECT * FROM access_permissions WHERE id = $1`,
      [req.params.id]
    );

    if (isAccessPermissionExist.rowCount == 0)
      return res
        .status(STATUSCODE.notFound)
        .send({ message: en.userNotFoundWithId });
    return res
      .status(RestAPI.STATUSCODE.ok)
      .send({
        statusCode: RestAPI.STATUSCODE.ok,
        message: enMessage.listed_success,
        accessPermission: isAccessPermissionExist.rows[0],
      });
  } catch (err) {
    console.log(err);
    return res
      .status(RestAPI.STATUSCODE.internalServerError)
      .send({
        statusCode: RestAPI.STATUSCODE.internalServerError,
        message: enMessage.listed_failure,
        error: err,
      });
  }
};

const replaceAccessPermission = async (req, res) => {
  try {
    const now = new Date().toISOString();
    let AccessPermissionRequest = req.body;
    const isAccessPermissionExist = await db.query(
      `SELECT * FROM access_permissions WHERE id = $1`,
      [req.params.id]
    );

    if (isAccessPermissionExist.rowCount == 0)
      return res
        .status(RestAPI.STATUSCODE.notFound)
        .send({ message: en.userNotFoundWithId });

    const updateQuery = `UPDATE access_permissions SET 
        permission = '${AccessPermissionRequest.permission}',
        updated_at = '${now}'
        WHERE id = ${req.params.id}`;
    await db.query(updateQuery);

    const updatedData = await db.query(
      `SELECT * FROM access_permissions WHERE id = $1;`,
      [req.params.id]
    );
    return res
      .status(RestAPI.STATUSCODE.ok)
      .send({
        statusCode: RestAPI.STATUSCODE.ok,
        message: enMessage.accessPermission_updation_success,
        accessPermission: updatedData.rows[0],
      });
  } catch (err) {
    console.log(err);
    return res
      .status(RestAPI.STATUSCODE.internalServerError)
      .send({
        statusCode: RestAPI.STATUSCODE.internalServerError,
        message: enMessage.accessPermission_updation_failure,
        error: err,
      });
  }
};

const deleteAccessPermission = async (req, res) => {
  try {
    const isAccessPermissionExist = await db.query(
      `SELECT * FROM  access_permissions WHERE id = $1`,
      [req.params.id]
    );
    if (isAccessPermissionExist.rowCount == 0)
      return res
        .status(RestAPI.STATUSCODE.notFound)
        .send({ message: en.accessPermissionNotFound });

    await db.query(
      `DELETE FROM access_permissions WHERE id = ${req.params.id}`
    );
    return res
      .status(RestAPI.STATUSCODE.noContent)
      .send({
        statusCode: RestAPI.STATUSCODE.noContent,
        message: enMessage.accessPermission_deletion_success,
        error: err,
      });
  } catch (err) {
    console.log(err);
    return res
      .status(RestAPI.STATUSCODE.internalServerError)
      .send({
        statusCode: RestAPI.STATUSCODE.internalServerError,
        message: enMessage.accessPermission_deletion_failure,
        error: err,
      });
  }
};

module.exports = {
  createAccessPermission,
  getAllAccessPermissions,
  getAccessPermissionById,
  replaceAccessPermission,
  deleteAccessPermission,
};
