const functions = require('firebase-functions');
const admin = require('firebase-admin');

const Ritley = require("./lib/core");
const FirebaseAdapter = require("./lib/firebase-adapter");

admin.initializeApp({ credential: admin.credential.cert(require("./test-api-46894-firebase-adminsdk-myvj9-2b50530880.json")) });

const firebase = new FirebaseAdapter();

exports.api = functions.https.onRequest((...args) => firebase.handle(...args));

Ritley.setAdapter(firebase);

class BasicResource extends Ritley.AbstractResource {

  get(request, response) {
    console.log(this.$uri);
    console.log(request.query);
    response.statusCode = 200;
    response.end("done");
  }

  post(request, response) {
    console.log(request.toJSON());
    console.log(request.body);
    console.log(request.buffer);
    response.statusCode = 200;
    response.end("done");
  }

}

new BasicResource("dummy");
new BasicResource("dummo");
new BasicResource("dammo");
