const { NotFoundError, ValidationError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");
const habitCategoryModel = require("../../model/habitCategoryModel");
const habitModel = require("../../model/habitModel");

const userCreateHabit = async (req, res, next) => {
  try {

    const { habitTitle, habitDescription, categoryId } = req.body;
    const { id } = req.user;
    const findcategory = await habitCategoryModel.findById(categoryId);

    if (!findcategory) {
      throw new NotFoundError("habit category not found")
    }

    const createhabit = await habitModel.create({
      habitTitle,
      habitDescription,
      categoryId,
      createdBy: id
    });

    if (!createhabit) {
      throw new ValidationError("habit not create")
    }

    handlerOk(res, 200, createhabit, "habit created successfully");

  } catch (error) {
    next(error)
  }
}

const userShowHabit = async (req, res, next) => {
  try {
    const { id } = req.user;

    const finduserhabit = await habitModel.find({ createdBy: id }).populate("categoryId ");

    if (finduserhabit.length === 0) {
      throw new NotFoundError("user habit not found")
    }

    handlerOk(res, 200, finduserhabit, "user habit found successfully");

  } catch (error) {
    next(error)
  }
}

module.exports = {
  userCreateHabit,
  userShowHabit
}