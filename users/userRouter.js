const express = require('express');
const User = require('./userDb');
const Post = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!

  User.insert(req.body)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error', err });
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const body = req.body;
  const userId = body.user_id;

  if (userId == id) {
    Post.insert(body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({ message: 'Server error, try again later', err});
      })
  }


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
  const { id } = req.params;

  User.getById(id)
    .then(users => {
  if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
   
  })
    .catch(err => {
      res.status(500).json({ message: "exception", err })
    });
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
      if (users) {
        req.id = users.id;
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
  const body = req.body;
  const { name } = body;

  if (!body) {
    res.status(400).json({ message: 'missing body of user' });
  } 
  if (!name) {
    res.status(400).json({ message: 'missing required name field' });
  }

  next();
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  const { name }  = body;
  const { user_id} = body;

  if (!cody) {
    res.status(400).json({ message: 'missing body of post' });
  }
  if (!name) {
    res.status(400).json({ message: 'missing required name field' });
  }
  if (!user_id) {
    res.status(400).json({ message: 'missing required name field' });
  }

  next()
}

module.exports = router;
