'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class canteen_management extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  canteen_management.init({
    employee_id: DataTypes.STRING,
    is_breakfast: DataTypes.BOOLEAN,
    is_lunch: DataTypes.BOOLEAN,
    is_dinner: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    device_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'canteen_management',
  });
  return canteen_management;
};