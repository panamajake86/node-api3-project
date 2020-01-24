const express = require('express');
const helmet = require('helmet');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const time = new Date();

  console.log(`Method: ${req.method}, URL: http://localhost:4000${req.url}, Timestamp: ${time}`);
  next();
};

module.exports = server;
