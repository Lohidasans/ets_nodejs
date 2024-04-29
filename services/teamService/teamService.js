const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const RestAPI = require("../../constants/enums");

const createTeam = async (req, res) => {
    try {
        const now = new Date().toISOString();
        console.log("saddddddddd")
        const teamData = req.body;
        const teamQuery = await db.query(
            `INSERT INTO teams (team_name, created_at, updated_at) VALUES ('${teamData.team_name}', '${now}', '${now}') RETURNING *`
        );
        return res.status(RestAPI.STATUSCODE.ok).send({
            statusCode: RestAPI.STATUSCODE.ok,
            message: enMessage.team_creation_success,
            data: teamQuery.rows[0],
        });
    } catch (err) {
        console.log("Error :", err);
        return res.status(RestAPI.STATUSCODE.internalServerError).send({
            statusCode: RestAPI.STATUSCODE.internalServerError,
            message: enMessage.team_creation_failure,
            error: err,
        });
    }
};

const getTeamById = async (req, res) => {
    try {
        const isTeamExist = await db.query(`SELECT * FROM teams WHERE id = $1`, [
            req.params.id,
        ]);
        if (isTeamExist.rowCount==0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.teamNotFound,
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

const getAllTeam = async (req, res) => {
    try {
        const allTeams = await db.query(`SELECT * FROM teams ORDER BY id`);
        return res.status(RestAPI.STATUSCODE.ok).send({
            statusCode: RestAPI.STATUSCODE.ok,
            message: enMessage.listed_success,
            category: allTeams.rows,
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

const replaceTeam = async (req, res) => {
    try {
        const now = new Date().toISOString();
        const teamData = req.body;
        const isTeamExist = await db.query(`SELECT * FROM teams WHERE id = $1`, [
            req.params.id,
        ]);
        if (isTeamExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.teamNotFound,
            });
        }
        const updateQuery = `UPDATE teams SET team_name='${teamData.team_name}', updated_at = '${now}' WHERE id='${req.params.id}'`;
        await db.query(updateQuery);
        const updatedData = await db.query(
            `SELECT * FROM teams WHERE id=$1`,
            [req.params.id]
        );
        return res
            .status(RestAPI.STATUSCODE.ok)
            .send({
                statusCode: RestAPI.STATUSCODE.ok,
                message: enMessage.team_updation_success,
                category: updatedData.rows[0],
            });
    } catch (err) {
        console.log("Error :", err);
        return res.status(RestAPI.STATUSCODE.internalServerError).send({
            statusCode: RestAPI.STATUSCODE.internalServerError,
            message: enMessage.team_updation_failure,
            error: err,
        });
    }
};

const deleteTeam = async (req, res) => {
    try {
        const isTeamExist = await db.query(`SELECT * FROM teams WHERE id = $1`, [
            req.params.id,
        ]);
        if (isTeamExist.rowCount == 0) {
            return res.status(RestAPI.STATUSCODE.notFound).send({
                statusCode: RestAPI.STATUSCODE.notFound,
                message: en.teamNotFound,
            });
        }
        await db.query(`DELETE FROM teams WHERE id=${req.params.id}`);
        return res
            .status(RestAPI.STATUSCODE.noContent)
            .send({
                statusCode: RestAPI.STATUSCODE.noContent,
                message: enMessage.team_deletion_success,
            });
    } catch (err) {
        console.log("Error :", err);
        return res.status(RestAPI.STATUSCODE.internalServerError).send({
            statusCode: RestAPI.STATUSCODE.internalServerError,
            message: enMessage.team_deletion_failure,
            error: err,
        });
    }
};

module.exports = {
    createTeam,
    getTeamById,
    getAllTeam,
    replaceTeam,
    deleteTeam,
};
