module.exports = function(app) {
  var express = require('express');
  var scoresRouter = express.Router();
  var currentId = 18;

  scoresRouter.get('/', function(req, res) {
    res.send({
      'scores': []
    });
  });

  scoresRouter.post('/', function(req, res) {
    currentId += 1;
    res.status(201).send({
      'scores': {
        id: currentId
      }
    });
  });

  scoresRouter.get('/1', function(req, res) {
    res.send({
      'scores': {
        id: 1,
        strokes: 1,
        receivedStrokes: 3,
        scorecard: 1,
        hole: 1
      }
    });
  });

  scoresRouter.get('/2', function(req, res) {
    res.send({
      'scores': {
        id: 2,
        strokes: 6,
        receivedStrokes: 3,
        scorecard: 1,
        hole: 2
      }
    });
  });

  scoresRouter.get('/3', function(req, res) {
    res.send({
      'scores': {
        id: 3,
        strokes: 2,
        receivedStrokes: 3,
        scorecard: 1,
        hole: 3
      }
    });
  });

  scoresRouter.get('/4', function(req, res) {
    res.send({
      'scores': {
        id: 4,
        strokes: 2,
        receivedStrokes: 3,
        scorecard: 1,
        hole: 4
      }
    });
  });

  scoresRouter.get('/5', function(req, res) {
    res.send({
      'scores': {
        id: 5,
        strokes: 3,
        receivedStrokes: 4,
        scorecard: 1,
        hole: 5
      }
    });
  });

  scoresRouter.get('/6', function(req, res) {
    res.send({
      'scores': {
        id: 6,
        strokes: 5,
        receivedStrokes: 4,
        scorecard: 1,
        hole: 6
      }
    });
  });

  scoresRouter.get('/7', function(req, res) {
    res.send({
      'scores': {
        id: 7,
        strokes: 8,
        receivedStrokes: 3,
        scorecard: 1,
        hole: 7
      }
    });
  });

  scoresRouter.get('/8', function(req, res) {
    res.send({
      'scores': {
        id: 8,
        strokes: 2,
        receivedStrokes: 3,
        scorecard: 1,
        hole: 8
      }
    });
  });

  scoresRouter.get('/9', function(req, res) {
    res.send({
      'scores': {
        id: 9,
        strokes: 5,
        receivedStrokes: 3,
        scorecard: 1,
        hole: 9
      }
    });
  });

  scoresRouter.get('/10', function(req, res) {
    res.send({
      'scores': {
        id: 10,
        strokes: 12,
        receivedStrokes: 3,
        scorecard: 2,
        hole: 1
      }
    });
  });

  scoresRouter.get('/11', function(req, res) {
    res.send({
      'scores': {
        id: 11,
        strokes: 8,
        receivedStrokes: 3,
        scorecard: 2,
        hole: 2
      }
    });
  });

  scoresRouter.get('/12', function(req, res) {
    res.send({
      'scores': {
        id: 12,
        strokes: 9,
        receivedStrokes: 3,
        scorecard: 2,
        hole: 3
      }
    });
  });

  scoresRouter.get('/13', function(req, res) {
    res.send({
      'scores': {
        id: 13,
        strokes: 8,
        receivedStrokes: 3,
        scorecard: 2,
        hole: 4
      }
    });
  });

  scoresRouter.get('/14', function(req, res) {
    res.send({
      'scores': {
        id: 14,
        strokes: 6,
        receivedStrokes: 4,
        scorecard: 2,
        hole: 5
      }
    });
  });

  scoresRouter.get('/15', function(req, res) {
    res.send({
      'scores': {
        id: 15,
        strokes: 8,
        receivedStrokes: 4,
        scorecard: 2,
        hole: 6
      }
    });
  });

  scoresRouter.get('/16', function(req, res) {
    res.send({
      'scores': {
        id: 16,
        strokes: 4,
        receivedStrokes: 3,
        scorecard: 2,
        hole: 7
      }
    });
  });

  scoresRouter.get('/17', function(req, res) {
    res.send({
      'scores': {
        id: 17,
        strokes: 7,
        receivedStrokes: 3,
        scorecard: 2,
        hole: 8
      }
    });
  });

  scoresRouter.get('/18', function(req, res) {
    res.send({
      'scores': {
        id: 18,
        strokes: 6,
        receivedStrokes: 3,
        scorecard: 2,
        hole: 9
      }
    });
  });

  scoresRouter.put('/:id', function(req, res) {
    res.send({
      'scores': {
        id: req.params.id
      }
    });
  });

  scoresRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/scores', scoresRouter);
};
