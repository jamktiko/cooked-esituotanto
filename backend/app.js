const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((err) => console.error('Database error ->', err));

const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
  res.send('Cooked Backend - Hello World toimii!');
});
app.listen(port, () => {
  console.log(`Palvelin pyörii portissa ${port}`);
});
