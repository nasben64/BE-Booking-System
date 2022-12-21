const { ServerDescription } = require("mongodb");
const request = require("supertest");
const app = require("../app.js");
const database = require("../connection");
const seed = require("../seeds.js");

beforeEach(() => {
  // console.log(seed);
  return seed();
});

afterAll(async () => {
  await database.close();
});

describe("GET /api/appointments/", () => {
  test("200: returns a count of available appointments per day", () => {
    return request(app)
      .get("/api/appointments/")
      .expect(200)
      .then(({ body }) => {
        // console.log(body);
        body.appointments.forEach((appointment) => {
          expect(appointment).toMatchObject({
            _id: expect.any(String),
            count: expect.any(Number),
          });
        });
      });
  });
  test("404: returns an error for an api that is not found", () => {
    return request(app)
      .get("/api/appointment")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("path not found");
      });
  });
});

describe("GET /api/users", () => {
  test("200: returns all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        body.users.forEach((user) => {
          expect(user).toMatchObject({
            firstName: expect.any(String),
            lastName: expect.any(String),
            email: expect.any(String),
            username: expect.any(String),
            password: expect.any(String),
          });
        });
      });
  });
  test("404: returns an error for an api that is not found", () => {
    return request(app)
      .get("/api/user")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("path not found");
      });
  });
});

describe("POST /api/users", () => {
  test("201: create and return the new user", () => {
    const newUser = {
      firstName: "Tom",
      lastName: "Smith",
      username: "ts",
      email: "tom@yahoo.com",
      password: "1234",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          _id: expect.any(String),
        });
      });
  });
  test("400: return an error when some fields are missing", () => {
    const newUser = {
      lastName: "Smith",
      username: "ts",
      email: "tom@yahoo.com",
      password: "1234",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe(
          "Users validation failed: firstName: Enter a firstName."
        );
      });
  });
});

describe("POST /api/users/:username", () => {
  test("200: return a user object if exists otherwise return empty object", () => {
    const userPassword = {
      password: "password",
    };
    return request(app)
      .post("/api/users/gs")
      .send(userPassword)
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          username: "gs",
          password: userPassword.password,
          _id: expect.any(String),
        });
      });
  });
  test("404: return a user not found message when passed invalid details", () => {
    const userPassword = {
      password: "123",
    };
    return request(app)
      .post("/api/users/gs")
      .send(userPassword)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("incorrect username or password");
      });
  });
});
