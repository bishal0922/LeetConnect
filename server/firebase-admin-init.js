// server/firebase-admin-init.js
const admin = require('firebase-admin');
const serviceAccount = require('./leetconnect-8fad9-firebase-adminsdk-l337z-679d99d554.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
