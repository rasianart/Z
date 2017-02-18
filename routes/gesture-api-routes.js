
var db = require("../models");

module.exports = function(app) {

    app.post("/creategesture", function(req, res) {
        db.Gesture.create(req.body).then(function(dbGesture) {
            res.send(dbGesture);
        });
    });

};
