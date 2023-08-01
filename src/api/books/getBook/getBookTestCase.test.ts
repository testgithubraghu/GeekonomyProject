const request = require("supertest");
import * as dotenv from "dotenv";
dotenv.config();
import app from "../../../..";
import UrlConstants from "../../../domain/constants/urlConstants/UrlConstants";
const jwt = process.env.token;
const id = "49c32096-a0e9-41a2-bd64-be531f86a3a7";

describe("Geekonomy-Project: Test cases for fetching book by id", () => {
  test("1. test case without jwt token", async () => {
    const res = await request(app)
    .get(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.getBook}${id}`)
      .send();
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe("Authorization token is required");
  });

  test("2. test case with id, which doesn't exist in database", async () => {
    const res = await request(app)
    .get(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.getBook}${id}`)
      .set({ jwt })
      .send();
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe("Record not found");
  });
});
