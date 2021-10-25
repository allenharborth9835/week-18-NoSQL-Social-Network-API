const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//imports routes
app.use(require('./routes'));

//sets up mongoose connection
mongoose.connect('mongodb://localhost/pizza-hunt',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true)

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
