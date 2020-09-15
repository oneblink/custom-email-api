// @flow
'use strict'
const fs = require('fs')
const path = require('path')
const Mustache = require('mustache')
const juice = require('juice')

async function generateHtml(
  params /* : mixed */,
  templateName /* : string */
) /* : Promise<string> */ {
  const html = await new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, templateName), 'UTF-8', (error, html) => {
      if (error) {
        reject(error)
      } else {
        resolve(html)
      }
    })
  })

  const renderedHtml = await Mustache.render(html, params)

  return juice(renderedHtml)
}

module.exports = generateHtml
