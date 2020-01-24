const express = require('express');
const User = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  res.status(200).json(req.name)
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Server error", err });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.params);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;

  User.getById(id)
    .then(users => {
      if(users) {
        req.id = id;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "exception", err });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  const body = req.name;

  User.get(body)
    .then(users => {
      if(users) {
        req.name = name;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "exception", err });
    });
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
