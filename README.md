# Custom Email API Hosting Template

This 'template' project serves as a bare-bones API hosting project, that can be deployed using the [OneBlink CLI](https://www.npmjs.com/package/@oneblink/cli) standalone after some basic configuration is taken care of.

Before you get started, you will need an API hosting instance created within the console, as well as both Forms keys and PDF keys.

The below steps assume familiarity with our API hosting offering, as well as knowledge of our forms, keys and submission events.

## Getting Started

Replace the following `variables` values within the `blinkmrc.json` file and you'll need to configure your `project` as per normally configured for API hosting projects::

```json
{
  "project": "YOUR_PROJECT_SCOPE",
  "variables": {
    "WEB_HOOK_SECRET": "WEB_HOOK_SECRET", // The callback 'secret' configured on your API hosting submission event
    "FORMS_ACCESS_KEY": "FORMS_ACCESS_KEY", // your forms as a service access key
    "FORMS_SECRET_KEY": "FORMS_SECRET_KEY", // your forms as a service secret key
    "PDF_ACCESS_KEY": "PDF_ACCESS_KEY", // your PDF access key
    "PDF_SECRET_KEY": "PDF_SECRET_KEY" // your PDF secret key
  }
}
```

The recipient address is hardcoded within the `./src/webhook.js` file. You can hard code this, or source it from somewhere else. One place you may wish to do so from is the submission data, which is available already within the `./src/webhook.js`.

Once the above configuration is taken care of, deploy the project as per normal. You can then configure a API Hosting submission event on the form you wish to have custom emails sent from.

## Customizing Templates

There are two mustache templates included - one for the email itself, and another for the PDF.

- `./src/templates/email.mustache`
- `./src/templates/pdf.mustache`

Familiarity with mustache is recommended before editing these. Currently, the entire submission object is passed to both templates, so you will be able to work with any values from your submission that are needed. You can change this code in any way to suit your needs.
