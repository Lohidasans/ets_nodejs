'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      email_id: {
        type: Sequelize.STRING
      },
      phone_no: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.STRING
      },
      thumb_image_url: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      team_id: {
        type: Sequelize.INTEGER
      },
      sub_team_id: {
        type: Sequelize.STRING
      },
      employee_category: {
        type: Sequelize.STRING
      },
      employee_id: {
        type: Sequelize.STRING
      },
      date_of_joining: {
        type: Sequelize.DATE
      },
      shift: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('employee_profiles');
  }
};