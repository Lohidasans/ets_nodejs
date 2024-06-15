const db = require("../../config/dbConfig");
const { guest_type_data } = require("../../constants/common");
const en = require("../../constants/en.json");
const enMessage = require("../../constants/enMessage.json");
const RestAPI = require("../../constants/enums");
const { findOne, findAll } = require("../../query/common");

const createGuest = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const guestData = req.body;
    const guestQuery = await db.query(
      `INSERT INTO guests (name, phone_no, type, guest_id, email_id, company, description,created_at, updated_at) VALUES ('${guestData.name}','${guestData.phone_no}',${guestData.type}, '${guestData.guest_id}','${guestData.email_id}','${guestData.company}','${guestData.description}','${now}', '${now}') RETURNING *`
    );
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.guest_creation_success,
      data: guestQuery.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.guest_creation_failure,
      error: err,
    });
  }
};

const getGuestCompany = async (req, res) => {
  try {
    var companyDetails = await db.query(`SELECT DISTINCT company FROM guests`);
    var companyname = companyDetails.rows;

    var filterQuery = req.query;
    // search added
    if (Object.keys(filterQuery).length !== 0) {
      if (filterQuery.company) {
        companyname = companyname.filter(
          (item) => item.company == filterQuery.company
        );
      }
    }

    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      companyData: companyname,
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

const getGuestById = async (req, res) => {
  try {
    const query = findOne("guests", "id", req.params.id);
    const isGuestExist = await query;
    if (isGuestExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.guestNotFound,
      });
    }
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      data: isGuestExist.rows[0],
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

const getAllGuest = async (req, res) => {
  try {
    const query = findAll("guests", "id", "ASC");
    var allGuests = await db.query(query);
    var allGuestData = allGuests.rows;
    allGuestData = allGuestData?.map((item, index) => {
      let guestTypeName = guest_type_data?.find(
        (typeItem) => typeItem.id === item.type
      );
      return {
        ...item,
        sNo: index + 1,
        guest_type_name: guestTypeName.guest_type,
      };
    });

    var filterQuery = req.query;
    // search added
    if (Object.keys(filterQuery).length !== 0) {
      if (filterQuery.searchString) {
        allGuestData = allGuestData.filter(
          (item) =>
            item.guest_id
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase()) ||
            item.name
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase()) ||
            item.phone_no
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase()) ||
            item.company
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(filterQuery.searchString?.toLowerCase())
        );
      }
      if (filterQuery.type) {
        allGuestData = allGuestData.filter(
          (item) => item.type == filterQuery.type
        );
      }
      if (filterQuery.company) {
        allGuestData = allGuestData.filter(
          (item) => item.company == filterQuery.company
        );
      }
      if (filterQuery.guest_id) {
        allGuestData = allGuestData.filter(
          (item) => item.guest_id == filterQuery.guest_id
        );
      }
    }

    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.listed_success,
      guestDetails: allGuestData,
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

const replaceGuest = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const guestData = req.body;
    const query = findOne("guests", "id", req.params.id);
    const isGuestExist = await query;
    if (isGuestExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.guestNotFound,
      });
    }
    const updateQuery = `UPDATE guests SET name='${guestData.name}', phone_no = '${guestData.phone_no}', guest_id ='${guestData.guest_id}', email_id='${guestData.email_id}', type = '${guestData.type}', company = '${guestData.company}', description = '${guestData.description}', updated_at = '${now}' WHERE id='${req.params.id}'`;

    await db.query(updateQuery);
    const updatedData = await query;
    return res.status(RestAPI.STATUSCODE.ok).send({
      statusCode: RestAPI.STATUSCODE.ok,
      message: enMessage.guest_updation_success,
      guestDetails: updatedData.rows[0],
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.guest_updation_failure,
      error: err,
    });
  }
};

const deleteGuest = async (req, res) => {
  try {
    const query = findOne("guests", "id", req.params.id);
    const isGuestExist = await query;
    if (isGuestExist.rowCount == 0) {
      return res.status(RestAPI.STATUSCODE.notFound).send({
        statusCode: RestAPI.STATUSCODE.notFound,
        message: en.guestNotFound,
      });
    }
    await db.query(`DELETE FROM guests WHERE id=${req.params.id}`);
    return res.status(RestAPI.STATUSCODE.noContent).send({
      statusCode: RestAPI.STATUSCODE.noContent,
      message: enMessage.guest_deletion_success,
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(RestAPI.STATUSCODE.internalServerError).send({
      statusCode: RestAPI.STATUSCODE.internalServerError,
      message: enMessage.guest_deletion_failure,
      error: err,
    });
  }
};

module.exports = {
  createGuest,
  getGuestById,
  getAllGuest,
  getGuestCompany,
  replaceGuest,
  deleteGuest,
};
