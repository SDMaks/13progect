const userSchema = require('../models/user');

const InBaseNotFound = require('../errors/InBaseNotFound');

module.exports.findUser = (req, res) => {
  userSchema.find({})
    .then((user) => {
      if (!user.length) {
        throw new InBaseNotFound('Нет пользователей в базе');
      }
      res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.findUserId = (req, res) => {
  userSchema.findById(req.params.userId)
    .orFail(() => Error('Нет такого пользователя в базе'))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  userSchema.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Не правильно введены данные' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;
  userSchema.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true })
    .orFail(() => Error('Нет такого пользователя в базе'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.prototype.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
      res.send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  userSchema.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .orFail(() => Error('Нет такого пользователя в базе'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.prototype.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
      res.send({ message: err.message });
    });
};
