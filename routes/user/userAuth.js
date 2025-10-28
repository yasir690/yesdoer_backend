const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validateRequest");


const userAuthRouter = require("express").Router();
const userAuthController = require("../../controllers/user/userAuthController");
const { verifyUserToken } = require("../../middleware/auth");
const { userRegisterSchema, userVerifySchema, userLoginSchema } = require("../../schema/user/auth");



userAuthRouter.post(
  "/userRegister",
  limiter,
  validateRequest(userRegisterSchema),
  userAuthController.userRegister
);

userAuthRouter.post(
  "/userLogin",
  limiter,
  validateRequest(userLoginSchema),
  userAuthController.userLogin
);

userAuthRouter.get(
  "/verifyUser/:id",
  limiter,
  validateRequest(userVerifySchema),
  userAuthController.verifyUser
);

userAuthRouter.get(
  "/getMe",
  limiter,
  verifyUserToken,
  userAuthController.getMe
);

userAuthRouter.post(
  "/userLogout",
  limiter,
  verifyUserToken,
  userAuthController.userLogout
);

module.exports = userAuthRouter;