// don't put react here
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

const { PORT = 3000 } = process.env;
const SECRET = process.env.SECRET;
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname,'build')));

const client = require("./db/client.js");

// const apiRouter = require("./api/index.js");
// app.use("/api", apiRouter)

app.listen(PORT, () => {
    console.log("The server is up on port: ", PORT);
    client.connect();
});
