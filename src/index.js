const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server OK');
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
