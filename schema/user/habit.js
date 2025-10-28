const Joi = require("joi");

const userCreateHabitSchema = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    habitTitle: Joi.string().required(),
    habitDescription: Joi.string().optional(),
    categoryId: Joi.string().required()
  }),
});


module.exports = {
  userCreateHabitSchema
}