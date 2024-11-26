const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:')
const path = require('path');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY, latitude DECIMAL, longitude DECIMAL)');
  db.run('INSERT INTO locations (latitude, longitude) VALUES (?, ?)', [60, 60]);
  db.run('INSERT INTO locations (latitude, longitude) VALUES (?, ?)', [55, 60]);
  db.run('INSERT INTO locations (latitude, longitude) VALUES (?, ?)', [50, 60]);
});

app.use(express.static(path.join(__dirname, "public")));

app.get('/api/locations', (req, res) => {
  db.all('SELECT * FROM locations', (err, rows) => {
    if (err) {
        console.log("Error: ", err);
    }
    console.log(rows);
    res.send(rows);
  });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})