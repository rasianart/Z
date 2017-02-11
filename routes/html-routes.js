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
    //   let currentUser = req.params.user;
      db.User.findAll({
          raw: true,
          where: {
              riddle: { $not: null }
          }
      }).then((response) => {
            // console.log(response);
            // let x = {
            //     users: response,
            //     user: currentUser
            // };
            // console.log(x);
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
            console.log(response[0]);
            // res.send(response);
            res.render("portalentrance", {users: response[0]});
        });
        // res.sendFile(path.join(__dirname + "/../public/portaltest.html"));
  });

  app.get("/createburrow", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/create_burrow.html"));
  });

  // // home route loads home.html
  // app.get("/home", function(req, res) {
  //   res.sendFile(path.join(__dirname + "/../public/home.html"));
  // });

  // // blog route loads blog.html
  // app.get("/gesture", function(req, res) {
  //   res.sendFile(path.join(__dirname + "/../public/site.html"));
  // });
  //
  // // authors route loads author-manager.html
  // app.get("/users", function(req, res) {
  //   res.sendFile(path.join(__dirname + "/../public/user-manager.html"));
  // });

};
