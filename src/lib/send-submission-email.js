// @flow
'use strict'

const AWS = require('aws-sdk')
const nodemailer = require('nodemailer')

const config = require('../config.js')
const { generatePDF } = require('./services/pdf-service.js')
const generateHtml = require('./templates/generate-html.js')

async function sendSubmissionEmail(
  recipientEmail /* : string */,
  payload /* : any */
) /* :Promise<void> */ {
  console.log('Generating email & PDF templates.')

  const template = await generateHtml(payload, 'email.mustache')

  // send submission payload to generatePdf function

  const pdf = await generatePDF(payload)

  console.log('Email & PDF templates generated.')

  // create Nodemailer SES transporter
  const transporter = nodemailer.createTransport({
    SES: new AWS.SES({ region: 'us-east-1' })
  })

  await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: {
          address: config.EMAIL_SENDER_ADDRESS,
          name: config.EMAIL_SENDER_NAME
        },
        to: recipientEmail,
        subject: 'YOUR_EMAIL_SUBJECT_LINE',
        html: template,
        attachments: [
          {
            filename: 'sample.pdf', // give your pdf a file name
            content: pdf, // attach the pdf itself
            contentType: 'application/pdf',
            encoding: 'binary'
          }
        ]
      },
      (err, info) => {
        if (err) {
          console.log(
            'Error attempting to send email with PDF submission data: ' + err
          )

          reject(err)
        } else {
          console.log(`PDF submission email sent to: ${recipientEmail}`)

          return resolve(info)
        }
      }
    )
  })
}

module.exports = {
  sendSubmissionEmail
}
