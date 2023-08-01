const request = require("supertest");
import * as dotenv from "dotenv";
dotenv.config();
import app from "../../../..";
import UrlConstants from "../../../domain/constants/urlConstants/UrlConstants";
const jwt = process.env.token;
const id = "49c32096-a0e9-41a2-bd64-be531f86a3a6";

describe("Geekonomy-Project: Test cases for updating book by id", () => {
  test("1. test case without jwt token", async () => {
    const res = await request(app)
      .put(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.updateBook}${id}`)
      .send();
    expect(res.body.code).toBe(400);
    expect(res.body.message).toBe("Authorization token is required");
  });

  test("2. test case with id, which doesn't exist in database", async () => {
    const res = await request(app)
      .put(`${UrlConstants.baseEndpoint}${UrlConstants.bookEndpoint.updateBook}${id}`)
      .set({ jwt })
      .send({
        title: "Start with Why: How to Great Leaders Inspire Everyone to Take Action",
        author: "Simon Sinek katich",
        description:
          "he book starts with comparing the two main ways to influence human behaviour: manipulation and inspiration. Sinek argues that inspiration is the more powerful and sustainable of the two.",
        publicationYear: "2019-10-24",
      });
    expect(res.body.code).toBe(404);
    expect(res.body.message).toBe("Record not found to update");
  });
});
