const functions = require("firebase-functions");
const admin = require("firebase-admin");
const plaid = require("plaid");

admin.initializeApp();

const db = admin.firestore();

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
  const { email, uid } = userRecord;

  return db
    .collection("users")
    .doc(uid)
    .set({ email })
    .catch(console.error);
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  exchangeToken: functions.https.onCall((data, context) => {
    const plaidClient = new plaid.Client(
      "5dd59eca22b50f0014db7daf",
      "94ff2564990bc76c2939b9b0ea4b79",
      "1b29ff6476cba215f6542447539724",
      "sandbox",
      { version: "2018-05-22" }
    );
    return plaidClient.exchangePublicToken(data.token).then(apiResponse => {
      var accessToken = apiResponse.access_token;
      var itemId = apiResponse.item_id;
      return { accessToken: accessToken, itemId: itemId };
    });
  })
};
