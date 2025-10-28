const adminRouter = require("express").Router();

const adminAuthRouter = require("./adminAuth");
const adminHabitCategoryRouter = require("./adminHabitCategory");

adminRouter.use("/auth", adminAuthRouter);
adminRouter.use("/habitCategory", adminHabitCategoryRouter);



module.exports = adminRouter;