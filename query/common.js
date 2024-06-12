const db = require("../config/dbConfig");

const findOne = async (table, column, value) => {
  const query = `SELECT * FROM ${table} WHERE ${column} = $1;`;
  const values = [value];
  try {
    const result = await db.query(query, values);
    return result;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

const findAll = (table, column, option, where) => {
  let query = `SELECT * FROM ${table}`;
  if (where) {
    const whereClause = Object.keys(where)
      .map((key) => `${key} = ${where[key]}`)
      .join(" AND ");
    query += ` WHERE ${whereClause}`;
  }
  const orderByClause = `${column} ${option || "ASC"}`;
  query += ` ORDER BY ${orderByClause};`;
  return query;
};

module.exports = {
  findOne,
  findAll,
};
