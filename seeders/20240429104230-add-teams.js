'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "teams",
      [
        {
          team_name: "Admin",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          team_name: "Workshop",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          team_name: "Polishing",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          team_name: "Security",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          team_name: "Canteen",
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("teams", null, {});
  }
};
