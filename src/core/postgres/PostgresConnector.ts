/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize';
import config from '../../domain/db/config/config';

const configBasedOnEnvironment = config[process.env.environment ? process.env.environment : 'development'];

const postgresConnection = new Sequelize(
  configBasedOnEnvironment.database,
  configBasedOnEnvironment.username,
  configBasedOnEnvironment.password,
  {
    host: configBasedOnEnvironment.host,
    dialect: configBasedOnEnvironment.dialect,
    pool: {
      max: configBasedOnEnvironment.pool.max,
      min: configBasedOnEnvironment.pool.min,
      acquire: configBasedOnEnvironment.pool.acquire,
      idle: configBasedOnEnvironment.pool.idle,
    },
    define: {
      freezeTableName: true,
    },
  },
);

export default postgresConnection;
