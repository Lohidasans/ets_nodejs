const db = require("../../config/dbConfig");
const {SECURITYSTATUS} = require("../../constants/enums");


const getEmployeeSecurityDetails = async () => {
    const getEmoployeeData = await db.query(`SELECT     
    employee_profiles.employee_id,
    employee_profiles.name,
    employee_profiles.image_url AS picture,
    sub_teams.sub_team,
    users.name AS security_name,
    security_managements.created_at AS in_date_time
    FROM employee_profiles
    INNER JOIN security_managements on employee_profiles.employee_id = security_managements.employee_id
    INNER JOIN users on security_managements.security_id = users.id
    INNER JOIN sub_teams on employee_profiles.sub_team_id::int = sub_teams.id
    where security_managements.status = ${SECURITYSTATUS.allowInside}`);

    return getEmoployeeData;
};

module.exports = { getEmployeeSecurityDetails };