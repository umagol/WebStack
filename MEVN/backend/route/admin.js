const route = require("express").Router()
const Jwt = require("jsonwebtoken");



route.get("/", (req, res) => {

});


route.get("/:id", (req, res) => {
    var id = req.params.id;
    res.send(id);
});


route.post("/:id", (req, res) => {
    
});

module.exports = route;