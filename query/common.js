const findOne = (table, column, value) => {
  return `SELECT * FROM ${table} WHERE ${column} = ${value};`;
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
