require('dotenv').config();

const { dbUsername, dbUserPassword, dbName, dbHost, dbDialect, dbPoolMax, dbPoolMin, dbPoolAquire, dbPoolIdle } = process.env;

module.exports = {
  development: {
    logging: false,
    username: dbUsername,
    password: dbUserPassword,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
    pool: {
      max: Number(dbPoolMax),
      min: Number(dbPoolMin),
      acquire: Number(dbPoolAquire),
      idle: Number(dbPoolIdle),
    },
    define: {
      freezeTableName: true,
    },
  },
  staging: {
    logging: false,
    username: dbUsername,
    password: dbUserPassword,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
    pool: {
      max: Number(dbPoolMax),
      min: Number(dbPoolMin),
      acquire: Number(dbPoolAquire),
      idle: Number(dbPoolIdle),
    },
    define: {
      freezeTableName: true,
    },
  },
  production: {
    logging: false,
    username: dbUsername,
    password: dbUserPassword,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
    pool: {
      max: Number(dbPoolMax),
      min: Number(dbPoolMin),
      acquire: Number(dbPoolAquire),
      idle: Number(dbPoolIdle),
    },
    define: {
      freezeTableName: true,
    },
  },
};
