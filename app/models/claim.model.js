const mongoose = require('mongoose')

const { Schema } = mongoose

const ClaimSchema = new Schema(
  {
    recoveryMail: {
      type: String
    },
    accessMail: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Claim = mongoose.model('Claim', ClaimSchema)

module.exports = { Claim }