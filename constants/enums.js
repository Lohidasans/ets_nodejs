const PERMISSIONS = {
  dashboard: 1,
  master: 2,
  gateManagements: 3,
  canteenManagement: 4,
  userManagements: 5,
  securityManagement: 6,
  reports: 7,
};

const SECURITYSTATUS = {
  notYetChecked: 0,
  allowInside: 1,
  allowOutside: 2,
}

const STATUSCODE = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  expectationFailed: 417,
  internalServerError: 500,
};

module.exports = {
  PERMISSIONS,
  SECURITYSTATUS,
  STATUSCODE,
};
