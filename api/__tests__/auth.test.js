import request from "supertest";
import app from "../index.js"; 
import { User } from "../models/index.js";
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth APIs", () => {
  let userToken;
  let verificationCode;
  let passwordResetToken;
  
  test("User Signup", async () => {
    const response = await request(app).post("/api/auth/signup").send({
      email: "testuser@example.com",
      password: "password123",
      name: "Test User",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("User Login", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    userToken = response.headers["set-cookie"][0];
  });

  test("Check Auth", async () => {
    const response = await request(app)
      .get("/api/auth/check-auth")
      .set("Cookie", userToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("Forgot Password", async () => {
    const response = await request(app).post("/api/auth/forgot-password").send({
      email: "testuser@example.com",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    const user = await User.findOne({ email: "testuser@example.com" });
    passwordResetToken = user.resetPasswordToken;
  });

  test("Reset Password", async () => {
    const response = await request(app).post("/api/auth/reset-password").send({
      token: passwordResetToken,
      password: "newpassword123",
      confirmPassword: "newpassword123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("User Logout", async () => {
    const response = await request(app).post("/api/auth/logout").set("Cookie", userToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});