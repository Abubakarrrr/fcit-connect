import request from "supertest";
import { app } from "../app"; 
import mongoose from "mongoose";

jest.mock("../middleware/auth", () => ({
  authenticate: jest.fn((req, res, next) => {
    req.userId = "mockUserId"; // Set mock userId
    next();
  }),
}));

describe("Project Routes", () => {
  let projectId = null;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new project", async () => {
    const projectData = {
      title: "Project Test",
      description: "Test project description",
      campus: "PUCIT",
      department: "Computer Science",
      year: 2025,
      category: "Software Engineering",
      supervisor: "Prof. XYZ",
      githubLink: "https://github.com/testproject",
      thumbnail: "https://example.com/thumbnail.jpg",
    };

    const res = await request(app)
      .post("/api/projects/create")
      .send(projectData)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Project uploaded successfully");
    expect(res.body.projectData.title).toBe(projectData.title);

    // Store projectId for future updates and deletions
    projectId = res.body.projectData._id;
  });

  it("should fail if required fields are missing", async () => {
    const projectData = {
      title: "Project Test",
      description: "Test project description",
      campus: "PUCIT",
      year: 2025,
      category: "Software Engineering",
      supervisor: "Prof. XYZ",
      githubLink: "https://github.com/testproject",
      thumbnail: "https://example.com/thumbnail.jpg",
    };

    const res = await request(app)
      .post("/api/projects/create")
      .send(projectData)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Missing required fields");
  });

  it("should update the project", async () => {
    const updateData = {
      title: "Updated Project Title",
      description: "Updated description",
      campus: "PUCIT",
      department: "Computer Science",
      year: 2025,
      category: "Software Engineering",
      supervisor: "Prof. XYZ",
      githubLink: "https://github.com/updatedproject",
    };

    const res = await request(app)
      .put(`/api/projects/update/${projectId}`)
      .send({ updateData })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Project updated successfully");
    expect(res.body.projectData.title).toBe(updateData.title);
  });

  it("should fail if the project is not found for update", async () => {
    const invalidProjectId = "60d9bdfc6e16f31b8c14a7d2"; // Invalid projectId

    const updateData = {
      title: "Updated Project Title",
      description: "Updated description",
      campus: "PUCIT",
      department: "Computer Science",
      year: 2025,
      category: "Software Engineering",
      supervisor: "Prof. XYZ",
      githubLink: "https://github.com/updatedproject",
    };

    const res = await request(app)
      .put(`/api/projects/update/${invalidProjectId}`)
      .send({ updateData })
      .expect("Content-Type", /json/)
      .expect(404);

    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Project not found");
  });

  it("should delete the project", async () => {
    const res = await request(app)
      .delete(`/api/projects/delete/${projectId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Project deleted successfully");
  });

  it("should fail if the project is not found for deletion", async () => {
    const invalidProjectId = "60d9bdfc6e16f31b8c14a7d2"; // Invalid projectId

    const res = await request(app)
      .delete(`/api/projects/delete/${invalidProjectId}`)
      .expect("Content-Type", /json/)
      .expect(403);

    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("No project found for the user");
  });

  it("should get all projects", async () => {
    const res = await request(app)
      .get("/api/projects")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Project found successfully");
    expect(res.body.projects).toBeInstanceOf(Array);
  });

  it("should search projects", async () => {
    const res = await request(app)
      .get("/api/projects/search")
      .query({ query: "Test" })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Projects found successfully");
    expect(res.body.projects).toBeInstanceOf(Array);
  });

  it("should fail if search query is missing", async () => {
    const res = await request(app)
      .get("/api/projects/search")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Search query is required");
  });
});
