module.exports = function(app) {
  var express = require('express');
  var teesRouter = express.Router();

  teesRouter.get('/', function(req, res) {
    res.send({
      'tees': []
    });
  });

  teesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  teesRouter.get('/1', function(req, res) {
    res.send({
      'tees': {
        id: 1,
        color: 'yellow',
        sss: 69.5,
        slope: 126
      }
    });
  });

  teesRouter.put('/:id', function(req, res) {
    res.send({
      'tees': {
        id: req.params.id
      }
    });
  });

  teesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/tees', teesRouter);
};
