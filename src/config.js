// @flow
'use strict'

const config = {
  // FaaS and API permissions
  ACCESS_KEY: process.env.ACCESS_KEY,
  SECRET_KEY: process.env.SECRET_KEY,

  // OneBlink PDF Service & Permissions
  PDF_SERVICE_URL:
    typeof process.env.PDF_SERVICE_URL === 'string'
      ? process.env.PDF_SERVICE_URL
      : '',

  PDF_ACCESS_KEY:
    typeof process.env.PDF_ACCESS_KEY === 'string'
      ? process.env.PDF_ACCESS_KEY
      : '',

  PDF_SECRET_KEY:
    typeof process.env.PDF_SECRET_KEY === 'string'
      ? process.env.PDF_SECRET_KEY
      : '',

  // API Authorisation
  CALLBACK_SECRET: process.env.CALLBACK_SECRET,

  // Form ID
  FORM_ID: parseInt(process.env.FORM_ID) || 0,

  // EMAIL
  EMAIL_SENDER_ADDRESS:
    typeof process.env.EMAIL_SENDER_ADDRESS === 'string'
      ? process.env.EMAIL_SENDER_ADDRESS
      : '',

  EMAIL_SENDER_NAME:
    typeof process.env.EMAIL_SENDER_NAME === 'string'
      ? process.env.EMAIL_SENDER_NAME
      : ''
}

module.exports = config
