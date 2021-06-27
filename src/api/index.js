// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router

const { Router } = require("express");
const apiRouter = Router();

apiRouter.get("/health", async (req, res, next) => {
    try {
        res.send({
            message: "The health is good"
        });
    } catch (error) {
        next(error);
    }
});

const usersRouter = require("./users.js");
apiRouter.use("/users", usersRouter);

const activitiesRouter = require("./activities.js");
apiRouter.use("/activities", activitiesRouter); 

const routineRouter = require("./routines.js");
apiRouter.use("/routines", routineRouter);

const routineActivitiesRouter = require("./routine_activities.js");
apiRouter.use("/routine_activities", routineActivitiesRouter);

module.exports = apiRouter;
