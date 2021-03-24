// @flow
'use strict'

const OneBlink = require('@oneblink/sdk')

const config = require('../../config.js')
const generateHtml = require('../templates/generate-html.js')

async function generatePDF(submissionData /* : any */) {
  const ACCESS_KEY /* : string */ = config.PDF_ACCESS_KEY
  const SECRET_KEY /* : string */ = config.PDF_SECRET_KEY

  const params = Object.assign({}, submissionData)

  const html = await generateHtml(params, 'pdf.mustache')

  try {
    const options = {
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY
    }
    const pdf = new OneBlink.PDF(options)
    const buffer = await pdf.generatePDF({
      body: {
        html
      }
    })
    return buffer
  } catch (error) {
    throw new Error(
      `An error has occurred while attempting to generate the PDF: ${error}`
    )
  }
}

module.exports = { generatePDF }
