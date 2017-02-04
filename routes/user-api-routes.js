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



    app.get("/api/users", function(req, res) {
        // 1. Add a join to include all of each User's Gestures
        db.User.findAll({
            include: [{
                model: db.Gesture
            }]
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/api/users/:id", function(req, res) {
        // 2; Add a join to include all of the User's Gestures here
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Gesture
            }]
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/userlogin", function(req, res) {
        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

};
