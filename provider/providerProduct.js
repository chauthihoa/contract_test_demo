const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((_, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

// "In memory" data store
let dataStore = require("./data/products.js");

server.get("/products", (_, res) => {
  res.json(dataStore);
});

module.exports = {
  server,
  dataStore,
};
