const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const RestAPI = require("../../constants/enums");

const createEmployeeMobileDetails = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const employeeMobileDetailsData = req.body;
    const employeeMobileDetailsQuery = await db.query(
      `INSERT INTO employee_mobiles (employee_id,mobile_name, mobile_weight, mobile_front_image_url, mobile_back_image_url, mobile_description, is_deleted,created_at, updated_at) VALUES ('${
        employeeMobileDetailsData.employee_id
      }','${employeeMobileDetailsData.mobile_name}','${
        employeeMobileDetailsData.mobile_weight
      }','${employeeMobileDetailsData.mobile_front_image_url}','${
        employeeMobileDetailsData.mobile_back_image_url
      }','${
        employeeMobileDetailsData.mobile_description
      }',${false}, '${now}', '${now}') RETURNING *`
    );
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.employee_mobileDetail_creation_success,
      data: employeeMobileDetailsQuery.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_mobileDetail_creation_failure,
      error: err,
    });
  }
};

const getEmployeeMobileDetailsById = async (req, res) => {
  try {
    const isEmployeeMobileDetailsExist = await db.query(
      `SELECT * FROM employee_mobiles WHERE id = $1`,
      [req.params.id]
    );
    if (isEmployeeMobileDetailsExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeMobileDetailsNotFound,
      });
    }
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      data: isEmployeeMobileDetailsExist.rows[0],
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

const getAllEmployeeMobileDetails = async (req, res) => {
  try {
    var allEmployeeMobileDetails = await db.query(
      `SELECT * FROM employee_mobiles WHERE is_deleted=${false} ORDER BY id`
    );
    var allMobileDetails = allEmployeeMobileDetails.rows;
    var filterQuery = req.query;
    // filter by employee_id
    if (Object.keys(filterQuery).length !== 0) {
      if (filterQuery.employee_id) {
        allMobileDetails = allMobileDetails.filter(
          (e) => e.employee_id == filterQuery.employee_id
        );
      }
    }
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      jobDetails: allMobileDetails,
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

const replaceEmployeeMobileDetails = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const employeeMobileDetailsData = req.body;
    const isEmployeeMobileDetailsExist = await db.query(
      `SELECT * FROM employee_mobiles WHERE id = $1`,
      [req.params.id]
    );
    if (isEmployeeMobileDetailsExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeMobileDetailsNotFound,
      });
    }
    const updateQuery = `UPDATE employee_mobiles SET employee_id='${employeeMobileDetailsData.employee_id}', mobile_name='${employeeMobileDetailsData.mobile_name}', mobile_weight='${employeeMobileDetailsData.mobile_weight}', mobile_front_image_url='${employeeMobileDetailsData.mobile_front_image_url}', mobile_back_image_url='${employeeMobileDetailsData.mobile_back_image_url}', mobile_description='${employeeMobileDetailsData.mobile_description}', updated_at = '${now}' WHERE id='${req.params.id}'`;

    await db.query(updateQuery);
    const updatedData = await db.query(
      `SELECT * FROM employee_mobiles WHERE id=$1`,
      [req.params.id]
    );
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.employee_mobileDetail_updation_success,
      jobDetails: updatedData.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_mobileDetail_updation_failure,
      error: err,
    });
  }
};

const deleteEmployeeMobileDetails = async (req, res) => {
  try {
    const isEmployeeMobileDetailsExist = await db.query(
      `SELECT * FROM employee_mobiles WHERE id = $1`,
      [req.params.id]
    );
    if (isEmployeeMobileDetailsExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeMobileDetailsNotFound,
      });
    }
    // await db.query(`DELETE FROM employee_mobiles WHERE id=${req.params.id}`);
    await db.query(
      `UPDATE employee_mobiles SET is_deleted=${true} WHERE id='${
        req.params.id
      }'`
    );
    return res.status(RestAPI.STATUSCODE.noContent).send({
      statusCode: RestAPI.STATUSCODE.noContent,
      message: enMessage.employee_mobileDetail_deletion_success,
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_mobileDetail_deletion_failure,
      error: err,
    });
  }
};

module.exports = {
  createEmployeeMobileDetails,
  getEmployeeMobileDetailsById,
  getAllEmployeeMobileDetails,
  replaceEmployeeMobileDetails,
  deleteEmployeeMobileDetails,
};
