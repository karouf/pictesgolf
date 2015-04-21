module.exports = function(app) {
  var express = require('express');
  var holesRouter = express.Router();

  holesRouter.get('/', function(req, res) {
    res.send({
      'holes': []
    });
  });

  holesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  holesRouter.get('/1', function(req, res) {
    res.send({
      'holes': {
        id: 1,
        number: 1,
        par: 5,
        strokeIndex: 5
      }
    });
  });

  holesRouter.get('/2', function(req, res) {
    res.send({
      'holes': {
        id: 2,
        number: 2,
        par: 4,
        strokeIndex: 17 
      }
    });
  });

  holesRouter.get('/3', function(req, res) {
    res.send({
      'holes': {
        id: 3,
        number: 3,
        par: 3,
        strokeIndex: 15
      }
    });
  });

  holesRouter.get('/4', function(req, res) {
    res.send({
      'holes': {
        id: 4,
        number: 4,
        par: 4,
        strokeIndex: 7
      }
    });
  });

  holesRouter.get('/5', function(req, res) {
    res.send({
      'holes': {
        id: 5,
        number: 5,
        par: 3,
        strokeIndex: 3 
      }
    });
  });

  holesRouter.get('/6', function(req, res) {
    res.send({
      'holes': {
        id: 6,
        number: 6,
        par: 4,
        strokeIndex: 2
      }
    });
  });

  holesRouter.get('/7', function(req, res) {
    res.send({
      'holes': {
        id: 7,
        number: 7,
        par: 4,
        strokeIndex: 13
      }
    });
  });

  holesRouter.get('/8', function(req, res) {
    res.send({
      'holes': {
        id: 8,
        number: 8,
        par: 5,
        strokeIndex: 9
      }
    });
  });

  holesRouter.get('/9', function(req, res) {
    res.send({
      'holes': {
        id: 9,
        number: 9,
        par: 3,
        strokeIndex: 11
      }
    });
  });

  holesRouter.get('/10', function(req, res) {
    res.send({
      'holes': {
        id: 10,
        number: 10,
        par: 5,
        strokeIndex: 6
      }
    });
  });

  holesRouter.get('/11', function(req, res) {
    res.send({
      'holes': {
        id: 11,
        number: 11,
        par: 4,
        strokeIndex: 1 
      }
    });
  });

  holesRouter.get('/12', function(req, res) {
    res.send({
      'holes': {
        id: 12,
        number: 12,
        par: 3,
        strokeIndex: 14
      }
    });
  });

  holesRouter.get('/13', function(req, res) {
    res.send({
      'holes': {
        id: 13,
        number: 13,
        par: 4,
        strokeIndex: 4
      }
    });
  });

  holesRouter.get('/14', function(req, res) {
    res.send({
      'holes': {
        id: 14,
        number: 14,
        par: 4,
        strokeIndex: 12 
      }
    });
  });

  holesRouter.get('/15', function(req, res) {
    res.send({
      'holes': {
        id: 15,
        number: 15,
        par: 4,
        strokeIndex: 8
      }
    });
  });

  holesRouter.get('/16', function(req, res) {
    res.send({
      'holes': {
        id: 16,
        number: 16,
        par: 4,
        strokeIndex: 16
      }
    });
  });

  holesRouter.get('/17', function(req, res) {
    res.send({
      'holes': {
        id: 17,
        number: 17,
        par: 3,
        strokeIndex: 10
      }
    });
  });

  holesRouter.get('/18', function(req, res) {
    res.send({
      'holes': {
        id: 18,
        number: 18,
        par: 5,
        strokeIndex: 18
      }
    });
  });

  holesRouter.put('/:id', function(req, res) {
    res.send({
      'holes': {
        id: req.params.id
      }
    });
  });

  holesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/holes', holesRouter);
};
