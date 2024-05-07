const RestAPI = require("../../constants/enums");
const enMessage = require("../../constants/enMessage.json");
const {
  user_type_data,
  shift_data,
  guest_type_data,
  team_data,
  team_type_data,
  state_data,
  employee_category
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

const getAllTeamData = async (req, res) => {
  return await res.status(RestAPI.STATUSCODE.ok).send({
    statusCode: RestAPI.STATUSCODE.ok,
    message: enMessage.listed_success,
    teamData: team_data,
  });
};

const getAllTeamTypesData = async (req, res) => {
  return await res.status(RestAPI.STATUSCODE.ok).send({
    statusCode: RestAPI.STATUSCODE.ok,
    message: enMessage.listed_success,
    teamTypeData: team_type_data,
  });
};

const getAllStates = async (req, res) => {
  return await res.status(RestAPI.STATUSCODE.ok).send({
    statusCode: RestAPI.STATUSCODE.ok,
    message: enMessage.listed_success,
    states: state_data,
  });
};

const getAllCategories = async (req, res) => {
  return await res.status(RestAPI.STATUSCODE.ok).send({
    statusCode: RestAPI.STATUSCODE.ok,
    message: enMessage.listed_success,
    categories: employee_category,
  });
};

module.exports = {
  getAllUserTypes,
  getAllShiftData,
  getAllGuestTypesData,
  getAllTeamData,
  getAllTeamTypesData,
  getAllStates,
  getAllCategories
};
