// auth.js
const request = require('supertest');
const readline = require('readline');

// Membuat interface untuk inputan manual
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const baseUrl = 'https://kasir-api.zelz.my.id';

// Fungsi untuk mendapatkan token autentikasi
function getAuthToken() {
  return new Promise((resolve, reject) => {
    // Meminta input dari pengguna
    rl.question('Masukkan email: ', (email) => {
      rl.question('Masukkan password: ', (password) => {
        request(baseUrl)
          .post('/authentications') 
          .send({ email, password })
          .then(response => {
            rl.close();
            resolve(response.body.token); 
          })
          .catch(error => {
            rl.close();
            reject(error);
          });
      });
    });
  });
}

module.exports = { getAuthToken };
