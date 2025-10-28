const userRouter = require("express").Router();

const userAuthRouter = require("./userAuth");
const userHabitRouter = require("./userHabit");

userRouter.use("/auth", userAuthRouter);
userRouter.use("/habit", userHabitRouter);



module.exports = userRouter;
