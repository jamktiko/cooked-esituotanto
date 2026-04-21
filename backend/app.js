const express = require('express');
const cors = require('cors');
const app = express();
// Elastic Beanstalk käyttää oletuksena porttia 8080
app.use(cors());

const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
  res.send('Cooked Backend - Hello World toimii!');
});
app.listen(port, () => {
  console.log(`Palvelin pyörii portissa ${port}`);
});
