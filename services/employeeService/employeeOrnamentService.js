const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const RestAPI = require("../../constants/enums");
const { findOne, findAll } = require("../../query/common");

const createEmployeeOrnamentDetails = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const employeeOrnamentDetailsData = req.body;
    const employeeOrnamentDetailsQuery = await db.query(
      `INSERT INTO employee_ornaments (employee_id,ornament_name, ornament_weight, ornament_image_url, ornament_description, is_deleted,created_at, updated_at) VALUES ('${
        employeeOrnamentDetailsData.employee_id
      }','${employeeOrnamentDetailsData.ornament_name}','${
        employeeOrnamentDetailsData.ornament_weight
      }','${employeeOrnamentDetailsData.ornament_image_url}','${
        employeeOrnamentDetailsData.ornament_description
      }',${false}, '${now}', '${now}') RETURNING *`
    );
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.employee_ornament_creation_success,
      data: employeeOrnamentDetailsQuery.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_ornament_creation_failure,
      error: err,
    });
  }
};

const getEmployeeOrnamentDetailsById = async (req, res) => {
  try {
    const query = findOne("employee_ornaments", "id", req.params.id);
    const isEmployeeOrnamentDetailsExist = await query;
    if (isEmployeeOrnamentDetailsExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeOrnamentNotFound,
      });
    }
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      data: isEmployeeOrnamentDetailsExist.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.listed_failure,
      error: err,
    });
  }
};

const getAllEmployeeOrnamentDetails = async (req, res) => {
  try {
    const query = findAll("employee_ornaments", "id", "ASC", {
      is_deleted: false,
    });
    var allEmployeeOrnamentDetails = await db.query(query);
    var allOrnamentDetails = allEmployeeOrnamentDetails.rows;
    var filterQuery = req.query;
    // filter by employee_id
    if (Object.keys(filterQuery).length !== 0) {
      if (filterQuery.employee_id) {
        allOrnamentDetails = allOrnamentDetails.filter(
          (e) => e.employee_id == filterQuery.employee_id
        );
      }
    }
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      jobDetails: allOrnamentDetails,
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.listed_failure,
      error: err,
    });
  }
};

const replaceEmployeeOrnamentDetails = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const employeeOrnamentDetailsData = req.body;
    const query = findOne("employee_ornaments", "id", req.params.id);
    const isEmployeeOrnamentDetailsExist = await query;
    if (isEmployeeOrnamentDetailsExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeOrnamentNotFound,
      });
    }
    const updateQuery = `UPDATE employee_ornaments SET employee_id='${employeeOrnamentDetailsData.employee_id}', ornament_name='${employeeOrnamentDetailsData.ornament_name}', ornament_weight='${employeeOrnamentDetailsData.ornament_weight}', ornament_image_url='${employeeOrnamentDetailsData.ornament_image_url}', ornament_description='${employeeOrnamentDetailsData.ornament_description}', updated_at = '${now}' WHERE id='${req.params.id}'`;

    await db.query(updateQuery);

    const updatedData = await db.query(query);
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.employee_ornament_updation_success,
      jobDetails: updatedData.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_ornament_updation_failure,
      error: err,
    });
  }
};

const deleteEmployeeOrnamentDetails = async (req, res) => {
  try {
    const query = findOne("employee_ornaments", "id", req.params.id);
    const isEmployeeOrnamentDetailsExist = await query;
    if (isEmployeeOrnamentDetailsExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeOrnamentDetailsNotFound,
      });
    }
    // await db.query(`DELETE FROM employee_ornaments WHERE id=${req.params.id}`);
    await db.query(
      `UPDATE employee_ornaments SET is_deleted=${true} WHERE id=${
        req.params.id
      } `
    );
    return res.status(RestAPI.STATUSCODE.noContent).send({
      statusCode: RestAPI.STATUSCODE.noContent,
      message: enMessage.employee_ornament_deletion_success,
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_ornament_deletion_failure,
      error: err,
    });
  }
};

module.exports = {
  createEmployeeOrnamentDetails,
  getEmployeeOrnamentDetailsById,
  getAllEmployeeOrnamentDetails,
  replaceEmployeeOrnamentDetails,
  deleteEmployeeOrnamentDetails,
};
