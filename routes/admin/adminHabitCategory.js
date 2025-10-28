const limiter = require("../../middleware/limiter");
const validateRequest = require("../../middleware/validateRequest");


const adminHabitCategoryRouter = require("express").Router();
const adminHabitCategoryController = require("../../controllers/admin/adminHabitCategoryController");
const { adminCreateHabitCategorySchema, adminUpdateHabitCategorySchema, adminDeleteHabitCategorySchema } = require("../../schema/admin/habitCategory");
const { verifyAdminToken } = require("../../middleware/auth");



adminHabitCategoryRouter.post(
  "/createHabitCategory",
  limiter,
  validateRequest(adminCreateHabitCategorySchema),
  verifyAdminToken,
  adminHabitCategoryController.createHabitCategory
);

adminHabitCategoryRouter.get(
  "/showHabitCategory",
  // verifyAdminToken,
  adminHabitCategoryController.showHabitCategory
);

adminHabitCategoryRouter.put(
  "/updateHabitCategory/:categoryId",
  limiter,
  validateRequest(adminUpdateHabitCategorySchema),
  verifyAdminToken,
  adminHabitCategoryController.updateHabitCategory
);

adminHabitCategoryRouter.delete(
  "/deleteHabitCategory/:categoryId",
  limiter,
  validateRequest(adminDeleteHabitCategorySchema),
  verifyAdminToken,
  adminHabitCategoryController.deleteHabitCategory
);

module.exports = adminHabitCategoryRouter;