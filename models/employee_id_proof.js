'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee_id_proof extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee_id_proof.init({
    employee_id: DataTypes.STRING,
    proof_name: DataTypes.STRING,
    proof_number: DataTypes.STRING,
    id_proof_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employee_id_proof',
  });
  return employee_id_proof;
};