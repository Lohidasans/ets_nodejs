const { Client } = require("pg");

const client = new Client({
  host: "35.154.73.169",
  user: "postgres",
  port: 5432,
  password: "ets@1234",
  database: "EmployeeTrackingsys",
});
module.exports = client;
