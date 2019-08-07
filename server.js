var express = require("express");

var PORT = process.env.PORT || 8080;
var app = express();

var db = require('./models');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgersController.js");

app.use(routes);
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("Listening on port:%s", PORT);
  });
});
