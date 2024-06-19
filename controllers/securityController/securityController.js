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

const getEmployeeGateDetails = async () => {
    const getEmployeeGateData = await db.query(`SELECT
        employee_profiles.employee_id,
        employee_profiles.name,
        employee_profiles.image_url AS picture,
        sub_teams.sub_team,
        gate_managements.in_date_time,
        gate_managements.authorized_name AS security_name
        FROM employee_profiles
        INNER JOIN gate_managements on employee_profiles.employee_id = gate_managements.employee_id
        INNER JOIN users on gate_managements.authorized_name = users.name
        INNER JOIN sub_teams on employee_profiles.sub_team_id::int = sub_teams.id
        GROUP BY 
        employee_profiles.employee_id,
        employee_profiles.name,
        employee_profiles.image_url,
        sub_teams.sub_team,
        gate_managements.in_date_time,
        gate_managements.authorized_name
        `);
    return getEmployeeGateData;
}

module.exports = { getEmployeeSecurityDetails, getEmployeeGateDetails  };