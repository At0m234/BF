const mongoose = require('mongoose');

const userCardsSchema = new mongoose.Schema({
  userCards: [
    {
      userCard: {
        type: Number,
        required: true,
      },
      validYear: {
        type: Number,
        required: true,
      },
      validMonth: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('userCards', userCardsSchema);
