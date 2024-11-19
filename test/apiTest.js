// apiTest.js
const request = require('supertest');
const { expect } = require('chai');
const { getAuthToken } = require('./auth');
const readline = require('readline');

// Membuat interface untuk inputan manual
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Meminta input dari pengguna untuk endpoint
rl.question('Masukkan endpoint unit (contoh: /resource): ', (endpoint) => {
  const baseUrl = 'https://kasir-api.zelz.my.id';

  describe('API Kontrak Kasir AJA Tests', function() {
    let token;

    // Dapatkan token autentikasi sebelum semua pengujian dijalankan
    before(async function() {
      token = await getAuthToken();
    });

    it('should create a new resource', async function() {
      const response = await request(baseUrl)
        .post(`${endpoint}`) // Gunakan endpoint yang dimasukkan
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Sample Item', price: 1000 }); // Ganti dengan data yang sesuai

      expect(response.status).to.equal(201); // Assertion 1: Status code harus 201
      expect(response.body).to.have.property('id'); // Assertion 2: Respons harus memiliki ID
    });

    it('should read a resource', async function() {
      const response = await request(baseUrl)
        .get(`${endpoint}/1`) // Gunakan endpoint yang dimasukkan dan ID yang sesuai
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).to.equal(200); // Assertion 1: Status code harus 200
      expect(response.body).to.have.property('name'); // Assertion 2: Respons harus memiliki properti 'name'
    });

    it('should update a resource', async function() {
      const response = await request(baseUrl)
        .put(`${endpoint}/1`) // Gunakan endpoint yang dimasukkan dan ID yang sesuai
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Item', price: 1500 }); // Ganti dengan data yang diperbarui

      expect(response.status).to.equal(200); // Assertion 1: Status code harus 200
      expect(response.body.name).to.equal('Updated Item'); // Assertion 2: Data harus diperbarui
    });

    it('should delete a resource', async function() {
      const response = await request(baseUrl)
        .delete(`${endpoint}/1`) // Gunakan endpoint yang dimasukkan dan ID yang sesuai
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).to.equal(204); // Assertion 1: Status code harus 204
      expect(response.body).to.be.empty; // Assertion 2: Respons body harus kosong
    });

    // Tutup interface readline setelah semua pengujian selesai
    after(() => {
      rl.close();
    });
  });
});
