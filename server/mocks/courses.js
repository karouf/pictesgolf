module.exports = function(app) {
  var express = require('express');
  var coursesRouter = express.Router();

  coursesRouter.get('/', function(req, res) {
    res.send({
      'courses': []
    });
  });

  coursesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  coursesRouter.get('/:id', function(req, res) {
    res.send({
      'courses': {
        id: req.params.id,
        name: 'Niort Hippodrome',
        holes: [1, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
      }
    });
  });

  coursesRouter.put('/:id', function(req, res) {
    res.send({
      'courses': {
        id: req.params.id
      }
    });
  });

  coursesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/courses', coursesRouter);
};
