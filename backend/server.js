const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

//connect mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
mongoose.set('useFindAndModify', false);

connection.once('open', () => {
  console.log('MongoDB connection established');
});

const brewMethodRouter = require('./routes/api/methods');
const userRouter = require('./routes/api/users');

app.use('/api/brew-methods', brewMethodRouter);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
