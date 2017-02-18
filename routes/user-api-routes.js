var db = require("../models");
var Sequelize = require("sequelize");

module.exports = function(app) {

    app.get("/login:user", function(req, res) {
        db.User.findOne({
            where: {
                name: req.params.user
            },
            include: [{
                model: db.Gesture
            }]
        }).then(function(user) {
            res.send(user);
        });
    });

    app.post("/createuser", function(req, res) {
        db.User.create(req.body).then(function(dbGesture) {
            res.send(dbGesture);
        });
    });

    app.post("/userlogin", function(req, res) {
        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/updateicon", function(req, res) {
        db.User.update(
            req.body, {
                where: {
                    name: req.body.name
                }
            }).then(function(response) {
            res.send(response);
        });
    });

    app.post("/updatebio", function(req, res) {
        db.User.update(
            req.body, {
                where: {
                    name: req.body.name
                }
            }).then(function(response) {
            res.send(response);
        });
    });

    app.get('/getuser/:user', (req, res) => {
        let userName = req.params.user
        db.User.findAll({
            where: {
                name: userName
            },
            include: [{
                model: db.Gesture
            }],
            raw: true
        }).then((response) => {
              res.send(response[0]);
          });
    });

    app.get('/getgesture/:user', (req, res) => {
        let userName = req.params.user
        db.User.findAll({
            where: {
                name: userName
            },
            raw: true
        }).then((response) => {
            console.log(response);
              res.send(response[0]);
          });
    });

    app.get("/dig", (req, res) => {
        db.User.findAll({
            raw: true,
            where: {
                riddle: { $not: null }
            },
            limit : 15,
            order: [
                Sequelize.fn( 'RAND' ),
              ]
        }).then((response) => {
              res.send(response);
          });
    });

};
