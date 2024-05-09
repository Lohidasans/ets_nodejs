'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gate_managements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.STRING
      },
      employee_name: {
        type: Sequelize.STRING
      },
      authorized_name: {
        type: Sequelize.STRING
      },
      options: {
        type: Sequelize.STRING
      },
      reason: {
        type: Sequelize.STRING
      },
      in_date_time: {
        type: Sequelize.DATE
      },
      is_deleted: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('gate_managements');
  }
};