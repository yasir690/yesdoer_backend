const { NotFoundError, BadRequestError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");
const adminModel = require("../../model/adminModel");
const { genToken } = require("../../utils/generateToken");
const { comparePassword } = require("../../utils/passwordHashed");


const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel
      .findOne({ email })

    if (!admin) {
      throw new NotFoundError("admin not found")
    }


    const comparePass = await comparePassword(password, admin.password);

    if (!comparePass) {
      throw new BadRequestError("password not correct");
    }

    const token = genToken({
      _id: admin._id,
    });

    const response = {
      adminToken: token
    }

    handlerOk(res, 200, { ...admin._doc, ...response }, 'admin login successfully')

  } catch (error) {
    next(error)
  }
}

module.exports = {
  adminLogin
}