const express = require("express");
const routineRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const {
  getAllPublicRoutines,
  createRoutine,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
} = require("../db/routines.js");
const { addActivityToRoutine } = require("../db/routine_activities.js");

routineRouter.get("/", async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    res.send(routines);
  } catch (error) {
    next(error);
  }
});

routineRouter.post("/", async (req, res, next) => {
  const { name, goal, isPublic } = req.body;

  try {
    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split("Bearer ");
      const validatedToken = jwt.verify(token, JWT_SECRET);

      if (validatedToken) {
        const routine = await createRoutine({
          creatorId: validatedToken.id,
          isPublic,
          name,
          goal,
        });
        res.send(routine);
      } else {
        res.status(403).send({ message: `Please login` });
      }
    } else {
      res.status(403).send({ message: `Please login` });
    }
  } catch (error) {
    next(error);
  }
});

routineRouter.patch("/:routineId", async (req, res, next) => {
  const { routineId } = req.params;
  const { name, goal, isPublic } = req.body;

  try {
    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split("Bearer ");
      const validatedToken = jwt.verify(token, JWT_SECRET);
      const specifiedRoutine = await getRoutineById(routineId);

      if (validatedToken.id === specifiedRoutine.creatorId) {
        const routine = await updateRoutine({
          id: routineId,
          isPublic,
          name,
          goal,
        });
        res.send(routine);
      } else {
        res.status(403).send({ message: `User not logged in, cannot update routine` });
      }
    }
  } catch (error) {
    next(error);
  }
});

routineRouter.delete("/:routineId", async (req, res, next) => {
  const { routineId } = req.params;

  try {
    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split("Bearer ");
      const validatedToken = jwt.verify(token, JWT_SECRET);
      const specifiedRoutine = await getRoutineById(routineId);

      if (validatedToken.id === specifiedRoutine.creatorId) {
        const routine = await destroyRoutine(routineId);
        res.send(routine);
      } else {
        res.status(403).send({ message: `User not logged in, cannot delete routine` });
      }
    }
  } catch (error) {
    next(error);
  }
});

routineRouter.post("/:routineId/activities", async (req, res, next) => {
  const { routineId } = req.params;
  const { activityId, count, duration } = req.body;

  try {
    const activity = await addActivityToRoutine({
      routineId,
      activityId,
      count,
      duration,
    });
    res.send(activity);
  } catch (error) {
    if (error.code === "23505") {
      next(`  error: ${error.detail}`);
    } else {
      next(error);
    }
  }
});

module.exports = routineRouter;