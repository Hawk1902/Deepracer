module.exports = {
  development: {
    dialect: "sqlite",
    pool: {
      max: 10,
      min: 0,
      idle: 30000,
    },
    define: { charset: "utf8" },
    logging: console.log,
    benchmark: true,
    storage: "db/database.sqlite",
  },
};
