const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const RestAPI = require("../../constants/enums");

const createEmployeeProfile = async (req, res) => {
    try {
        const now = new Date().toISOString();
        const employeeProfileData = req.body;
        const employeeProfileQuery = await db.query(
            `INSERT INTO employee_profiles (name, date_of_birth, email_id, phone_no, state, city, address, pincode, thumb_image_url, image_url, team_id, sub_team_id, employee_category, date_of_joining, shift, created_at, updated_at) VALUES ('${employeeProfileData.name}','${employeeProfileData.date_of_birth}','${employeeProfileData.email_id}','${employeeProfileData.phone_no}','${employeeProfileData.state}','${employeeProfileData.city}','${employeeProfileData.address}','${employeeProfileData.pincode}','${employeeProfileData.thumb_image_url}','${employeeProfileData.image_url}','${employeeProfileData.team_id}','${employeeProfileData.sub_team_id}','${employeeProfileData.employee_category}','${employeeProfileData.date_of_joining}','${employeeProfileData.shift}', '${now}', '${now}') RETURNING *`
        );
        return res.status(RestAPI.STATUSCODE.ok).send({
            statusCode: RestAPI.STATUSCODE.ok,
            message: enMessage.employee_profile_creation_success,
            data: employeeProfileQuery.rows[0],
        });
    } catch (err) {
        console.log("Error :", err);
        return res.status(RestAPI.STATUSCODE.internalServerError).send({
            statusCode: RestAPI.STATUSCODE.internalServerError,
            message: enMessage.employee_profile_creation_failure,
            error: err,
        });
    }
};

const getEmployeeProfileById = async (req, res) => {
    try {
        const isEmployeeProfileExist = await db.query(`SELECT * FROM employee_profiles WHERE id = $1`, [
            req.params.id,
        ]);
        if (isEmployeeProfileExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.employeeProfileNotFound,
            });
        }
        return res.status(RestAPI.STATUSCODE.ok).send({
            statusCode: RestAPI.STATUSCODE.ok,
            message: enMessage.listed_success,
            data: isEmployeeProfileExist.rows[0],
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

const getAllEmployeeProfile = async (req, res) => {
    try {
        const allEmployeeProfiles = await db.query(`SELECT * FROM employee_profiles ORDER BY id`);
        return res.status(RestAPI.STATUSCODE.ok).send({
            statusCode: RestAPI.STATUSCODE.ok,
            message: enMessage.listed_success,
            category: allEmployeeProfiles.rows,
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

// const replaceEmployeeProfile = async (req, res) => {
//     try {
//         const now = new Date().toISOString();
//         const employeeProfileData = req.body;
//         const isEmployeeProfileExist = await db.query(`SELECT * FROM employee_profiles WHERE id = $1`, [
//             req.params.id,
//         ]);
//         if (isEmployeeProfileExist.rowCount == 0) {
//             return res.status(RestAPI.STATUSCODE.notFound).send({
//                 statusCode: RestAPI.STATUSCODE.notFound,
//                 message: en.employeeProfileNotFound,
//             });
//         }
//         const updateQuery = `UPDATE employee_profiles SET employee_profile_name='${employeeProfileData.employee_profile_name}', updated_at = '${now}' WHERE id='${req.params.id}'`;
//         await db.query(updateQuery);
//         const updatedData = await db.query(
//             `SELECT * FROM employee_profiles WHERE id=$1`,
//             [req.params.id]
//         );
//         return res
//             .status(RestAPI.STATUSCODE.ok)
//             .send({
//                 statusCode: RestAPI.STATUSCODE.ok,
//                 message: enMessage.employee_profile_updation_success,
//                 category: updatedData.rows[0],
//             });
//     } catch (err) {
//         console.log("Error :", err);
//         return res.status(RestAPI.STATUSCODE.internalServerError).send({
//             statusCode: RestAPI.STATUSCODE.internalServerError,
//             message: enMessage.employee_profile_updation_failure,
//             error: err,
//         });
//     }
// };

const deleteEmployeeProfile = async (req, res) => {
    try {
        const isEmployeeProfileExist = await db.query(`SELECT * FROM employee_profiles WHERE id = $1`, [
            req.params.id,
        ]);
        if (isEmployeeProfileExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.employeeProfileNotFound,
            });
        }
        await db.query(`DELETE FROM employee_profiles WHERE id=${req.params.id}`);
        return res
            .status(RestAPI.STATUSCODE.noContent)
            .send({
                statusCode: RestAPI.STATUSCODE.noContent,
                message: enMessage.employee_profile_deletion_success,
            });
    } catch (err) {
        console.log("Error :", err);
        return res.status(RestAPI.STATUSCODE.internalServerError).send({
            statusCode: RestAPI.STATUSCODE.internalServerError,
            message: enMessage.employee_profile_deletion_failure,
            error: err,
        });
    }
};

module.exports = {
    createEmployeeProfile,
    getEmployeeProfileById,
    getAllEmployeeProfile,
    //replaceEmployeeProfile,
    deleteEmployeeProfile,
};
