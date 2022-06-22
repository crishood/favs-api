const clonServer = require("supertest");
const { connect, disconnected, cleanup } = require("../db");
const app = require("../app");
const User = require("../models/user.model");

describe("user", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconnected();
  });

  it("Should create a user correctly", async () => {
    const user = { email: "test@test.com", password: "12345678Az" };
    const res = await clonServer(app).post("/users/register").send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });

  it("Should not create user when there is no email", async () => {
    const user = { password: "12345Abcz" };
    const res = await clonServer(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User could not be registered/i);
  });

  it("Should not create user when email is invalid", async () => {
    const user = { email: "test", password: "12345Abcz" };
    const res = await clonServer(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User could not be registered/i);
  });

  it("Should not create user when email already exists", async () => {
    const user = { email: "test@test.com", password: "12345Abcz" };
    await User.create(user);
    const res = await clonServer(app).post("/users/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User could not be registered/i);
  });

  it("Should signin user correctly", async () => {
    const user = { email: "test@test.com", password: "12345Abcz" };
    await clonServer(app).post("/users/register").send(user);
    const res = await clonServer(app).post("/users/login").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("token");
  });

  it("Should not sigin if incorrect password", async () => {
    const user = { email: "test@test.com", password: "12345Abcz" };
    await clonServer(app).post("/users/register").send(user);

    const res = await clonServer(app)
      .post("/users/login")
      .send({ ...user, password: "1" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User or password not valid/i);
  });

  it("Should not signin user if email does not exist", async () => {
    const user = { email: "test@test.com", password: "12345Abcz" };
    const res = await clonServer(app).post("/users/login").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User or password not valid/i);
  });

  it("Should list users correctly", async () => {
    const user = { email: "test@test.com", password: "12345Abcz" };
    await clonServer(app).post("/users/register").send(user);
    await clonServer(app).post("/users/login").send(user);
    const res = await clonServer(app).get("/users");

    expect(res.statusCode).toBe(200);
  });

  it("Should delete an user correctly", async () => {
    const user = { email: "test@test.com", password: "12345Abcz" };
    await clonServer(app).post("/users/register").send(user);
    await clonServer(app).post("/users/login").send(user);
    const res = await clonServer(app).delete(`/users/userId`);

    expect(res.statusCode).toBe(404);
  });
});
