const { Router } = require("express");
const activitiesRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const {
  getAllActivities,
  createActivity,
  updateActivity,
} = require("../db/activities.js");
const { getPublicRoutinesByActivity } = require("../db/routines.js");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post("/", async (req, res, next) => {
  const { name, description } = req.body;
  try {
    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split("Bearer ");
      const validatedToken = jwt.verify(token, JWT_SECRET);

      if (validatedToken) {
        const activity = await createActivity({ name, description });
        res.send(activity);
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

activitiesRouter.patch("/:activityId", async (req, res, next) => {
  const { activityId } = req.params;
  const { name, description } = req.body;
  try {
    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split("Bearer ");
      const validatedToken = jwt.verify(token, JWT_SECRET);

      if (validatedToken) {
        const activity = await updateActivity({
          id: activityId,
          name,
          description,
        });
        res.send(activity);
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

activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;
  try {
    const activities = await getPublicRoutinesByActivity({ id: activityId });
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

module.exports = activitiesRouter;