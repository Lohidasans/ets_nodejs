"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employee_mobiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.STRING,
      },
      mobile_name: {
        type: Sequelize.STRING,
      },
      mobile_weight: {
        type: Sequelize.STRING,
      },
      mobile_front_image_url: {
        type: Sequelize.STRING,
      },
      mobile_back_image_url: {
        type: Sequelize.STRING,
      },
      mobile_description: {
        type: Sequelize.STRING,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employee_mobiles");
  },
};
