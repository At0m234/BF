const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const ErrorS = require('../errors/ErrorS');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    new: true,
  },
  surname: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    new: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Почта не соответсвует требуемому формату',
    },
  },
  // хеш пароля
  // чтобы база данных не возвращала это поле.
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: true,
  },
  city: {
    type: String,
    required: true,
  },
  postal: {
    type: Number,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  documents: {
    type: [Schema.Types.Mixed],
    ref: 'userDocuments',
    required: true,
    selected: true,
    default: [],
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activateCode: {
    type: String,
  },
  userCards: {
    type: [Schema.Types.Mixed],
    ref: 'userCards',
    required: true,
    selected: true,
    default: [],
  },
  applications: {
    type: [Schema.Types.Mixed],
    ref: 'userApplications',
    required: true,
    selected: true,
    default: [],
  },
});

// добавим метод поиска пользователя findUserByCredentials к схеме пользователя
userSchema.statics.findUserByCredentials = function findUser(email, password) {
  // попытаемся найти пользовател по почте
  return this.findOne({ email }).select('+password') // this — это модель User
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        throw new ErrorS('Неверная почта или пароль', 401);
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorS('Неверная почта или пароль', 401);
          }
          return user;
        });
    });
};

// добавим метод создания пользоваля createUserByCredentials к схеме пользователя
userSchema.statics.createUserByCredentials = function createUser(
  name, surname, phone, email, password, city, postal, adress, activationCode, SALTROUNDS,
) {
  return this.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ErrorS('Пользователь с таким email уже зарегистрирован', 400);
      }
      // хешируем пароль
      return bcrypt.hash(password, SALTROUNDS)
        .then((hash) => {
          if (!hash) {
            throw new ErrorS('Ошибка хеширования', 400);
          }
          // создаем юзера в базе
          return this.create({
            name,
            surname,
            phone,
            email,
            password: hash,
            city,
            postal,
            adress,
            activateCode: activationCode,
          })
            .then((you) => {
              if (!you) {
                throw new ErrorS('Ошибка записи данных', 400);
              }
              // ищем юзера и возвращаем данные без password
              return this.findOne({ email });
            });
        });
    });
};

module.exports = mongoose.model('user', userSchema);
