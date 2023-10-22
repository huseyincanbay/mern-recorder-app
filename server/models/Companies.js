const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Company name is required"],
  },
  legalNumber: {
    type: String,
    required: [true, "Legal number is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  website: {
    type: String,
    required: [true, "Website is required"],
  },
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Company', companySchema);
