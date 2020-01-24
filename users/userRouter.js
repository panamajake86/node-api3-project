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
  const { id } = req.params;

  User.getUserPosts(id)
    .then(user =>{
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error', err });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;

  User.remove(id)
    .then(user => {
      if (user) {
        res.status(200).end();
      } else {
        res.status(404).json({ message: 'user id not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error', err });
    });
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const body = req.body;

  User.update(id, body)
    .then(user => {
      if (user) {
        res.status(200).json(body);
      } else {
        res.status(404).json({ message: 'user id not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error', err });
    });
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
  const text  = body.text;
  const userId = body.user_id;

  if (!body) {
    res.status(400).json({ message: 'missing body of post' });
  }
  if (!text) {
    res.status(400).json({ message: 'missing required name field' });
  }
  if (!userId) {
    res.status(400).json({ message: 'missing required name field' });
  }

  next()
}

module.exports = router;
