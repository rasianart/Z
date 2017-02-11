var db = require("../models");

module.exports = function(app) {

    app.get("/login:user", function(req, res) {
        console.log(req.params.user);
        db.User.findOne({
            where: {
                name: req.params.user
            },
            include: [{
                model: db.Gesture
            }]
        }).then(function(user) {
            console.log(user);
            res.send(user);
        });
    });

    app.post("/createuser", function(req, res) {
        db.User.create(req.body).then(function(dbGesture) {
            console.log(dbGesture);
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
        console.log(userName);
        db.User.findAll({
            where: {
                name: userName
            },
            raw: true
        }).then((response) => {
              console.log(response[0]);
              // res.send(response);
              res.send(response[0]);
          });
          // res.sendFile(path.join(__dirname + "/../public/portaltest.html"));
    });




    // app.get("/api/users", function(req, res) {
    //     // 1. Add a join to include all of each User's Gestures
    //     db.User.findAll({
    //         include: [{
    //             model: db.Gesture
    //         }]
    //     }).then(function(dbUser) {
    //         res.json(dbUser);
    //     });
    // });
    //
    // app.get("/api/users/:id", function(req, res) {
    //     // 2; Add a join to include all of the User's Gestures here
    //     db.User.findOne({
    //         where: {
    //             id: req.params.id
    //         },
    //         include: [{
    //             model: db.Gesture
    //         }]
    //     }).then(function(dbUser) {
    //         res.json(dbUser);
    //     });
    // });
    //
    //
    //
    // app.delete("/api/users/:id", function(req, res) {
    //     db.User.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function(dbUser) {
    //         res.json(dbUser);
    //     });
    // });

};
