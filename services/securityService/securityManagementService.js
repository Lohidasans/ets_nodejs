const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const { user_type_data } = require("../../constants/common");
const user = require("../../constants/enums");
const RestAPI = require("../../constants/enums");
const securityController = require("../../controllers/securityController/securityController");
const { findOne } = require("../../query/common");
const moment = require("moment");
const { error } = require("joi/lib/types/lazy");

const createSecurityManagement = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const securityData = req.body;
    const date = new Date(securityData.date).toISOString();

    const findByEmployee = findOne(
      "employee_profiles",
      "employee_id",
      securityData.employee_id
    );

    //Check Employee Exist
    const isEmployeeExist = await findByEmployee;
    if (isEmployeeExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeNotFound,
      });
    }
    //Check User Exist
    const userType = user_type_data.find(
      (type) => type.user_type === "Security"
    );
    const isUserExist = await db.query(
      `SELECT * from users where id = $1 and user_type = $2`,
      [securityData.security_id, userType.id]
    );
    if (isUserExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.securityNotFound,
      });
    }

    const securityQuery = await db.query(
      `INSERT INTO security_managements (employee_id,security_id, is_allowed, date, time, device_id, created_at, updated_at) VALUES ('${securityData.employee_id}','${securityData.security_id}','${securityData.is_allowed}', '${date}', '${securityData.time}','${securityData.device_id}', '${now}', '${now}') RETURNING *`
    );

    // Convert dates back to local time zone before sending response
    const responseData = securityQuery.rows[0];
    responseData.date = new Date(responseData.date).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' });

    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.security_management_creation_success,
      data: responseData,
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.security_management_creation_failure,
      error: err,
    });
  }
};

const getSecurityManagementById = async (req, res) => {
  try {
    const query = findOne("security_managements", "id", req.params.id);
    const isSecurityManagementExist = await query;
    if (isSecurityManagementExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.userNotFound,
      });
    }
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      data: isSecurityManagementExist.rows[0],
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

const getAllSecurityManagement = async (req, res) => {
  try {
    var allSecurityManagements = await securityController.getEmployeeSecurityDetails();
    var allJobs = allSecurityManagements.rows;

    var filterQuery = req.query;
    var fromDate = moment(filterQuery.from_date, "DD/MM/YYYY").toDate();
    var toDate = moment(filterQuery.to_date, "DD/MM/YYYY").toDate();

    // search added
    if (Object.keys(filterQuery).length !== 0) {
      if (filterQuery.from_date && filterQuery.to_date) {
        allJobs = allJobs.filter(
          (item) =>
            new Date(item.in_date) >= fromDate && new Date(item.in_date) <= toDate
        );
      }
      if (filterQuery.searchString) {
        allJobs = allJobs.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase()) ||
            item.sub_team
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase()) ||
            item.employee_id
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase()) ||
            item.security_name
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase())
        );
      }
      if (filterQuery.security_name) {
        allJobs = allJobs.filter(
          (item) => item.security_name == filterQuery.security_name
        );
      }
      if (filterQuery.sub_team) {
        allJobs = allJobs.filter(
          (item) => item.sub_team == filterQuery.sub_team
        );
      }
    }
    // Convert dates to local time zone format for all entries
    allJobs = allJobs.map((e) => {
      e.in_date = new Date(e.in_date).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' });
      return e;
    });

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

const replaceSecurityManagement = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const securityData = req.body;
    const findBySecurity = findOne("security_managements", "id", req.params.id);
    const isSecurityManagementExist = await findBySecurity;
    if (isSecurityManagementExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.userNotFound,
      });
    }
    const findByEmployee = findOne(
      "employee_profiles",
      "employee_id",
      securityData.employee_id
    );

    //Check Employee Exist
    const isEmployeeExist = await findByEmployee;
    if (isEmployeeExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeNotFound,
      });
    }
    //Check User Exist
    const userType = user_type_data.find(
      (type) => type.user_type === "Security"
    );
    const isUserExist = await db.query(
      `SELECT * from users where id = $1 and user_type = $2`,
      [securityData.security_id, userType.id]
    );
    if (isUserExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.userNotFound,
      });
    }

    const updateQuery = `UPDATE security_managements SET employee_id='${securityData.employee_id}', security_id='${securityData.security_id}', is_allowed='${securityData.is_allowed}', date ='${securityData.date}', time = '${securityData.time}',device_id ='${securityData.device_id}', updated_at = '${now}' WHERE id='${req.params.id}'`;

    await db.query(updateQuery);
    const updatedData = await findBySecurity;
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.security_management_updation_success,
      jobDetails: updatedData.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.security_management_updation_failure,
      error: err,
    });
  }
};

