const express = require("express");
const routineActivitiesRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const {
  getRoutineActivityById,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("../db/routine_activities.js");
const { getRoutineById } = require("../db/routines.js");

routineActivitiesRouter.use((req, res, next) => {
  console.log("A request is being made to /routine_activities");
  next();
});

routineActivitiesRouter.patch("/:routineActivityId", async (req, res, next) => {
  const { routineActivityId } = req.params;
  const { count, duration } = req.body;

  try {
    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split("Bearer ");
      const validatedToken = jwt.verify(token, JWT_SECRET);
      const specifiedRoutineActivity = await getRoutineActivityById(
        routineActivityId
      );
      const routine = await getRoutineById(specifiedRoutineActivity.routineId);

      if (validatedToken.id === routine.creatorId) {
        const routineActivity = await updateRoutineActivity({
          id: routineActivityId,
          count,
          duration,
        });
        res.send(routineActivity);
      } else {
        res.status(403).send({ message: `Routine creator not logged in` });
      }
    }
  } catch (error) {
    next(error);
  }
});

routineActivitiesRouter.delete(
  "/:routineActivityId",
  async (req, res, next) => {
    const { routineActivityId } = req.params;

    try {
      if (req.headers.authorization) {
        const [, token] = req.headers.authorization.split("Bearer ");
        const validatedToken = jwt.verify(token, JWT_SECRET);
        const specifiedRoutineActivity = await getRoutineActivityById(
          routineActivityId
        );
        const routine = await getRoutineById(
          specifiedRoutineActivity.routineId
        );

        if (validatedToken.id === routine.creatorId) {
          const routineActivity = await destroyRoutineActivity(
            routineActivityId
          );
          res.send(routineActivity);
        } else {
          res.status(403).send({ message: `Routine creator not logged in` });
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routineActivitiesRouter;