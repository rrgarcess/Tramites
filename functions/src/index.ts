import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const auto_increment = functions.database.ref('/hello')
.onWrite((event: any) => {
    // let parent = event.data.ref.parent;
    // let pagosRef = parent.child('/abonos');

    return event.data.ref.push({msg: 'success'})
    .then(() => {
        console.log('Write success!');
    });
});
