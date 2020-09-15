// @flow
'use strict'

const axios = require('axios')

const config = require('../../config.js')
const generateJWT = require('../generate-jwt.js')
const generateHtml = require('../templates/generate-html.js')

async function generatePDF(submissionData /* : any */) {
  const URL /* : string */ = config.PDF_SERVICE_URL
  const ACCESS_KEY /* : string */ = config.PDF_ACCESS_KEY
  const SECRET_KEY /* : string */ = config.PDF_SECRET_KEY

  const authorisationToken = await generateJWT(ACCESS_KEY, SECRET_KEY, 300)

  const params = Object.assign({}, submissionData)

  const html = await generateHtml(params, 'pdf.mustache')

  const instance = axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Bearer ${authorisationToken}`
    },
    responseType: 'arraybuffer',
    maxContentLength: 82428890
  })

  try {
    const response = await instance.post('/pdf-document', {
      body: { html: html }
    })
    return response.data
  } catch (error) {
    throw new Error(
      `An error has occurred while attempting to generate the PDF: ${error}`
    )
  }
}

module.exports = { generatePDF }
