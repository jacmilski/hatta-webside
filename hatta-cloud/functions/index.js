const functions = require("firebase-functions");
const cors = require('cors')({origin: true});
require('dotenv').config();
const sgMail = require('@sendgrid/mail');


exports.sendEmail = functions.https.onRequest((request, response) => {
  
  sgMail.setApiKey(functions.config().sendgrid.key);
  
  const msg = {
    to: 'jacmilski@gmail.com', // Change to your recipient
    from: request.body.email, // z formika
    subject: `New message from ${request.body.name}`,
    text: request.body.message,
  };

    cors(request, response, () => {
      sgMail.send(msg, (err, res) => {
        if (err) {
          response.send(500)
        } else {
          response.send(res);
        }
      });
    })

});
