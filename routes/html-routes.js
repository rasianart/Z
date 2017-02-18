var path = require("path");
var db = require("../models");

module.exports = (app) => {

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
          console.log(response);
            res.render("portalentrance", {users: response[0]});
        });
  });

  app.get("/createburrow", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/create_burrow.html"));
  });

};
