const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { userOne, userOneId } = require("./db")

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()

})

test("should REGISTER user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Khoa",
      email: "khoa@gmail.com",
      password: "12345",
      passwordConfirm: "12345",
      age: 10
    })
    .expect(201)
})

test("should LOGIN user", async () => {
  await request(app).post("/auth/login")
    .send({
      email: "khoa2@gmail.com",
      password: "12345"
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.user.email).toBe("khoa2@gmail.com")
    })
})


test("Should update Password", async () => {

  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0]}`)
    .send({ password: "123456" })
    .expect(200);
})