"use strict";

const fs = require("fs");
const util = require("util");
const path = require("path");

const Mustache = require("mustache");
const juice = require("juice");

const readFileAsync = util.promisify(fs.readFile);

async function generateHtml(params, templateName) {
  const html = await readFileAsync(path.join(__dirname, templateName), "UTF-8");

  const renderedHtml = await Mustache.render(html, params);

  return juice(renderedHtml);
}

module.exports = {
  generatePdfHtml: (params) => generateHtml(params, "pdf.mustache"),
  generateEmailHtml: (params) => generateHtml(params, "email.mustache"),
};
