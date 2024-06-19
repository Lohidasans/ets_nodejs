const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const { user_type_data } = require("../../constants/common");
const user = require("../../constants/enums");
const RestAPI = require("../../constants/enums");
const securityController = require("../../controllers/securityController/securityController")
const { findOne, findAll } = require("../../query/common");

const createGateManagement = async (req, res) => {
    try {
        const now = new Date().toISOString();
        const gateData = req.body;
        //Check Employee Id and Name Exist 
        const isEmployeeExist = await db.query(`SELECT * from employee_profiles where name = $1 and employee_id = $2`, [gateData.employee_name, gateData.employee_id]);
        if (isEmployeeExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.employeeNotFound,
            });
        }
        //Check User Exist 
        const userType = user_type_data.find(x => x.user_type === "Admin");
        const isUserExist = await db.query(`SELECT * from users where name = $1 and user_type = $2`, [gateData.authorized_name, userType.id]);
        if (isUserExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.securityNotFound,
            });
        }

        const securityQuery = await db.query(
            `INSERT INTO gate_managements (employee_id, employee_name, authorized_name, options, reason, in_date_time, is_deleted, created_at, updated_at) VALUES ('${gateData.employee_id}','${gateData.employee_name}','${gateData.authorized_name}','${gateData.options}', '${gateData.reason}','${gateData.in_date_time}', ${false}, '${now}', '${now}') RETURNING *`
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

const getGateManagementById = async (req, res) => {
    try {
        const isGateManagementExist = await findOne("gate_managements", "id", req.params.id);
        if (isGateManagementExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.userNotFound
            });
        }
        return res.status(RestAPI.STATUSCODE.ok).send({
            statusCode: RestAPI.STATUSCODE.ok,
            message: enMessage.listed_success,
            data: isGateManagementExist.rows[0],
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

const getAllGateManagement = async (req, res) => {
    try {
        var allGateManagements = await securityController.getEmployeeGateDetails();
        var allJobs = allGateManagements.rows;

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

const replaceGateManagement = async (req, res) => {
    try {
        const now = new Date().toISOString();
        const gateData = req.body;
        // const isGateManagementExist = await db.query(
        //     `SELECT * FROM gate_managements WHERE id = $1`,
        //     [req.params.id]
        // );     
        const isGateManagementExist = await findOne("gate_managements", "id", req.params.id);
        if (isGateManagementExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.userNotFound
            });
        }
        //Check Employee Id and Name Exist 
        const isEmployeeExist = await db.query(`SELECT * from employee_profiles where name = $1 and employee_id = $2`, [gateData.employee_name, gateData.employee_id]);
        if (isEmployeeExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.employeeNotFound,
            });
        }
        //Check User Exist 
        const userType = user_type_data.find(type => type.user_type === "Admin");
        const isUserExist = await db.query(`SELECT * from users where name = $1 and user_type = $2`, [gateData.authorized_name, userType.id]);
        if (isUserExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.userNotFound,
            });
        }

        const updateQuery = `UPDATE gate_managements SET employee_id='${gateData.employee_id}',authorized_name= '${gateData.authorized_name}', in_date_time='${gateData.in_date_time}', options = '${gateData.options}', reason='${gateData.reason}', updated_at = '${now}' WHERE id='${req.params.id}'`;

        await db.query(updateQuery);

        // const updatedData = await db.query(
        //     `SELECT * FROM gate_managements WHERE id=$1`,
        //     [req.params.id]
        // );
        const updatedData = await findOne("gate_managements", "id", req.params.id);
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

const updateGateManagement = async (req, res) => {
    try {
        const now = new Date().toISOString();
        const gateData = req.body;
        // const isGateManagementExist = await db.query(
        //     `SELECT * FROM gate_managements WHERE id = $1`,
        //     [req.params.id]
        // );
        const isGateManagementExist = await findOne("gate_managements", "id", req.params.id);
        if (isGateManagementExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.userNotFound
            });
        }
        //Check Employee Id and Name Exist 
        const isEmployeeExist = await db.query(`SELECT * from employee_profiles where name = $1 and employee_id = $2`, [gateData.employee_name, gateData.employee_id]);
        if (isEmployeeExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.employeeNotFound,
            });
        }
        //Check User Exist 
        const userType = user_type_data.find(type => type.user_type === "Admin");
        const isUserExist = await db.query(`SELECT * from users where name = $1 and user_type = $2`, [gateData.authorized_name, userType.id]);
        if (isUserExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.userNotFound,
            });
        }

        const updateEmployee_id =
            gateData.employee_id == null
                ? isGateManagementExist.rows[0].employee_id
                : gateData.employee_id;
        const updateEmployee_Name =
            gateData.employee_name == null
                ? isGateManagementExist.rows[0].employee_name
                : gateData.employee_name;
        const updateAuthorizedName =
            gateData.authorized_name == null
                ? isGateManagementExist.rows[0].authorized_name
                : gateData.authorized_name;
        const updateOptions =
            gateData.options == null
                ? isGateManagementExist.rows[0].options
                : gateData.options;
        const updateReason =
            gateData.reason == null
                ? isGateManagementExist.rows[0].reason
                : gateData.reason;
        const updateInDateTime =
            gateData.in_date_time == null
                ? isGateManagementExist.rows[0].in_date_time
                : gateData.in_date_time;

        const updateQuery = `UPDATE gate_managements SET employee_id='${updateEmployee_id}', employee_name='${updateEmployee_Name}', authorized_name='${updateAuthorizedName}', options ='${updateOptions}', reason = '${updateReason}', in_date_time = '${updateInDateTime}', updated_at = '${now}' WHERE id='${req.params.id}'`;

        await db.query(updateQuery);
        // const updatedData = await db.query(
        //     `SELECT * FROM gate_managements WHERE id=$1`,
        //     [req.params.id]
        // );
        const updatedData = await findOne("gate_managements", "id", req.params.id);
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

const deleteGateManagement = async (req, res) => {
    try {
        // const isGateManagementExist = await db.query(
        //     `SELECT * FROM gate_managements WHERE id = $1`,
        //     [req.params.id]
        // );
        const isGateManagementExist = await findOne("gate_managements", "id", req.params.id);
        if (isGateManagementExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.userNotFound
            });
        }
        await db.query(`DELETE FROM gate_managements WHERE id=${req.params.id}`);
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
    createGateManagement,
    getGateManagementById,
    getAllGateManagement,
    replaceGateManagement,
    updateGateManagement,
    deleteGateManagement,
};

