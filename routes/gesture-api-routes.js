// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the Gestures
    app.get("/api/gestures", function(req, res) {
        var query = {};
        if (req.query.User_id) {
            query.UserId = req.query.User_id;
        }
        // 1. Add a join here to include all of the Users to these Gestures
        db.Gesture.findAll({
            include: {
                model: db.User
            }
        }).then(function(dbGesture) {
            res.json(dbGesture);
        });
    });

    // Get rotue for retrieving a single Gesture
    app.get("/api/gestures/:id", function(req, res) {
        // 2. Add a join here to include the User who wrote the Gesture
        db.Gesture.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: db.User
            }
        }).then(function(dbGesture) {
            console.log(dbGesture);
            res.json(dbGesture);
        });
    });

    // Gesture route for saving a new Gesture
    app.post("/creategesture", function(req, res) {
        db.Gesture.create(req.body).then(function(dbGesture) {
            res.send(dbGesture);
        });
    });

    // DELETE route for deleting Gestures
    app.delete("/api/gestures/:id", function(req, res) {
        db.Gesture.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbGesture) {
            res.json(dbGesture);
        });
    });

    // PUT route for updating Gestures
    app.put("/api/gestures", function(req, res) {
        db.Gesture.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbGesture) {
            res.json(dbGesture);
        });
    });
};
