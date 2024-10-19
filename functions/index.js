/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

exports.getFirebaseConfig = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        res.status(200).json({
            apiKey: functions.config().myapp.api_key,
            authDomain: functions.config().myapp.auth_domain,
            databaseURL: functions.config().myapp.database_url,
            projectId: functions.config().myapp.project_id,
            storageBucket: functions.config().myapp.storage_bucket,
            messagingSenderId: functions.config().myapp.messaging_sender_id,
            appId: functions.config().myapp.app_id
        });
    });
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
