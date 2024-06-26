'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  guest.init({
    name: DataTypes.STRING,
    phone_no: DataTypes.STRING,
    type: DataTypes.INTEGER,
    guest_id: DataTypes.STRING,
    email_id: DataTypes.STRING,
    company: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'guest',
  });
  return guest;
};