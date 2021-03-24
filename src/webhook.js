"use strict";

const Boom = require("@hapi/boom");
const OneBlink = require("@oneblink/sdk");

const { generatePdfHtml, generateEmailHtml } = require("./templates");

//
// Set these values before running the webhook
//
const RECIPIENT_EMAIL_ADDRESS = "RECIPIENT_EMAIL_ADDRESS";
const SENDER_EMAIL_ADDRESS = "SENDER_EMAIL_ADDRESS";
const SENDER_NAME = "SENDER_NAME";
const YOUR_EMAIL_SUBJECT_LINE = "YOUR_EMAIL_SUBJECT_LINE";
//
//
//

const formsSDK = new OneBlink.Forms({
  accessKey: process.env.FORMS_ACCESS_KEY,
  secretKey: process.env.FORMS_SECRET_KEY,
});

const pdfSDK = new OneBlink.PDF({
  accessKey: process.env.PDF_ACCESS_KEY,
  secretKey: process.env.PDF_SECRET_KEY,
});

module.exports.post = async function webhook(req, res) {
  console.log("Validating webhook request payload");
  if (
    !req.body ||
    !req.body.formId ||
    !req.body.submissionId ||
    !req.body.secret
  ) {
    throw Boom.badRequest("Invalid webhook request payload", req.body);
  }

  console.log("Authorizing webhook request");
  if (req.body.secret !== process.env.WEB_HOOK_SECRET) {
    throw Boom.forbidden("Unauthorised", req.body);
  }

  console.log("Retrieving form data for submission", {
    formId: req.body.formId,
    submissionId: req.body.submissionId,
    isDraft: req.body.isDraft,
  });
  const { submission } = await formsSDK.getSubmissionData(
    req.body.formId,
    req.body.submissionId,
    req.body.isDraft
  );

  console.log("Generating HTML template for custom PDF");
  const pdfHtml = await generatePdfHtml(submission);

  console.log("Generating custom PDF");
  const pdf = await pdfSDK.generatePDF({
    body: {
      html: pdfHtml,
    },
  });

  console.log("Generate HTML template for email");
  const emailHtml = await generateEmailHtml();

  console.log("Sending email");
  await OneBlink.sendEmail({
    subject: YOUR_EMAIL_SUBJECT_LINE,
    html: emailHtml,
    from: {
      address: SENDER_EMAIL_ADDRESS,
      name: SENDER_NAME,
    },
    to: RECIPIENT_EMAIL_ADDRESS,
    attachments: [
      {
        filename: "sample.pdf",
        content: pdf,
        contentType: "application/pdf",
        encoding: "binary",
      },
    ],
  });

  console.log("Webhook completed successfully");
};
