const { Client } = require("pg");

const client = new Client({
  host: "3.111.37.8",
  user: "postgres",
  port: 5432,
  password: "dustMan",
  database: "EmployeeTrackingsys",
});
module.exports = client;
