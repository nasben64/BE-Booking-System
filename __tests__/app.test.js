const request = require("supertest");
const app = require("../app.js");
// const seed = require("../seeds.js");
const database = require("../connection");

// beforeEach(() => {
//   return seed();
// });

afterAll(async () => {
  await database.close();
});

describe("GET /api/appointments/", () => {
  test("200: returns all appointments", () => {
    return request(app)
      .get("/api/appointments/")
      .expect(200)
      .then(({ body }) => {
        // console.log(body);
        body.appointments.forEach((appointment) => {
          expect(appointment).toMatchObject({
            date: expect.any(String),
            time: expect.any(String),
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
