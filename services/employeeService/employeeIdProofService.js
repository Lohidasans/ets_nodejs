const db = require("../../config/dbConfig");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const RestAPI = require("../../constants/enums");

const createEmployeeIdProof = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const employeeIdProofData = req.body;
    //Check Employee Exist
    const isEmployeeExist = await db.query(
      `SELECT * from employee_profiles where employee_id = $1`,
      [employeeIdProofData.employee_id]
    );
    if (isEmployeeExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeNotFound,
      });
    }

    const employeeIdProofQuery = await db.query(
      `INSERT INTO employee_id_proofs (employee_id, proof_name, proof_number, id_proof_url_front,id_proof_url_back, created_at, updated_at) VALUES ('${employeeIdProofData.employee_id}','${employeeIdProofData.proof_name}','${employeeIdProofData.proof_number}','${employeeIdProofData.id_proof_url_front}', '${employeeIdProofData.id_proof_url_back}','${now}', '${now}') RETURNING *`
    );
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.employee_idProof_creation_success,
      data: employeeIdProofQuery.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_idProof_creation_failure,
      error: err,
    });
  }
};

const getEmployeeIdProofById = async (req, res) => {
  try {
    const isEmployeeIdProofExist = await db.query(
      `SELECT * FROM employee_id_proofs WHERE id = $1`,
      [req.params.id]
    );
    if (isEmployeeIdProofExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeIdProofNotFound,
      });
    }
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      data: isEmployeeIdProofExist.rows[0],
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

const getAllEmployeeIdProof = async (req, res) => {
  try {
    var allEmployeeIdProofs = await db.query(
      `SELECT * FROM employee_id_proofs ORDER BY id`
    );
    var allIdProofs = allEmployeeIdProofs.rows;
    var filterQuery = req.query;
    // filter by employee_id
    if (Object.keys(filterQuery).length !== 0) {
      if (filterQuery.employee_id) {
        allIdProofs = allIdProofs.filter(
          (e) => e.employee_id == filterQuery.employee_id
        );
      }
    }
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      proofDetails: allIdProofs,
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

const replaceEmployeeIdProof = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const employeeIdProofData = req.body;
    const isEmployeeIdProofExist = await db.query(
      `SELECT * FROM employee_id_proofs WHERE id = $1`,
      [req.params.id]
    );
    if (isEmployeeIdProofExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeIdProofNotFound,
      });
    }
    const updateQuery = `UPDATE employee_id_proofs SET employee_id='${employeeIdProofData.employee_id}', proof_name='${employeeIdProofData.proof_name}', proof_number='${employeeIdProofData.proof_number}', id_proof_url_front='${employeeIdProofData.id_proof_url_front}',id_proof_url_back='${employeeIdProofData.id_proof_url_back}', updated_at = '${now}' WHERE id='${req.params.id}'`;

    await db.query(updateQuery);
    const updatedData = await db.query(
      `SELECT * FROM employee_id_proofs WHERE id=$1`,
      [req.params.id]
    );
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.employee_idProof_updation_success,
      proofDetails: updatedData.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_idProof_updation_failure,
      error: err,
    });
  }
};

const deleteEmployeeIdProof = async (req, res) => {
  try {
    const isEmployeeIdProofExist = await db.query(
      `SELECT * FROM employee_id_proofs WHERE id = $1`,
      [req.params.id]
    );
    if (isEmployeeIdProofExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.employeeIdProofNotFound,
      });
    }
    await db.query(`DELETE FROM employee_id_proofs WHERE id=${req.params.id}`);
    return res.status(RestAPI.STATUSCODE.noContent).send({
      statusCode: RestAPI.STATUSCODE.noContent,
      message: enMessage.employee_idProof_deletion_success,
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.employee_idProof_deletion_failure,
      error: err,
    });
  }
};

module.exports = {
  createEmployeeIdProof,
  getEmployeeIdProofById,
  getAllEmployeeIdProof,
  replaceEmployeeIdProof,
  deleteEmployeeIdProof,
};
