'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee_profile.init({
    name: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    email_id: DataTypes.STRING,
    phone_no: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    pincode: DataTypes.STRING,
    thumb_image_url: DataTypes.STRING,
    image_url: DataTypes.STRING,
    team_id: DataTypes.INTEGER,
    sub_team_id: DataTypes.STRING,
    employee_category: DataTypes.STRING,
    employee_id: DataTypes.STRING,
    date_of_joining: DataTypes.DATE,
    shift: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employee_profile',
  });
  return employee_profile;
};