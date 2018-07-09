const Ritley = require("./lib/core");
const NodeAdapter = require("./lib/node-server");

Ritley.setAdapter(new NodeAdapter({
  "base": `/rest/`,
  "port": 8080
}));

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
