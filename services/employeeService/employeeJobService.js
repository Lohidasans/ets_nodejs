const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const RestAPI = require("../../constants/enums");
const { findOne, findAll } = require("../../query/common");

const createEmployeeJob = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const employeeJobData = req.body;
    const employeeJobQuery = await db.query(
      `INSERT INTO employee_jobs (employee_id,organization, from_date, to_date, description, certificate_url,is_deleted, created_at, updated_at) VALUES ('${
        employeeJobData.employee_id
      }','${employeeJobData.organization}','${employeeJobData.from_date}','${
        employeeJobData.to_date
      }','${employeeJobData.description}','${
        employeeJobData.certificate_url
      }',${false}, '${now}', '${now}') RETURNING *`
    );
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.employee_job_creation_success,
      data: employeeJobQuery.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_job_creation_failure,
      error: err,
    });
  }
};

const getEmployeeJobById = async (req, res) => {
  try {
    const query = findOne("employee_jobs", "id", req.params.id);
    const isEmployeeJobExist = await query;
    if (isEmployeeJobExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeePreviousJobNotFound,
      });
    }
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      data: isEmployeeJobExist.rows[0],
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

const getAllEmployeeJob = async (req, res) => {
  try {
    const query = findAll("employee_jobs", "id", "ASC", {
      is_deleted: false,
    });
    var allEmployeeJobs = await db.query(query);
    var allJobs = allEmployeeJobs.rows;
    var filterQuery = req.query;
    // filter by employee_id
    if (Object.keys(filterQuery).length !== 0) {
      if (filterQuery.employee_id) {
        allJobs = allJobs.filter(
          (e) => e.employee_id == filterQuery.employee_id
        );
      }
    }
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      jobDetails: allJobs,
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

const replaceEmployeeJob = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const employeeJobData = req.body;
    const query = findOne("employee_jobs", "id", req.params.id);
    const isEmployeeJobExist = await query;
    if (isEmployeeJobExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeePreviousJobNotFound,
      });
    }
    const updateQuery = `UPDATE employee_jobs SET employee_id='${employeeJobData.employee_id}', organization='${employeeJobData.organization}', from_date='${employeeJobData.from_date}', to_date='${employeeJobData.to_date}', description='${employeeJobData.description}', certificate_url='${employeeJobData.certificate_url}', updated_at = '${now}' WHERE id='${req.params.id}'`;

    await db.query(updateQuery);
    const updatedData = await query;
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.employee_job_updation_success,
      jobDetails: updatedData.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_job_updation_failure,
      error: err,
    });
  }
};

const deleteEmployeeJob = async (req, res) => {
  try {
    const query = findOne("employee_jobs", "id", req.params.id);
    const isEmployeeJobExist = await query;
    if (isEmployeeJobExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeePreviousJobNotFound,
      });
    }
    // await db.query(`DELETE FROM employee_jobs WHERE id=${req.params.id}`);
    await db.query(
      `UPDATE employee_jobs SET is_deleted=${true} WHERE id='${req.params.id}'`
    );
    return res.status(RestAPI.STATUSCODE.noContent).send({
      statusCode: RestAPI.STATUSCODE.noContent,
      message: enMessage.employee_job_deletion_success,
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_job_deletion_failure,
      error: err,
    });
  }
};

module.exports = {
  createEmployeeJob,
  getEmployeeJobById,
  getAllEmployeeJob,
  replaceEmployeeJob,
  deleteEmployeeJob,
};
