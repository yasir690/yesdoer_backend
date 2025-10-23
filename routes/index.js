const express = require("express");
const router = express.Router();

const userRouter = require("./user/index");


router.use("/user", userRouter);




router.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


module.exports = router;

