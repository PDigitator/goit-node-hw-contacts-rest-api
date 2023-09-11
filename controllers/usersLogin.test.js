//! test login controller
//! Response must have status code 200
//! The token must be returned in the response
//! The response should return a user object with 2 fields email and subscription, having the data type String

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");

const { DB_HOST } = process.env;

describe("test login controller", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });
  afterAll(async () => await mongoose.disconnect());

  test("response have status code 200", async () => {
    const email = "testmail@gmail.com";
    const password = "123456";
    const response = await request(app)
      .post("/users/login")
      .send({ email, password });

    expect(response.statusCode).toBe(200);
  });

  test("the token must be returned in the response", async () => {
    const email = "testmail@gmail.com";
    const password = "123456";
    const { body } = await request(app)
      .post("/users/login")
      .send({ email, password });

    expect(body).toHaveProperty("token");
  });

  test("the response should return a user object", async () => {
    const email = "testmail@gmail.com";
    const password = "123456";
    const { body } = await request(app)
      .post("/users/login")
      .send({ email, password });

    expect(body).toHaveProperty("user");
    expect(typeof body.user === "object" && body.user !== null).toBe(true);
  });

  test("the user object have 2 fields email and subscription", async () => {
    const email = "testmail@gmail.com";
    const password = "123456";
    const { body } = await request(app)
      .post("/users/login")
      .send({ email, password });

    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");
  });

  test("the fields email and subscription have the data type String", async () => {
    const email = "testmail@gmail.com";
    const password = "123456";
    const { body } = await request(app)
      .post("/users/login")
      .send({ email, password });

    const { user } = body;

    expect(typeof user.email).toBe("string");
    expect(typeof user.email).toBe("string");
  });
});
