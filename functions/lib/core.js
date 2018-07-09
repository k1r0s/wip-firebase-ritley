const url = require("url");

class AbstractResource {

  constructor(_uri) {
    this.$uri = _uri;
    this.$srv = AbstractResource.instance;
    this.$srv.register(this);
  }

  onRequest(req, res) {
    const body = [];
    req.on("data", d => body.push(d));
    req.on("end", () => this.dispatch(req, res, Buffer.concat(body)));
  }

  dispatch(req, res, buffer) {
    req.query = url.parse(req.url, true).query;
    req.buffer = buffer;
    req.body = buffer.toString();
    req.toJSON = () => JSON.parse(buffer.toString());

    const methodName = req.method.toLowerCase();
    if(typeof this[methodName] !== "function") return console.warn(`unhandled '${methodName}' request on ${this.$uri} resource`);
    this[methodName](req, res);
  }
}

module.exports = { AbstractResource, setAdapter: instance => AbstractResource.instance = instance }
