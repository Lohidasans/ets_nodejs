const USERTYPE = {
  admin: 1,
  security: 2,
  canteen: 3,
  drop: 4,
};

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
  USERTYPE,
  STATUSCODE,
};
