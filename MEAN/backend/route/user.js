//Export
const route = require("express").Router();


route.get( "/", (req, res) => {
    res.send("hisatish");
});

route.get( "/:id", (req, res) => {
    var id = req.params.id;
    res.send(id);
});

route.post( "/:id", (req, res) => {
    var id = req.params.id;
});


route.delete( "/:id", (req, res) => {
    var id = req.params.lilistingid;

});

route.put( "/:id", (req, res) => {
    var id = req.params.lilistingid;

});


module.exports = route;