const PERMISSIONS = {
  master: 1,
  gateManagements: 2,
  canteenManagement: 3,
  userManagements: 4,
  reports: 5,
};

const USERTYPE = {
  admin: 1,
  superAdmin: 2,
  security: 3,
  canteen: 4,
};

const TEAMTYPE = {
  individual: 1,
  grouped: 2
}

const GUESTTYPE = {
  customers: 1, 
  others: 2
}

const SHIFT = {
  morning: 1,
  afternoon: 2,
  night : 3
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
  USERTYPE,
  TEAMTYPE,
  GUESTTYPE,
  SHIFT,
  STATUSCODE,
};
