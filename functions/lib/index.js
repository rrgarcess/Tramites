"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
exports.auto_increment = functions.database.ref('/hello')
    .onWrite((event) => {
    // let parent = event.data.ref.parent;
    // let pagosRef = parent.child('/abonos');
    return event.data.ref.push({ msg: 'success' })
        .then(() => {
        console.log('Write success!');
    });
});
//# sourceMappingURL=index.js.map