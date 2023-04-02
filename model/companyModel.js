const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,

    required: true,
  },
  address: {
    type: String,
  },
  followers: {
    type: Array,
    ref: "User",
  },

  email: {
    type: String,
    required: true,
    lowerCase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  industry: {
    type: String,
  },
  companySize: {
    type: String,
  },
  role: {
    type: String,
    default: "company",
  },
});

module.exports = mongoose.model("Company", companySchema);
