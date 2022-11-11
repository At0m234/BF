const mongoose = require('mongoose');

const userApplicationsSchema = new mongoose.Schema({
  applications: [
    {
      number: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      term: {
        type: Date,
        default: Date.now,
        required: true,
      },
      refund: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('userApplications', userApplicationsSchema);
