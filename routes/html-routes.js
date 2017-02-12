// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = (app) => {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/login.html"));
  });

  app.get("/home", (req, res) => {
      db.User.findAll({
          raw: true,
          where: {
              riddle: { $not: null }
          },
          limit : 15
      }).then((response) => {
            res.render("home", {users: response});
        });
  });

  app.get('/portalentrance/:user', (req, res) => {
      let userName = req.params.user
      console.log(userName);
      db.User.findAll({
          where: {
              name: userName
          },
          raw: true
      }).then((response) => {
            res.render("portalentrance", {users: response[0]});
        });
  });

  app.get("/createburrow", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/create_burrow.html"));
  });

};
