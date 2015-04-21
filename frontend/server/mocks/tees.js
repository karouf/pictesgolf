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
        color: 'red',
        sss: 65.7,
        slope: 118
      }
    });
  });

  teesRouter.get('/2', function(req, res) {
    res.send({
      'tees': {
        id: 2,
        color: 'blue',
        sss: 66.8,
        slope: 121
      }
    });
  });

  teesRouter.get('/3', function(req, res) {
    res.send({
      'tees': {
        id: 3,
        color: 'yellow',
        sss: 69.7,
        slope: 127
      }
    });
  });

  teesRouter.get('/4', function(req, res) {
    res.send({
      'tees': {
        id: 4,
        color: 'white',
        sss: 71.7,
        slope: 130
      }
    });
  });

  teesRouter.get('/5', function(req, res) {
    res.send({
      'tees': {
        id: 5,
        color: 'black',
        sss: 71.7,
        slope: 130
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
