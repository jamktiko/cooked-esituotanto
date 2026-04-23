require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const Test = require('./models/test');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//AWS S3 Konfiguraatio
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// MONGOOSE YHTEYS
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch((err) => console.error('❌ Database error:', err));

// REITIT

app.get('/api/get-upload-url', async (req, res) => {
  try {
    const fileName = `${Date.now()}-${req.query.name}`;
    const fileType = req.query.type;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `test-uploads/${fileName}`,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

    res.json({
      uploadUrl: signedUrl,
      key: `test-uploads/${fileName}`,
      imageUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/test-uploads/${fileName}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/save-test', async (req, res) => {
  try {
    const uusiTesti = new Test({
      tervehdys: req.body.tervehdys,
      imageUrl: req.body.key,
    });

    const tallennettu = await uusiTesti.save();
    res.status(201).json(tallennettu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Haku-reitti
app.get('/api/tervehdys', async (req, res) => {
  try {
    const tervehdykset = await Test.find();
    res.json(tervehdykset);
  } catch (err) {
    res.status(500).json({ viesti: err.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Palvelin käynnissä portissa ${port}`));
