"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "access_permissions",
      [
        {
          permission: "Dashboard",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          permission: "Master",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          permission: "Gate Managements",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          permission: "Canteen Management",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          permission: "User Managements",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          permission: "Security Management",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          permission: "Reports",
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("access_permissions", null, {});
  },
};
