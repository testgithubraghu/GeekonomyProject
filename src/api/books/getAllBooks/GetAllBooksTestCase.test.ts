const request = require("supertest");
import * as dotenv from "dotenv";
dotenv.config();
import app from "../../../..";
import UrlConstants from "../../../domain/constants/urlConstants/UrlConstants";
const jwt = process.env.token;

describe("Geekonomy-Project: Test cases for fetching all books", () => {
  test("1. test case without jwt token", async () => {
    const res = await request(app)
    .get(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.getAllBooks}`)
      .send();
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe("Authorization token is required");
  });

  test("2. test case with valid request", async () => {
    const res = await request(app)
      .get(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.getAllBooks}`)
      .set({ jwt })
      .send();
    expect(res.body.code).toBe(200);
    expect(res.body.message).toBe("books fetched successfully");
  });
});
