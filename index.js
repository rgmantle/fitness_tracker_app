// create the express server here
require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

// const { client } = require('./db');
// client.connect();

// const apiRouter = require('./api');
// server.use('/api', apiRouter);

// server.use((req, res, next) => {
//     console.log("<____Body Logger START____>");
//     console.log(req.body);
//     console.log("<_____Body Logger END_____>");
  
//     next();
//   });

// server.use('/api', (request, response, next) => {
//     console.log("A request was made to /api (this is the middleware).");
//     next();
// })


// server.get('/api', (request, response, next) => {
//     console.log("A get request was made to /api");
//     response.send({message: "success"});
// })

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
  });