const jwt = require("jsonwebtoken");
const jwt_private_key = process.env.JWT_PRIVATE_KEY;
const en = require("../constants/en.json");
const {STATUSCODE} = require("../constants/enums");


module.exports = function (req, res, next) {
  try{
    const token = req.headers['authorization'];
    if (!token) return res.status(STATUSCODE.unauthorized).send({ statusCode:STATUSCODE.unauthorized, message: en.accessDenied });

    const splitedbearer = token.split(' ');
    const bearerToken = splitedbearer[1];
    const decoded = jwt.verify(bearerToken, `${jwt_private_key}`);
    decodedToken = decoded;
    next();
  } catch (ex) {
    res.status(STATUSCODE.badRequest).send({ statusCode:STATUSCODE.unauthorized, message: en.invalidToken });
  }
};
