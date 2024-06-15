'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_details.init({
    employee_id: DataTypes.STRING,
    employee_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_details',
  });
  return user_details;
};