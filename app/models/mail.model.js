const mongoose = require('mongoose')

const { Schema } = mongoose

const MailSchema = new Schema(
  {
    from: {
      type: String
    },
    to: {
      type: String
    },
    subject: {
      type: String
    },
    text: {
      type: String
    },
    date: {
      type: Date
    },
    guard: {
      type: String
    },
    verificationLink: {
      type: String
    },
    viewed: {
      type: Boolean,
      default: false
    },
    textAsHtml: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Mail = mongoose.model('Mail', MailSchema)

module.exports = { Mail }
