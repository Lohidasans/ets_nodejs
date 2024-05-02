'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee_ornament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee_ornament.init({
    employee_id: DataTypes.STRING,
    ornament_name: DataTypes.STRING,
    ornament_weight: DataTypes.STRING,
    ornament_image_url: DataTypes.STRING,
    ornament_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employee_ornament',
  });
  return employee_ornament;
};