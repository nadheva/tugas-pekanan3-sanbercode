import supertest from 'supertest';

const API_URL = 'https://kasir-api.zelz.my.id';
let token = null;

export async function getAuthToken() {
  if (!token) {
    const response = await supertest(API_URL)
      .post('/authentications') // Endpoint login
      .send({ email: 'tokobuku@gmail.com', password: 'password123' });
    token = response.body.token;
  }
  return token;
}
