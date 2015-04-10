module.exports = function(app) {
  var express = require('express');
  var playersRouter = express.Router();

  playersRouter.get('/', function(req, res) {
    res.send({
      'players': [
        {
          id: 1,
          name: 'Renaud Martinet',
          index: 54,
          scorecards: [1]
        },
        {
          id: 2,
          name: 'Yann Allirol',
          index: 54,
          scorecards: [2]
        }
      ]
    });
  });

  playersRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  playersRouter.get('/1', function(req, res) {
    res.send({
      'players': {
        id: 1,
        name: 'Renaud Martinet',
        index: 54,
        scorecards: [1]
      }
    });
  });

  playersRouter.get('/:id', function(req, res) {
    res.send({
      'players': {
        id: 2,
        name: 'Yann Allirol',
        index: 54,
        scorecards: [2]
      }
    });
  });

  playersRouter.put('/:id', function(req, res) {
    res.send({
      'players': {
        id: req.params.id
      }
    });
  });

  playersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/players', playersRouter);
};
