const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validateRequest");


const userHabitRouter = require("express").Router();
const userHabitController = require("../../controllers/user/userHabitController");
const { verifyUserToken } = require("../../middleware/auth");
const { userCreateHabitSchema } = require("../../schema/user/habit");



userHabitRouter.post(
  "/userCreateHabit",
  limiter,
  validateRequest(userCreateHabitSchema),
  verifyUserToken,
  userHabitController.userCreateHabit
);

userHabitRouter.get(
  "/userShowHabit",
  verifyUserToken,
  userHabitController.userShowHabit
);

module.exports = userHabitRouter;