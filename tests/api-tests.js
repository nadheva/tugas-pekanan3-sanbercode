import { expect } from 'chai';
import supertest from 'supertest';
import { getAuthToken } from './auth.js';

const API_URL = 'https://kasir-api.zelz.my.id'; 
const request = supertest(API_URL);

describe('Kasir AJA API Automation Tests', () => {
  let token;

  before(async function () {
    console.log('Starting before hook');
    this.timeout(5000); // Tingkatkan timeout jika perlu
    try {
      token = await getAuthToken();
      console.log('Token received:', token);
    } catch (err) {
      console.error('Error in before hook:', err);
      throw err;
    }
  });

  it('CREATE: Data User', async () => {
    const response = await request
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'kasir-serbaguna',
        email: 'dave10@example.co.id',
        password: 'jiasda2321@'
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('userId');
  });

  it('READ: Data User', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('UPDATE: Data User', async () => {
    const newUserResponse = await request
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
          name: 'kasir-serbaguna',
          email: 'dave10@example.co.id'
      });

    const userId = newUserResponse.body.userId;

    const response = await request
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'update-user',
        email: 'user@example.com'
      });

    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal('Updated Users');
  });

  it('DELETE: Data User', async () => {
    const newUserResponse = await request
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'update-user',
        email: 'user@example.com'
      });

    const userId = newUserResponse.body.userId;

    const response = await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('User deleted successfully');
  });
});
