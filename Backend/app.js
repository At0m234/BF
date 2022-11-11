require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
// импортируем мидлверы
const { auth } = require('./middlewares/auth');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// импортируем контроллеры логина и регистрации
const { login, createUser } = require('./controllers/users');
// импортируем роутеры пользователей
const usersRoutes = require('./routes/users');
const { activateUser, contactUsRequest, sendNewPassword } = require('./controllers/users');
const CentralizedErrorHandler = require('./middlewares/centralized-error-handler');
const { PORT = 3001 } = process.env;

const app = express();

// bodyParser для сбора JSON-формата
app.use(bodyParser.json());
// разрешаем прием веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/takeFast', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

// подключаем логгер запросов
app.use(requestLogger);

// подключаем лимитер запросов
app.use(limiter);

// подключаем роуты, не требующие авторизации
// роут регистрации создаёт пользователя
// с переданными в теле email, password и name
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    surname: Joi.string().required().min(2).max(30),
    phone: Joi.number().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(16),
    city: Joi.string().required().min(2),
    postal: Joi.number().required(),
    adress: Joi.string().required(),
  }),
}), createUser);

app.get('/activate', activateUser);

app.patch('/reset-password', sendNewPassword);

app.post('/kontakty', contactUsRequest);

// роут логина проверяет переданные в теле почту и пароль и возвращает JWT
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// подключаем роуты, требующие авторизации
app.use('/kabinet', auth, usersRoutes);

// подключаем логгер ошибок
app.use(errorLogger);
// обработчик ошибок celebrate
app.use(errors());
// здесь обрабатываем все ошибки
app.use(CentralizedErrorHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
