import request from 'supertest';
import app from '../index'; 
import { User, Category, Project } from '../models/index'; 

// Mock User data
const adminUser = {
  email: 'admin@example.com',
  password: 'adminpassword',
  name: 'Admin User',
  role: 'admin'
};

let adminToken = ''; // Store token here for authentication

beforeAll(async () => {
  // Create an admin user before running the tests
  const response = await request(app)
    .post('/api/auth/register') // Replace with your actual route for user registration
    .send(adminUser);
  
  const loginResponse = await request(app)
    .post('/api/auth/login') // Replace with your login route
    .send({ email: 'admin@example.com', password: 'adminpassword' });

  adminToken = loginResponse.body.token; // Store the JWT token for authenticated requests
});

describe('User APIs', () => {
  test('should create a new user (admin only)', async () => {
    const newUser = {
      email: 'user@example.com',
      password: 'password123',
      name: 'New User',
      role: 'user',
    };
    
    const response = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newUser);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User created successfully');
    expect(response.body.user).toHaveProperty('_id');
  });

  test('should not create a user without admin privileges', async () => {
    const newUser = {
      email: 'user@example.com',
      password: 'password123',
      name: 'New User',
      role: 'user',
    };

    const userToken = ''; // A regular user token would be here (use a different mock user)

    const response = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${userToken}`)
      .send(newUser);
    
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Unauthorized: Admin Access Required');
  });

  // Add tests for other user-related APIs (update, delete, etc.)
});

describe('Category APIs', () => {
  test('should create a category (admin only)', async () => {
    const category = {
      name: 'Science',
    };

    const response = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(category);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Category created successfully');
    expect(response.body.category).toHaveProperty('_id');
  });

  test('should get all categories (admin only)', async () => {
    const response = await request(app)
      .get('/api/categories')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.categories)).toBe(true);
  });

  // Add tests for other category-related APIs (update, delete, etc.)
});

describe('Project APIs', () => {
  test('should create a new project (admin only)', async () => {
    const projectData = {
      title: 'AI Chatbot',
      description: 'A project for building an AI chatbot',
      campus: 'Main Campus',
      department: 'Computer Science',
      year: 2025,
      category: 'AI',
      supervisor: 'Prof. John Doe',
      githubLink: 'https://github.com/project',
      thumbnail: 'https://someurl.com/thumbnail.png',
    };

    const response = await request(app)
      .post('/api/projects/initial')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(projectData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Project uploaded successfully');
    expect(response.body.projectData).toHaveProperty('_id');
  });

  test('should get a single project', async () => {
    // Replace with a valid project ID
    const projectId = '60b2f0f67d4e4d3ab7a4b1b3'; 

    const response = await request(app)
      .get(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.projectData).toHaveProperty('_id');
  });

  test('should update a project', async () => {
    // Replace with a valid project ID
    const projectId = '60b2f0f67d4e4d3ab7a4b1b3'; 

    const updateData = {
      title: 'Updated AI Chatbot',
      description: 'Updated description of the AI chatbot',
    };

    const response = await request(app)
      .put(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ updateData });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Project updated successfully');
    expect(response.body.projectData.title).toBe(updateData.title);
  });

  test('should delete a project', async () => {
    // Replace with a valid project ID
    const projectId = '60b2f0f67d4e4d3ab7a4b1b3'; 

    const response = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Project deleted successfully');
  });

});

