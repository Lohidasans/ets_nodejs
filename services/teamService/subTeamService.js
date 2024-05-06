const db = require("../../config/dbConfig");
const { team_type_data, team_data } = require("../../constants/common");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const RestAPI = require("../../constants/enums");

const createSubTeam = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const subTeamData = req.body;
    //To check team exists
    const isTeamExist = await db.query(`SELECT * FROM teams WHERE id = $1`, [
      subTeamData.team_id,
    ]);
    if (isTeamExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.teamNotFound,
      });
    }

    const subTeamQuery = await db.query(
      `INSERT INTO sub_teams (team_id, sub_team, leader_id, team_type_id, created_at, updated_at) VALUES (${subTeamData.team_id},'${subTeamData.sub_team}', '${subTeamData.leader_id}', ${subTeamData.team_type_id}, '${now}', '${now}') RETURNING *`
    );
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.subTeam_creation_success,
      data: subTeamQuery.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.subTeam_creation_failure,
      error: err,
    });
  }
};

const getSubTeamById = async (req, res) => {
  try {
    const isTeamExist = await db.query(
      `SELECT * FROM sub_teams WHERE id = $1`,
      [req.params.id]
    );
    if (isTeamExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.subTeamNotFound,
      });
    }
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      data: isTeamExist.rows[0],
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

const getAllSubTeam = async (req, res) => {
  try {
    const queryString = `
            SELECT
            sub_teams.*,
            teams.team_name AS team_name,
            COUNT(sub_teams.team_id) AS no_of_members
            FROM sub_teams 
            INNER JOIN teams ON sub_teams.team_id = teams.id
            GROUP BY teams.team_name,
            sub_teams.id
            ORDER BY sub_teams.id
        `;
    // const queryString = `
    //     SELECT
    //         teams.team_name AS team_name,
    //         COUNT(sub_teams.team_id) AS no_of_members
    //     FROM
    //         sub_teams
    //     JOIN
    //         teams ON sub_teams.team_id = teams.id
    //     GROUP BY
    //         teams.team_name
    //     ORDER BY
    //         teams.team_name`;

    // {
    //     "statusCode": 200,
    //         "message": "Data Retrieved Successfully",
    //             "category": [
    //                 {
    //                     "team_name": "Admin",
    //                     "no_of_members": "1"
    //                 },
    //                 {
    //                     "team_name": "Polishing",
    //                     "no_of_members": "3"
    //                 },
    //                 {
    //                     "team_name": "Workshop",
    //                     "no_of_members": "1"
    //                 }
    //             ]
    // }

    const result = await db.query(queryString);
    let allTeams = result.rows;

    allTeams = allTeams?.map((item, index) => {
      let teamTypeName = team_type_data.find(
        (typeItem) => typeItem.id === item.team_type_id
      );
      return {
        ...item,
        sNo: index + 1,
        team_type_name: teamTypeName.team_type,
      };
    });

    allTeams = allTeams?.map((item) => {
      let teamName = team_data?.find(
        (teamItem) => teamItem.id === item.team_id
      );
      return {
        ...item,
        team_name: teamName.team,
      };
    });
    var filterQuery = req.query;
    // search added
    if (Object.keys(filterQuery).length !== 0) {
      if (filterQuery.searchString) {
        allTeams = allTeams.filter(
          (item) =>
            item.sub_team
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase()) ||
            item.leader_id
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase()) ||
            item.team_name
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase())
        );
      }
      if (filterQuery.team_type_id) {
        allTeams = allTeams.filter(
          (item) => item.team_type_id == filterQuery.team_type_id
        );
      }
      if (filterQuery.team_id) {
        allTeams = allTeams.filter(
          (item) => item.team_id == filterQuery.team_id
        );
      }
    }

    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      subTeamDetails: allTeams,
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

const replaceSubTeam = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const teamData = req.body;
    const isTeamExist = await db.query(
      `SELECT * FROM sub_teams WHERE id = $1`,
      [req.params.id]
    );
    if (isTeamExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.subTeamNotFound,
      });
    }
    const updateQuery = `UPDATE sub_teams SET team_id='${teamData.team_id}', sub_team='${teamData.sub_team}',leader_id ='${teamData.leader_id}', team_type_id='${teamData.team_type_id}', updated_at = '${now}' WHERE id='${req.params.id}'`;
    await db.query(updateQuery);
    const updatedData = await db.query(`SELECT * FROM sub_teams WHERE id=$1`, [
      req.params.id,
    ]);
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.subTeam_updation_success,
      subTeamDetails: updatedData.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.subTeam_updation_failure,
      error: err,
    });
  }
};

const deleteSubTeam = async (req, res) => {
  try {
    const isTeamExist = await db.query(
      `SELECT * FROM sub_teams WHERE id = $1`,
      [req.params.id]
    );
    if (isTeamExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.subTeamNotFound,
      });
    }
    await db.query(`DELETE FROM sub_teams WHERE id=${req.params.id}`);
    return res.status(RestAPI.STATUSCODE.noContent).send({
      statusCode: RestAPI.STATUSCODE.noContent,
      message: enMessage.subTeam_deletion_success,
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.subTeam_deletion_failure,
      error: err,
    });
  }
};

module.exports = {
  createSubTeam,
  getSubTeamById,
  getAllSubTeam,
  replaceSubTeam,
  deleteSubTeam,
};
