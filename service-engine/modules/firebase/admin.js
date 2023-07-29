const admin = require("firebase-admin");
const {getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const serviceAccount = require("../../sa.json");

async function initializeAppSA() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

function getFirestoreDB() {
    return getFirestore();
}

module.exports = {
    initializeAppSA,
    getFirestoreDB
}