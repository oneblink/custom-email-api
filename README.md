# Custom Email API Hosting Template

This 'template' project serves as a bare-bones API hosting project, that can be deployed standalone after some basic configuration is taken care of.

Before you get started, you will need an API hosting instance created within the console, as well as both Forms keys and PDF keys.

The below steps assume familiarity with our API hosting offering, as well as knowledge of our forms, keys and submission events.

## Getting started

Replace the following `variables` values within the `blinkmrc.json` file:

```json
 "variables": {
      "EMAIL_SENDER_ADDRESS": "YOUR_SENDING_ADDRESS", // The email address you'll be sending emails from
      "EMAIL_SENDER_NAME": "OneBlink Sample PDF Submission Event", // The 'name' of the sender that will appear on sent emails
      "PDF_SERVICE_URL": "https://pdf.blinkm.io",
      "CALLBACK_SECRET": "YOUR_CALLBACK_SUBMISSION_EVENT_SECRET", // The callback 'secret' configured on your API hosting submission event
      "ACCESS_KEY": "FORMS_ACCESS_KEY", // your forms as a service access key
      "SECRET_KEY": "FORMS_SECRET_KEY", // your forms as a service secret key
      "FORM_ID": "YOUR_FORM_ID", // the ID of the form that will be triggering the submission event
      "PDF_ACCESS_KEY": "PDF_ACCESS_KEY", // your PDF access key
      "PDF_SECRET_KEY": "PDF_SECRET_KEY" // your PDF secret key
    }
```

Next, you'll need to configure your project scope as per normally configured for API hosting projects:

```json
 "project": "YOUR_PROJECT_SCOPE",
```

The recipient address is hardcoded within the `submission-callback.js` route:

```javascript
const recipientEmail = 'RECIPIENT_EMAIL_ADDRESS'
```

You can hardcode this, or source it from somewhere else. One place you may wish to do so from is the submission data, which will accessible already within the `submission-callback.js` route.

Once the above configuration is taken care of, deploy the project as per normal. You can then configure a API Hosting submission event on the form you wish to have custom emails sent from.
