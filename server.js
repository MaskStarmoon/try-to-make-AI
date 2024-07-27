const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Menetapkan lokasi file userdata.json
const userDataFile = './userdata.json';

// Middleware untuk membaca JSON dari body request
app.use(bodyParser.json());

// Endpoint untuk menulis data ke file
app.post('/write', (req, res) => {
    const data = req.body;

    // Membaca file userdata.json
    fs.readFile(userDataFile, 'utf8', (err, fileData) => {
        let users = [];

        if (err) {
            // Jika file tidak ditemukan, buat file baru dengan array kosong
            if (err.code === 'ENOENT') {
                console.log('File userdata.json tidak ditemukan. Membuat file baru...');
                users.push(data);
                fs.writeFile(userDataFile, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        return res.status(500).send('Gagal membuat file userdata.json');
                    }
                    res.send('Data berhasil disimpan');
                });
            } else {
                res.status(500).send('Gagal membaca file userdata.json');
            }
        } else {
            // Jika file sudah ada, tambahkan data baru ke dalam array dan tulis kembali ke file
            try {
                users = JSON.parse(fileData);
                users.push(data);
                fs.writeFile(userDataFile, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        return res.status(500).send('Gagal menulis ke file userdata.json');
                    }
                    res.send('Data berhasil disimpan');
                });
            } catch (error) {
                res.status(500).send('Format file userdata.json tidak valid');
            }
        }
    });
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});