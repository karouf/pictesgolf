module.exports = function(app) {
  var express = require('express');
  var roundsRouter = express.Router();
  var currentId = 2;

  roundsRouter.get('/', function(req, res) {
    res.send({
      'rounds': [
        {
          id: 1,
          date: '2015-03-05',
          holesPlayed: 9,
          scoring: 'stableford',
          type: 'amical',
          course: 1,
          scorecards: [1, 2]
        }
      ]
    });
  });

  roundsRouter.post('/', function(req, res) {
    currentId += 1;
    res.status(201).send({
      'rounds': {
        id: currentId
      }
    });
  });

  roundsRouter.get('/1', function(req, res) {
    res.send({
      'rounds': {
        id: 1,
        date: '2015-03-05',
        holesPlayed: 9,
        scoring: 'stableford',
        type: 'amical',
        course: 1,
        scorecards: [1, 2]
      }
    });
  });

  roundsRouter.put('/:id', function(req, res) {
    res.send({
      'rounds': {
        id: req.params.id
      }
    });
  });

  roundsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/rounds', roundsRouter);
};
