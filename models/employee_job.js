'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee_job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee_job.init({
    employee_id: DataTypes.STRING,
    organization: DataTypes.STRING,
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
    description: DataTypes.STRING,
    certificate_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employee_job',
  });
  return employee_job;
};