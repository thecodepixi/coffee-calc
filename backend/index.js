const express = require('express');
const path = require('path');

const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/brew-methods', require('./routes/api/methods'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
