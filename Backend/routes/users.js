const express = require('express');

const multer = require('multer')
const moment = require('moment');
const fs = require('fs');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo,
  patchUser,
  patchPassword,
  sendApplication,
  getApplicationInfo,
} = require('../controllers/users');

// возвращает информацию о пользователе
router.get('/lichnye-dannye', getUserInfo);

// обновляет информацию о пользователе
router.patch('/lichnye-dannye', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    surname: Joi.string().required().min(2).max(30),
    phone: Joi.number().required(),
    email: Joi.string().required().email(),
    city: Joi.string().required().min(2),
    postal: Joi.number().required(),
    adress: Joi.string().required(),
  }).unknown(true),
}), patchUser);

// обновляет пароль пользователя
router.patch('/smena-parolya', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
  }).unknown(true),
}), patchPassword);

// обновляет информацию о заявках на кредит
router.post('/zayavki', celebrate({
  body: Joi.object().keys({
    confirmSummValue: Joi.number().required(),
    confirmTimeValue: Joi.number().required(),
  }).unknown(true),
}), sendApplication);

// получаем информацию о заявках
router.get('/zayavki', getApplicationInfo);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!file || file === null) {
      return (cb(null, null));
    }

    const id = req.user._id;
    const path = `./verification/${id}/${moment(new Date()).format('D.M.YYYY')}`;

    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },
  filename: function (req, file, callback) {
    if (!file || file === null){
      return (cb(null,null));
    }
    callback(null, `${file.originalname}`)
  }
});

router.post('/verifikaciya', multer({ storage: storage }).array('files'), (req, res) => {
  res.send({success: true}).status(200);
});

module.exports = router;
