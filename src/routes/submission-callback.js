// @flow
'use strict'

const Boom = require('@hapi/boom')
const OneBlink = require('@oneblink/sdk')

const config = require('../config.js')

const { authoriseSecret } = require('../lib/auth.js')
const { sendSubmissionEmail } = require('../lib/send-submission-email.js')

const sdk = new OneBlink.Forms({
  accessKey: config.ACCESS_KEY,
  secretKey: config.SECRET_KEY
})

module.exports.post = async function feedbackCallback(
  req /* : BmRequest */,
  res /* : BmResponse */
) /* : Promise<BmResponse> */ {
  const body = req.body
  if (!body) {
    throw Boom.badRequest('Body is missing.')
  }

  const secret = body.secret

  authoriseSecret(secret)

  const submissionId = body.submissionId

  if (!submissionId) {
    throw Boom.badRequest('Submission ID is missing.')
  }

  try {
    const submissionData = await sdk.getSubmissionData(
      config.FORM_ID,
      submissionId
    )

    // can hardcode, or source from the submission data above

    const recipientEmail = 'RECIPIENT_EMAIL_ADDRESS'

    await sendSubmissionEmail(recipientEmail, submissionData.submission)

    return res.setStatusCode(200)
  } catch (error) {
    throw new Error(
      `An error has occurred while processing submission: ${error}`
    )
  }
}
