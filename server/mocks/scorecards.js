module.exports = function(app) {
  var express = require('express');
  var scorecardsRouter = express.Router();
  var currentId = 2;

  scorecardsRouter.get('/', function(req, res) {
    res.send({
      'scorecards': []
    });
  });

  scorecardsRouter.post('/', function(req, res) {
    currentId += 1;
    res.status(201).send({
      'scorecards': {
        id: currentId
      }
    });
  });

  scorecardsRouter.get('/1', function(req, res) {
    res.send({
      'scorecards': {
        id: 1,
        playingIndex: 29,
        round: 1,
        player: 1,
        scores: [1, 3, 2, 4, 5, 6, 7, 8, 9]
      }
    });
  });

  scorecardsRouter.get('/2', function(req, res) {
    res.send({
      'scorecards': {
        id: 2,
        playingIndex: 29,
        round: 1,
        player: 2,
        scores: [10, 11, 12, 13, 14, 15, 16, 17, 18]
      }
    });
  });

  scorecardsRouter.put('/:id', function(req, res) {
    res.send({
      'scorecards': {
        id: req.params.id
      }
    });
  });

  scorecardsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/scorecards', scorecardsRouter);
};
