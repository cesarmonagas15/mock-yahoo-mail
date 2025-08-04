const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 4000;

const classifyRoute = require('./routes/classify');
const emailsRoute = require('./routes/emails');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/emails', emailsRoute);
app.use('/api/classify', classifyRoute);

app.get('/', (req, res) => {
  res.send('📬 Yahoo Mail Backend Running');
});

app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});
