const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routCard = require('./routes/routCard.js');

const routUser = require('./routes/routUser.js');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3200 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5f6e525f7e219e4d5ce5ae11', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/cards', routCard);
app.use('/users', routUser);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
