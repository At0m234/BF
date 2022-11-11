const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'v.o.ilin@mail.ru',
      pass: 'Morrowind9995505035',
    },
  },
  {
    from: 'Mailer Test <v.o.ilin@mail.ru>',
  },
);

const mailer = (message, res) => {
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    }
    res.send(info);
  });
};

module.exports = mailer;
