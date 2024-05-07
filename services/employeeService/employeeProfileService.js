const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const RestAPI = require("../../constants/enums");
const { shift_data } = require("../../constants/common");

const createEmployeeProfile = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const employeeProfileData = req.body;
    const employeeProfileQuery = await db.query(
      `INSERT INTO employee_profiles (name, date_of_birth, email_id, phone_no, state, city, address, pincode, thumb_image_url, image_url, team_id, sub_team_id, employee_category, employee_id, date_of_joining, shift, breakfast, lunch, dinner, created_at, updated_at) VALUES ('${employeeProfileData.name}','${employeeProfileData.date_of_birth}','${employeeProfileData.email_id}','${employeeProfileData.phone_no}','${employeeProfileData.state}','${employeeProfileData.city}','${employeeProfileData.address}','${employeeProfileData.pincode}','${employeeProfileData.thumb_image_url}','${employeeProfileData.image_url}','${employeeProfileData.team_id}','${employeeProfileData.sub_team_id}','${employeeProfileData.employee_category}','${employeeProfileData.employee_id}','${employeeProfileData.date_of_joining}','${employeeProfileData.shift}','${employeeProfileData.breakfast}','${employeeProfileData.lunch}','${employeeProfileData.dinner}', '${now}', '${now}') RETURNING *`
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
    const isEmployeeProfileExist = await db.query(
      `SELECT * FROM employee_profiles WHERE id = $1`,
      [req.params.id]
    );
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
    var allEmployeeProfiles = await db.query(
      `SELECT
            employee_profiles.*,
            teams.team_name AS team_name,
            sub_teams.sub_team AS sub_team_name
            FROM employee_profiles
            INNER JOIN teams ON employee_profiles.team_id = teams.id
            INNER JOIN sub_teams ON employee_profiles.team_id = sub_teams.id
            GROUP BY teams.team_name,
            sub_teams.sub_team,
            employee_profiles.id
            ORDER BY employee_profiles.id
        `);
    // Map function to add shift_time to each profile
    var profilesWithShiftTime = allEmployeeProfiles.rows.map(profile => {
      var shift = shift_data.find(shift => shift.id === profile.shift);
      return {
        ...profile,
        shift_name: shift ? shift.schedule_time : null
      };
    });

    var filterQuery = req.query;
    // search added
    if (Object.keys(filterQuery).length !== 0) {
      if (filterQuery.searchString) {
        profilesWithShiftTime = profilesWithShiftTime.filter((item) =>
          item.employee_id
            .toLowerCase()
            .includes(filterQuery.searchString?.toLowerCase()) ||
          item.name
            .toLowerCase()
            .includes(filterQuery.searchString?.toLowerCase()) ||
          item.phone_no
            .toLowerCase()
            .includes(filterQuery.searchString?.toLowerCase()) ||
          item.sub_team_name
            .toLowerCase()
            .includes(filterQuery.searchString?.toLowerCase())
        );
      }
      if (filterQuery.team_id) {
        profilesWithShiftTime = profilesWithShiftTime.filter(
          (item) => item.team_id == filterQuery.team_id
        );
      }
      if (filterQuery.shift) {
        profilesWithShiftTime = profilesWithShiftTime.filter(
          (item) => item.shift == filterQuery.shift
        );
      }
      if (filterQuery.employee_category) {
        profilesWithShiftTime = profilesWithShiftTime.filter(
          (item) => item.employee_category == filterQuery.employee_category
        );
      }
    }

    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      profileDetails: profilesWithShiftTime,
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

const replaceEmployeeProfile = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const employeeProfileData = req.body;
    const isEmployeeProfileExist = await db.query(
      `SELECT * FROM employee_profiles WHERE id = $1`,
      [req.params.id]
    );
    if (isEmployeeProfileExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeProfileNotFound,
      });
    }
    const updateQuery = `UPDATE employee_profiles SET name='${employeeProfileData.name}', date_of_birth='${employeeProfileData.date_of_birth}', email_id='${employeeProfileData.email_id}', phone_no='${employeeProfileData.phone_no}', state='${employeeProfileData.state}', city='${employeeProfileData.city}', address='${employeeProfileData.address}', pincode='${employeeProfileData.pincode}', thumb_image_url='${employeeProfileData.thumb_image_url}', image_url='${employeeProfileData.image_url}', team_id='${employeeProfileData.team_id}', sub_team_id='${employeeProfileData.sub_team_id}', employee_category='${employeeProfileData.employee_category}', date_of_joining='${employeeProfileData.date_of_joining}', shift='${employeeProfileData.shift}',breakfast ='${employeeProfileData.breakfast}', lunch ='${employeeProfileData.lunch}', dinner='${employeeProfileData.dinner}', updated_at = '${now}' WHERE id='${req.params.id}'`;

    await db.query(updateQuery);
    const updatedData = await db.query(
      `SELECT * FROM employee_profiles WHERE id=$1`,
      [req.params.id]
    );
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.employee_profile_updation_success,
      profileDetails: updatedData.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_profile_updation_failure,
      error: err,
    });
  }
};

const deleteEmployeeProfile = async (req, res) => {
  try {
    const isEmployeeProfileExist = await db.query(
      `SELECT * FROM employee_profiles WHERE id = $1`,
      [req.params.id]
    );
    if (isEmployeeProfileExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeProfileNotFound,
      });
    }
    await db.query(`DELETE FROM employee_profiles WHERE id=${req.params.id}`);
    return res.status(RestAPI.STATUSCODE.noContent).send({
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
  replaceEmployeeProfile,
  deleteEmployeeProfile,
};
