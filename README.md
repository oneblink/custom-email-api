# Custom Email API Hosting Template

This 'template' project serves as a bare-bones API hosting project, that can be deployed using the [OneBlink CLI](https://www.npmjs.com/package/@oneblink/cli) standalone after some basic configuration is taken care of.

Before you get started, you will need an API hosting instance created within the console, as well as both Forms keys and PDF keys.

The below steps assume familiarity with our API hosting offering, as well as knowledge of our forms, keys and submission events.

## Getting Started

1. Set the following values for each of the properties in `variables` in the `blinkmrc.json` file and [set the `project` property](https://github.com/oneblink/cli/blob/master/docs/api/overview.md#setting-scope):

   ```js
   {
     "project": "YOUR_PROJECT_SCOPE",
     "variables": {
       "RECIPIENT_EMAIL_ADDRESS": "RECIPIENT_EMAIL_ADDRESS", // The email address to send the email to
       "SENDER_EMAIL_ADDRESS": "SENDER_EMAIL_ADDRESS", // The email address to send the email from
       "SENDER_NAME": "SENDER_NAME", // The name to send the email from
       "WEB_HOOK_SECRET": "WEB_HOOK_SECRET", // The web hook 'secret' configured on your API hosting submission event
       "FORMS_ACCESS_KEY": "FORMS_ACCESS_KEY", // your forms as a service access key
       "FORMS_SECRET_KEY": "FORMS_SECRET_KEY", // your forms as a service secret key
       "PDF_ACCESS_KEY": "PDF_ACCESS_KEY", // your PDF access key
       "PDF_SECRET_KEY": "PDF_SECRET_KEY" // your PDF secret key
     }
   }
   ```

1. Deploy the project using the [OneBlink CLI](https://www.npmjs.com/package/@oneblink/cli). You can then configure a API Hosting submission event on the form you wish to have custom emails sent from.

## Customizing Recipient

The recipient address is current set in within the `.blinkmrc.json` file as an environment variable. You change this to come from the submission data, which is available already within the `./src/webhook.js`.

## Customizing Templates

There are two mustache templates included - one for the email itself, and another for the PDF.

- `./src/templates/email.mustache`
- `./src/templates/pdf.mustache`

Familiarity with mustache is recommended before editing these. Currently, the entire submission object is passed to both templates, so you will be able to work with any values from your submission that are needed. You can change this code in any way to suit your needs.
