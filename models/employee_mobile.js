'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee_mobile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee_mobile.init({
    employee_id: DataTypes.STRING,
    mobile_name: DataTypes.STRING,
    mobile_weight: DataTypes.STRING,
    mobile_front_image_url: DataTypes.STRING,
    mobile_back_image_url: DataTypes.STRING,
    mobile_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employee_mobile',
  });
  return employee_mobile;
};