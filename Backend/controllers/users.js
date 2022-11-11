require('dotenv').config();
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const mailer = require('../nodemailer/nodemailer');
const ErrorS = require('../errors/ErrorS');

const contactUsRequest = (req, res) => {
  if (!req.body.email && !req.body.password && !req.body.message) {
    return res.sendStatus(400);
  }
  const message = {
    to: 'Введите Вашу Почту!',
    subject: 'Связаться с нами',
    html: `
    <h2>Имя: ${req.body.name}</h2>

    <h3>Электронная почта: ${req.body.email}</h3>

    <h3>Сообщение:</h3><p> ${req.body.message}<p>
    `,
  };

  mailer(message, res);
};

const sendMailToUser = (req, res, activationCode) => {
  if (!req.body.email && !req.body.password) {
    return res.sendStatus(400);
  }
  const message = {
    to: req.body.email,
    subject: 'Спасибо за регистрацию!',
    html: `
    <h2>Поздравляем, Вы успешно зарегистрировались на нашем сайте!</h2>

    <i>Данные Вашей учетной записи:</i>
    <ul>
      <li>Логин: ${req.body.email}</li>
      <li>Пароль: ${req.body.password}</li>
    </ul>

    <a href="http://localhost:3000/activate?CODE=${activationCode}">Для активации аккаунта кликните пожалуйста по этой ссылке!</a>
    `,
  };

  mailer(message, res);
};

// контроллер создает пользователя
const createUser = (req, res, next) => {
  const SALTROUNDS = 10;
  const {
    name, surname, phone, email, password, city, postal, adress,
  } = req.body;
  return bcrypt.hash(email, SALTROUNDS)
    .then((hash) => {
      if (!hash) {
        throw new ErrorS('Ошибка хэширования!', 400);
      }
      return User.createUserByCredentials(
        name, surname, phone, email, password, city, postal, adress, hash, SALTROUNDS,
      )
        // вернём записанные в базу данные
        .then((data) => {
          if (!data) {
            throw new ErrorS('Произошла ошибка, не удалось создать пользователя', 400);
          }
          res.status(200).send({ data });
          sendMailToUser(req, res, hash);
        })
        // данные не записались, вернём ошибку
        .catch(next);
    })
    .catch(next);
};

const activateUser = (req, res, next) => {
  User.updateOne({ activateCode: req.query['CODE'] }, { $set: { isActivated: true } })
    .then((data) => {
      if (!data) {
        throw new ErrorS('Произошла ошибка, не удалось найти пользователей', 400);
      }
      if (data.nModified !== 0) {
        res.send({ success: true }).status(200);
      } else {
        res.send({ success: false }).status(200);
      }
    })
    .catch(next);
};

// контроллер обновляет информацию о пользователе
const patchUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      email: req.body.email,
      city: req.body.city,
      postal: req.body.postal,
      adress: req.body.adress,
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((data) => {
      if (!data) {
        throw new ErrorS('Произошла ошибка, не удалось найти пользователей', 400);
      }
      if ((req.body.name === data.name)
      || (req.body.surname === data.surname)
      || (req.body.phone === data.phone)
      || (req.body.email === data.email)
      || (req.body.city === data.city)
      || (req.body.postal === data.postal)
      || (req.body.adress === data.adress)) {
        res.status(200).send({
          name: req.body.name,
          surname: req.body.surname,
          phone: req.body.phone,
          email: req.body.email,
          city: req.body.city,
          postal: req.body.postal,
          adress: req.body.adress,
        });
        return null;
      } else {
        throw new ErrorS('Вы не изменили информацию о пользователе', 400);
      }
    })
    .catch(next);
};

// контроллер возвращает информацию о пользователе
const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (!data) {
        throw new ErrorS('Неверный id пользователя', 400);
      } else {
        res.status(200).send({ data });
      }
    })
    .catch(next);
};

// контроллер входа в систему и передачи JWT токена в LocalStorage браузера
const login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new ErrorS('Неверная почта или пароль', 401);
      }
      if (user.isActivated === false) {
        throw new ErrorS('Аккаунт не активирован', 400);
      }
      // аутентификация успешна! пользователь в переменной user
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '1h' },
      );
      // вернём токен
      res.send({ token });
    })
    // возвращаем ошибку аутентификации
    .catch(next)
};

