const en = require("../constants/en.json");
const { STATUSCODE } = require(".././constants/enums");

const permission = {
  permissionId: 0,
  id: function (req, res, next) {
    decodedToken.id = this.permissionId;
    next();
  },
};

const checkAuthorization = async (req, res, next) => {
  try {
    const isPermissionExists = decodedToken.permissions.includes(
      decodedToken.id
    );
    if (!isPermissionExists) {
      return res
        .status(STATUSCODE.forbidden)
        .send({ statusCode: STATUSCODE.forbidden, message: en.accessHaveNot });
    }

    next();
  } catch (err) {
    return res.status(STATUSCODE.internalServerError).send(err);
  }
};

module.exports = { checkAuthorization, permission };
