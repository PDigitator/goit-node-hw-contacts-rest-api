//! test login controller
//! Response must have status code 200
//! The token must be returned in the response
//! The response should return a user object with 2 fields email and subscription, having the data type String

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");

const { User } = require("../models/user");

const { DB_HOST_TEST, PORT } = process.env;

describe("test login controller", () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);

    await User.deleteMany();
  });
  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  const registerData = {
    email: "testmail@gmail.com",
    password: "123456",
  };

  test("register with correct data", async () => {
    const { statusCode, body } = await request(app)
      .post("/users/register")
      .send(registerData);

    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(registerData.email);

    const user = await User.findOne({ email: registerData.email });
    expect(user.email).toBe(registerData.email);
  });

  test("should not register the same user 2 times", async () => {
    await request(app).post("/users/register").send({
      email: "testmail2@gmail.com",
      password: "123456",
    });

    const { statusCode } = await request(app).post("/users/register").send({
      email: "testmail2@gmail.com",
      password: "123456",
    });

    expect(statusCode).toBe(409);
  });

  test("response have status code 200", async () => {
    const response = await request(app).post("/users/login").send(registerData);

    expect(response.statusCode).toBe(200);
  });

  test("the token must be returned in the response", async () => {
    const { body } = await request(app).post("/users/login").send(registerData);

    expect(body).toHaveProperty("token");
  });

  test("the response should return a user object", async () => {
    const { body } = await request(app).post("/users/login").send(registerData);

    expect(body).toHaveProperty("user");
    expect(typeof body.user === "object" && body.user !== null).toBe(true);
  });

  test("the user object have 2 fields email and subscription", async () => {
    const { body } = await request(app).post("/users/login").send(registerData);

    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");
  });

  test("the fields email and subscription have the data type String", async () => {
    const { body } = await request(app).post("/users/login").send(registerData);

    const { user } = body;

    expect(typeof user.email).toBe("string");
    expect(typeof user.email).toBe("string");
  });
});
