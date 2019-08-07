var db = require('../models');

module.exports = function(app) {
   app.get('/', function(req, res) {
      db.Burger.findAll({})
         .then(function(burgerData) {
            res.render('index', { burger_data: burgerData });
         })
         .catch(function(err) {
            res.json(err);
         });
   });

   app.post('/burgers/create', function(req, res) {
      db.Burger.create({
         burger_name: req.body.burger_name
      })
         .then(function(result) {
            res.redirect('/');
         })
         .catch(function(err) {
            res.json(err);
         });
   });
   
   app.put('/burgers/:id', function(req, res) {
      db.Burger.update(
         { devoured: 1 },
         {
            where: {
               id: req.params.id
            }
         }
      )
         .then(function(result) {
            res.sendStatus(200);
         })
         .catch(function(err) {
            res.json(err);
         });
   });

};

// // put route -> back to index
// router.put("/burgers/:id", function(req, res) {
//   burger.update(req.params.id, function(result) {
//     // wrapper for orm.js that using MySQL update callback will return a log to console,
//     // render back to index with handle
//     console.log(result);
//     // Send back response and let page reload from .then in Ajax
//     res.sendStatus(200);
//   });
// });

// module.exports = router;
