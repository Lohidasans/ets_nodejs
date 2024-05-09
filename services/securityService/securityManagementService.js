const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const { user_type_data } = require("../../constants/common");
const user = require("../../constants/enums");
const RestAPI = require("../../constants/enums");
const securityController = require("../../controllers/securityController/securityController")

const createSecurityManagement = async (req, res) => {
    try {
        const now = new Date().toISOString();
        const securityData = req.body;
        //Check Employee Exist 
        const isEmployeeExist = await db.query(`SELECT * from employee_profiles where employee_id = $1`, [securityData.employee_id]);
        if (isEmployeeExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.employeeNotFound,
            });
        }
        //Check User Exist 
        const userType = user_type_data.find(type => type.user_type === "Security");
        const isUserExist = await db.query(`SELECT * from users where id = $1 and user_type = $2`, [securityData.security_id, userType.id]);
        if (isUserExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.securityNotFound,
            });
        }

        const securityQuery = await db.query(
            `INSERT INTO security_managements (employee_id,security_id, status, created_at, updated_at) VALUES ('${securityData.employee_id}','${securityData.security_id}','${securityData.status}', '${now}', '${now}') RETURNING *`
        );
        return res.status(RestAPI.STATUSCODE.ok).send({
            statusCode: RestAPI.STATUSCODE.ok,
            message: enMessage.security_management_creation_success,
            data: securityQuery.rows[0],
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
        const isSecurityManagementExist = await db.query(
            `SELECT * FROM security_managements WHERE id = $1`,
            [req.params.id]
        );
        if (isSecurityManagementExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.userNotFound
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
        const isSecurityManagementExist = await db.query(
            `SELECT * FROM security_managements WHERE id = $1`,
            [req.params.id]
        );
        if (isSecurityManagementExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.userNotFound
            });
        }
        //Check Employee Exist 
        const isEmployeeExist = await db.query(`SELECT * from employee_profiles where employee_id = $1`, [securityData.employee_id]);
        if (isEmployeeExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.employeeNotFound,
            });
        }
        //Check User Exist 
        const userType = user_type_data.find(type => type.user_type === "Security");
        const isUserExist = await db.query(`SELECT * from users where id = $1 and user_type = $2`, [securityData.security_id, userType.id]);
        if (isUserExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.userNotFound,
            });
        }

        const updateQuery = `UPDATE security_managements SET employee_id='${securityData.employee_id}', security_id='${securityData.security_id}', status='${securityData.status}',  updated_at = '${now}' WHERE id='${req.params.id}'`;

        await db.query(updateQuery);
        const updatedData = await db.query(
            `SELECT * FROM security_managements WHERE id=$1`,
            [req.params.id]
        );
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
        const isSecurityManagementExist = await db.query(
            `SELECT * FROM security_managements WHERE id = $1`,
            [req.params.id]
        );
        if (isSecurityManagementExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.userNotFound
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
        const updateStatus =
            securityData.status == null
                ? isSecurityManagementExist.rows[0].status
                : securityData.status;

        const updateQuery = `UPDATE security_managements SET employee_id='${updateEmployee_id}', security_id='${updateUser_id}', status='${updateStatus}',  updated_at = '${now}' WHERE id='${req.params.id}'`;

        await db.query(updateQuery);
        const updatedData = await db.query(
            `SELECT * FROM security_managements WHERE id=$1`,
            [req.params.id]
        );
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
        const isSecurityManagementExist = await db.query(
            `SELECT * FROM security_managements WHERE id = $1`,
            [req.params.id]
        );
        if (isSecurityManagementExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.userNotFound
            });
        }
        await db.query(`DELETE FROM security_managements WHERE id=${req.params.id}`);
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

module.exports = {
    createSecurityManagement,
    getSecurityManagementById,
    getAllSecurityManagement,
    replaceSecurityManagement,
    updateSecurityManagement,
    deleteSecurityManagement,
};

