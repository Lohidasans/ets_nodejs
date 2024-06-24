const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const RestAPI = require("../../constants/enums");
const { findOne } = require("../../query/common");

const createCanteenManagement = async (req, res) => {
    try {
        const now = new Date().toISOString();
        const isEmployeeExist = await db.query(`SELECT * FROM "employee_traking" 
                                                WHERE date = CURRENT_DATE and device_id = 4`);
        const employee_time = isEmployeeExist.rows;

        const breakfastStart = parseTimeStringToTodayDate("08:30:00");
        const breakfastEnd = parseTimeStringToTodayDate("10:00:00");

        const lunchStart = parseTimeStringToTodayDate("13:00:00");
        const lunchEnd = parseTimeStringToTodayDate("14:30:00");

        const dinnerStart = parseTimeStringToTodayDate("19:30:00");
        const dinnerEnd = parseTimeStringToTodayDate("21:00:00");

        const breakfastStartStr = formatDateToTimeString(breakfastStart);
        const breakfastEndStr = formatDateToTimeString(breakfastEnd);

        const lunchStartStr = formatDateToTimeString(lunchStart);
        const lunchEndStr = formatDateToTimeString(lunchEnd);

        const dinnerStartStr = formatDateToTimeString(dinnerStart);
        const dinnerEndStr = formatDateToTimeString(dinnerEnd);

        let results = [];

        for (const entry of employee_time) {
            const entryTime = entry.time;
            const entryDate = formatDateToYYYYMMDD(new Date(entry.date));
            console.log("Original date:", entry.date);
            console.log("Formatted date:", entryDate);

            let mealType = null;
            if (entryTime >= breakfastStartStr && entryTime <= breakfastEndStr) {
                mealType = 'breakfast';
            } else if (entryTime >= lunchStartStr && entryTime <= lunchEndStr) {
                mealType = 'lunch';
            } else if (entryTime >= dinnerStartStr && entryTime <= dinnerEndStr) {
                mealType = 'dinner';
            }

            if (mealType) {
                const profileQuery = await db.query(`SELECT breakfast, lunch, dinner FROM "employee_profiles" WHERE employee_id = $1`, [entry.employee_id]);

                if (profileQuery.rowCount == 0) {
                    results.push({
                        statusCode: RestAPI.STATUSCODE.notFound,
                        message: `Employee ${entry.employee_id} not found`,
                    });
                    continue;
                }

                const profile = profileQuery.rows[0];

                if (profile[mealType]) {
                    const canteenQuery = await db.query(`INSERT INTO canteen_managements(employee_id, is_breakfast, is_lunch, is_dinner, date, time, device_id, created_at, updated_at) 
                                                         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
                        [entry.employee_id, mealType === 'breakfast', mealType === 'lunch', mealType === 'dinner', entryDate, entryTime, entry.device_id, now, now]);

                    results.push({
                        message: `Canteen management created for ${mealType}`,
                        data: canteenQuery.rows[0],
                    });
                } else {
                    results.push({
                        statusCode: RestAPI.STATUSCODE.forbidden,
                        message: `Employee ${entry.employee_id} is not allowed to eat ${mealType}`,
                    });
                }
            }
        }

        if (results.length === 0) {
            res.status(RestAPI.STATUSCODE.ok).send({
                statusCode: RestAPI.STATUSCODE.ok,
                message: "No matching meal time found",
            });
        } else {
            res.status(RestAPI.STATUSCODE.created).send({
                statusCode: RestAPI.STATUSCODE.created,
                results: results,
            });
        }

    } catch (error) {
        console.error('Error processing canteen management', error);
        return res.status(RestAPI.STATUSCODE.internalServerError).send({
            statusCode: RestAPI.STATUSCODE.internalServerError,
            message: enMessage.canteen_management_creation_failure,
            error: error.message,
        });
    }
};


function parseTimeStringToTodayDate(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
}

function formatDateToTimeString(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
// const getAllCanteenManagement = async (req, res) => {

// }

// const getCanteenManagementById = async (req, res) => {

// }

module.exports = {
    createCanteenManagement,
    // getAllCanteenManagement,
    // getCanteenManagementById
};