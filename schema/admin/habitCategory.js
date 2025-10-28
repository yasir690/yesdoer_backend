const Joi = require("joi");

const adminCreateHabitCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
  }),
  body: Joi.object({
    habitCategory: Joi.string().required(),
  }),
});

const adminUpdateHabitCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.string().required(),
  }),
  body: Joi.object({
    habitCategory: Joi.string().required(),
  }),
});

const adminDeleteHabitCategorySchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.string().required(),

  }),
  body: Joi.object({
  }),
});

module.exports = {
  adminCreateHabitCategorySchema,
  adminUpdateHabitCategorySchema,
  adminDeleteHabitCategorySchema
}