const updateSecurityManagement = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const securityData = req.body;
    const query = findOne("security_managements", "id", req.params.id);
    const isSecurityManagementExist = await query;
    if (isSecurityManagementExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.userNotFound,
      });
    }

    const updateEmployee_id =
      securityData.employee_id == null
        ? isSecurityManagementExist.rows[0].employee_id
        : securityData.employee_id;
    const updateUser_id =
      securityData.security_id == null
        ? isSecurityManagementExist.rows[0].security_id
        : securityData.security_id;
    const updateIsAllowed =
      securityData.is_allowed == null
        ? isSecurityManagementExist.rows[0].is_allowed
        : securityData.is_allowed;

    const updateQuery = `UPDATE security_managements SET employee_id='${updateEmployee_id}', security_id='${updateUser_id}', is_allowed='${updateIsAllowed}',  updated_at = '${now}' WHERE id='${req.params.id}'`;

    await db.query(updateQuery);
    const updatedData = await query;
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.security_management_updation_success,
      jobDetails: updatedData.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.security_management_updation_failure,
      error: err,
    });
  }
};

const deleteSecurityManagement = async (req, res) => {
  try {
    const query = findOne("security_managements", "id", req.params.id);
    const isSecurityManagementExist = await query;
    if (isSecurityManagementExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.userNotFound,
      });
    }
    await db.query(
      `DELETE FROM security_managements WHERE id=${req.params.id}`
    );
    return res.status(RestAPI.STATUSCODE.noContent).send({
      statusCode: RestAPI.STATUSCODE.noContent,
      message: enMessage.security_management_deletion_success,
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.security_management_deletion_failure,
      error: err,
    });
  }
};
// Get the punched date and Time from employee_tracking table
const getEmployeeTracking = async (req, res) => {
  try {
    const isEmployeeExist = await db.query(`SELECT 
                                DISTINCT ON (employee_id) *
                                FROM "employee_traking" 
                                WHERE date = CURRENT_DATE - INTERVAL '1 day'
                                ORDER BY employee_id, time ASC`);

    var employeeDetails = isEmployeeExist.rows;
    var filterQuery = req.query;
    // filter by employee_id
    if (Object.keys(filterQuery).length !== 0) {
      if (filterQuery.employee_id) {
        employeeDetails = employeeDetails.filter(
          (e) => e.employee_id == filterQuery.employee_id
        );
      }
    }
    // Convert dates to local time zone format for all entries
    employeeDetails = employeeDetails.map((e) => {
      e.date = new Date(e.date).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' });
      return e;
    });

    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      data: employeeDetails,
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
// Employee_in drop down - punched but not entered employee
const getUnEnteredEmployees = async (req, res) => {
  try {
    const unenteredEmployees = await db.query(`SELECT DISTINCT ON (e.employee_id)
                                                  e.employee_id,
                                                  e.date,
                                                  e.time,
                                                  e.device_id
                                            FROM employee_traking AS e
                                            LEFT JOIN security_managements AS s ON e.employee_id = s.employee_id
                                            WHERE s.employee_id IS NULL
                                              AND e.date = CURRENT_DATE - INTERVAL '1 day'
                                            ORDER BY e.employee_id, e.date, e.time;`);

    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      data: unenteredEmployees.rows,
    });
  }
  catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.listed_failure,
      error: err,
    });
  }
};
// Security Drop down - list all the securities
const getAllSecurities = async (req, res) => {
  try
  {
    const userType = user_type_data.find(
      (type) => type.user_type === "Security"
    );
    const securityDetails = await db.query(
      `SELECT id, name , user_name, user_type from users where user_type = $1`,
      [userType.id]
    );
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      data: securityDetails.rows
    });
    
  }
  catch (err)
  {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.listed_failure,
      error: err,
    });
  }
}
module.exports = {
  createSecurityManagement,
  getSecurityManagementById,
  getAllSecurityManagement,
  replaceSecurityManagement,
  updateSecurityManagement,
  deleteSecurityManagement,
  getEmployeeTracking,
  getUnEnteredEmployees,
  getAllSecurities
};
