const { ConflictError, ValidationError, NotFoundError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");
const habitCategoryModel = require("../../model/habitCategoryModel");

const createHabitCategory = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { habitCategory } = req.body;

    const findhabitcategory = await habitCategoryModel.findOne({
      habitCategory,
      createdBy: id
    });

    if (findhabitcategory) {
      throw new ConflictError("habit category already exist")
    }

    const createhabitcategory = await habitCategoryModel.create({
      habitCategory,
      createdBy: id
    });

    if (!createhabitcategory) {
      throw new ValidationError("habit category not create")
    }

    handlerOk(res, 200, createhabitcategory, "habit category created successfully");

  } catch (error) {
    next(error)
  }
}


const showHabitCategory = async (req, res, next) => {
  try {

    const findhabitcategory = await habitCategoryModel.find();

    if (findhabitcategory.length === 0) {
      throw new NotFoundError("habit categories not found")
    }

    handlerOk(res, 200, findhabitcategory, "habit categories found successfully")

  } catch (error) {
    next(error)
  }
}

const updateHabitCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { habitCategory } = req.body;
    const findhabitcategory = await habitCategoryModel.findById(categoryId);

    if (!findhabitcategory) {
      throw new NotFoundError("habit categories not found")
    }

    const updatehabitcategory = await habitCategoryModel.findByIdAndUpdate(categoryId, {
      habitCategory
    }, { new: true });

    if (!updatehabitcategory) {
      throw new ValidationError("habit category not update")
    }

    handlerOk(res, 200, updatehabitcategory, "habit category updated successfully");

  } catch (error) {
    next(error)
  }
}

const deleteHabitCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const findhabitcategory = await habitCategoryModel.findById(categoryId);

    if (!findhabitcategory) {
      throw new NotFoundError("habit categories not found")
    }

    const updatehabitcategory = await habitCategoryModel.findByIdAndDelete(categoryId);

    if (!updatehabitcategory) {
      throw new ValidationError("habit category not delete")
    }

    handlerOk(res, 200, null, "habit category deleted successfully");

  } catch (error) {
    next(error)
  }
}

module.exports = {
  createHabitCategory,
  showHabitCategory,
  updateHabitCategory,
  deleteHabitCategory
}