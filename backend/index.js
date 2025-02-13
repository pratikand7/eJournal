const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const dashboardRouter = require('./routes/dashboard');
const journalRouter = require('./routes/journals');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(loginRouter);
app.use(registerRouter);
app.use(dashboardRouter);
app.use(journalRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