const patchPassword = (req, res, next) => {
  const SALTROUNDS = 10;
  User.findById(req.user._id)
    .then((data) => {
      bcrypt.compare(req.body.password, data.password)
      .then((match)=>{
        if (match) {
          bcrypt.hash(req.body.newPassword, SALTROUNDS)
            .then((hash) => {
              if (hash) {
                User.findByIdAndUpdate(req.user._id, { password: hash }, { new: true })
                  .then((result) => {
                    if (result) {
                      res.send({ success: true }).status(200);
                    }
                  })
                  .catch(next);
              }
            })
            .catch(next);
        } else {
          throw new ErrorS ('Неверный старый пароль', 400);
        }
      })
      .catch(next)
    })
    .catch(next);
};

const day = (term) => {
  const days = new Date();
  days.setDate(days.getDate() + term);
  return (days);
};

const month = (term) => {
  const months = new Date();
  months.setMonth(months.getMonth() + term);
  return (months);
};

// const year = (term) => {
//   const years = new Date();
//   years.setFullYear(years.getFullYear() + term);
//   return (years);
// };

const checkUserCards = (req, data) => {
  const newUserCard = {
    userCard: req.body.userCard.userCardNumber,
    validYear: req.body.userCard.validYear,
    validMonth: req.body.userCard.validMonth,
  }

  if (data.userCards.length !== 0) {
    let isNew = true;
    isNew = data.userCards.some((v) => {
      if (req.body.userCard.userCardNumber === v.userCard) {
        return false;
      }
    });
    return (isNew ? [...data.userCards, newUserCard] : data.userCards);
  } else {
    return [newUserCard];
  }
};

const addApplication = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (data) {
        const loanTerm = req.body.confirmTimeValue < 29
          ? day(req.body.confirmTimeValue)
          : month((req.body.confirmTimeValue - 29));
        const termDate = moment(loanTerm).format('D.M.YYYY');
        const dateNow = moment(new Date()).format('D.M.YYYY');

        const newApplication = {
          number: data.applications.length + 1,
          date: dateNow,
          amount: req.body.confirmSummValue.toFixed(2),
          term: termDate,
          refund: (req.body.confirmSummValue * 1.1).toFixed(2),
          status: 'Требуется верификация',
        };
        User.findByIdAndUpdate(
          req.user._id,
          {
            $set:
            {
              applications: [...data.applications, newApplication],
              userCards: checkUserCards(req, data),
            },
          },
          {
            new: true,
          },
        )
          .then((result) => {
            res.send(result.applications);
          })
          .catch(next);
      }
    })
    .catch(next);
};

const sendApplication = (req, res, next) => {
  User.findById(req.user._id)
    .then(() => {
      addApplication(req, res, next);
    })
    .catch(next);
};

const getApplicationInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      res.send(data.applications);
    })
    .catch(next);
};

const generateNewPassword = () => {
  let a = '';
  let b = 'abcdefghijklmnopqrstuvwxyz1234567890';
  for (let c = 0; c < 8; c += 1) {
    a += b[Math.floor(Math.random() * b.length)];
  }
  return a;
};

const sendNewPassword = (req, res, next) => {
  const SALTROUNDS = 10;

  User.findOne( req.body )
    .then((user) => {
      if (!user) {
        throw new ErrorS('Пользователь с таким email не зарегистрирован', 400);
      }

      const newPassword = generateNewPassword();
      const message = {
        to: `${req.body.email}`,
        subject: 'Запрос на восстановление пароля',
        html: `
          <h2>Пользователь: ${user.name} ${user.surname}</h2>

          <h3>Электронная почта: ${req.body.email}</h3>

          <h3>Новый пароль: ${newPassword}</h3>
        `,
      };

      bcrypt.hash(newPassword, SALTROUNDS)
        .then((hash) => {
          User.findOneAndUpdate(req.body, {password: hash})
            .then((data) => {
              if (!data){
                throw new ErrorS('Ошибка хеширования нового пароля',400)
              }
              mailer(message);
              res.send({success: true}).status(200);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  patchUser,
  getUserInfo,
  createUser,
  login,
  patchPassword,
  sendApplication,
  getApplicationInfo,
  activateUser,
  contactUsRequest,
  sendNewPassword,
};
