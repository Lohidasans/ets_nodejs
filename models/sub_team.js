'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sub_team.init({
    team_id: DataTypes.INTEGER,
    sub_team: DataTypes.STRING,
    leader_id: DataTypes.STRING,
    team_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sub_team',
  });
  return sub_team;
};