const RestAPI = require("../../constants/enums");
const enMessage = require("../../constants/enMessage.json");
const {
  user_type_data,
  shift_data,
  guest_type_data,
} = require("../../constants/common");

const getAllUserTypes = async (req, res) => {
  return await res.status(RestAPI.STATUSCODE.ok).send({
    statusCode: RestAPI.STATUSCODE.ok,
    message: enMessage.listed_success,
    data: user_type_data,
  });
};

const getAllShiftData = async (req, res) => {
  return await res.status(RestAPI.STATUSCODE.ok).send({
    statusCode: RestAPI.STATUSCODE.ok,
    message: enMessage.listed_success,
    shiftData: shift_data,
  });
};

const getAllGuestTypesData = async (req, res) => {
  return await res.status(RestAPI.STATUSCODE.ok).send({
    statusCode: RestAPI.STATUSCODE.ok,
    message: enMessage.listed_success,
    guestTypeData: guest_type_data,
  });
};

module.exports = {
  getAllUserTypes,
  getAllShiftData,
  getAllGuestTypesData,
};
