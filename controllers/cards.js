const cardSchema = require('../models/card');

const InBaseNotFound = require('../errors/InBaseNotFound');

module.exports.findCard = (req, res) => {
  cardSchema.find({})
    .then((card) => {
      if (!card.length) {
        throw new InBaseNotFound('Нет карточек в базе');
      }
      res.send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardSchema.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.prototype.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
      res.send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  cardSchema.findByIdAndRemove(cardId)
    .orFail(new InBaseNotFound('Нет такой карточки'))
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  cardSchema.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => Error('Нет такой карточки'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.prototype.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
      res.send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  cardSchema.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => Error('Нет такой карточки'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.prototype.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
      res.send({ message: err.message });
    });
};
