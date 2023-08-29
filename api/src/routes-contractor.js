const express = require("express");

module.exports = (app, routes = [], prefixString) => {
  routes.forEach(route => {
    let router = express.Router();
    route(router);
    app.use(prefixString, router);
  });
}