const mongoose = require('mongoose');

const userDocumentsSchema = new mongoose.Schema({
  documents: [
    {
      NationalIdentityCardOne: {
        type: Object,
      },
      NationalIdentityCardTwo: {
        type: Object,
      },
      Passport: {
        type: Object,
      },
      DriverLicenseOne: {
        type: Object,
      },
      DriverLicenseTwo: {
        type: Object,
      },
    },
  ],
});

module.exports = mongoose.model('userDocuments', userDocumentsSchema);
