const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./routes');

dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/', router);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(`Database no connected, error: ${error}`);
  });

app.get('/', (req, res) => {
  res.send('Server OK');
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
