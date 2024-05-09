'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gate_management extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gate_management.init({
    employee_id: DataTypes.STRING,
    employee_name: DataTypes.STRING,
    authorized_name: DataTypes.STRING,
    options: DataTypes.STRING,
    reason: DataTypes.STRING,
    in_date_time: DataTypes.DATE,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'gate_management',
  });
  return gate_management;
};