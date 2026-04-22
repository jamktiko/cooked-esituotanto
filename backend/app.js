require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Test = require('./models/test');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });

app.get('/tervehdys', async (req, res) => {
  try {
    const tervehdykset = await Test.find();
    res.json(tervehdykset);
  } catch (err) {
    res.status(500).json({ viesti: err.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Palvelin pyörii portissa ${port}`);
});
