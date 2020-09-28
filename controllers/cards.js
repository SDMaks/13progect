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
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardSchema.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Не правильно введены данные' }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  let errorCode = 500;
  cardSchema.findByIdAndRemove(cardId)
    .orFail(() => {
      errorCode = 404;
      throw new InBaseNotFound('Такой карточки в базе нет');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(errorCode).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  let errorCode = 500;
  cardSchema.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      errorCode = 404;
      throw new InBaseNotFound('Такой карточки в базе нет');
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(errorCode).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  let errorCode = 500;
  cardSchema.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      errorCode = 404;
      throw new InBaseNotFound('Такой карточки в базе нет');
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(errorCode).send({ message: err.message }));
};
