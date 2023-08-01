const request = require("supertest");
import * as dotenv from "dotenv";
dotenv.config();
import app from "../../../..";
import UrlConstants from "../../../domain/constants/urlConstants/UrlConstants";
const id = "fcb71c1a-48e9-4b2e-b954-3a19c2fe7319";

describe("Geekonomy-Project: Test cases for deleting book", () => {
  test("1. test case without jwt token", async () => {
    const res = await request(app)
      .delete(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.deleteBook}${id}`)
      .send();
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe("Authorization token is required");
  });
});
