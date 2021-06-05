const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const {
  createUser,
  getUser,
  getUserById,
  getUserByUserName,
} = require("../db/users.js");
const { getPublicRoutinesByUser } = require("../db/routines.js");


usersRouter.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if (password.length <= 7) {
            return res
                .status(406)
                .send({ message: "Password must be at least 8 characters long" });
        } 
        
    const user = await createUser({ username, password });
    
    if (!user) {
        res.status(400).send({
            message: `Username ${username} is already taken`,
        });
     } else {
        res.send({
            user, message: "User created successfully" });
     }
    } catch (error) {
        if (error.code === "23505") {
            next(` error: ${error.detail}`);
        } else {
            next(error);
        }
    }
});

usersRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      if (!username || !password) {
        return res
          .status(400)
          .send({ message: `Incorrect username or password` });
      }
  
      const user = await getUser({ username, password });
  
      if (!user) {
        res.status(400).send({ message: `Incorrect username or password` });
      } else {
        const token = jwt.sign({ id: user.id, username }, JWT_SECRET, {
          expiresIn: "1w",
        });
  
        res.send({
          user,
          token,
          message: `Successfully logged in ${username}`,
        });
      }
    } catch (error) {
      next(error);
    }
  });

usersRouter.get("/me", async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const [, token] = req.headers.authorization.split("Bearer ");
        const validatedToken = jwt.verify(token, JWT_SECRET);
  
        const user = await getUserById(validatedToken.id);
  
        res.send(user);
      } else {
        res.status(403).send({ message: `Please Login First` });
      }
    } catch (error) {
      next(error);
    }
  });
  
  usersRouter.get("/:username/routines", async (req, res, next) => {
    const { username } = req.params;
  
    try {
      const user = await getUserByUserName(username);
  
      if (!user) {
        return res.send({ message: `Error finding ${username}` });
      }
  
      const routines = await getPublicRoutinesByUser({
        id: user.id,
        username: username,
      });
  
      res.send(routines);
    } catch (error) {
      next(error);
    }
  });
  
module.exports = usersRouter;