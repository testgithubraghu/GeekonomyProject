"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const roleEnum = {
  ADMIN: "1001",
  USER: "1002",
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = "ProjectGeekonomy@123";
    const salt = await bcrypt.genSalt(10);
    const hashedPassworrd = await bcrypt.hash(password, salt);

    await queryInterface.bulkInsert(
      "users",
      [
        //seeding admin
        {
          id: crypto.randomUUID(),
          name: "raghavendra",
          email: "hnraghavendra806@gmail.com",
          password: hashedPassworrd,
          role: roleEnum.ADMIN,
        },
        //seeding USER
        {
          id: crypto.randomUUID(),
          name: "bharath",
          email: "bharathv787@gmail.com",
          password: hashedPassworrd,
          role: roleEnum.USER,
        },
      ],
      { returning: ["id"] }
    );
  },
  down: (queryInterface, Sequelize) => {},
};
