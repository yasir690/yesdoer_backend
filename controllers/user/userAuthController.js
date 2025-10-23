const { ConflictError, NotFoundError, ValidationError, BadRequestError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");
const authModel = require("../../model/authModel");
const sendEmails = require("../../utils/sendEmail");
const { hashPassword, comparePassword } = require("../../utils/passwordHashed")
const { genToken } = require("../../utils/generateToken");
const emailTemplates = require("../../utils/emailTemplate");



const userRegister = async (req, res, next) => {
  try {
    const {
      email,
      password,
      deviceType,
      deviceToken,

    } = req.body;

    // Batch user existence check
    const existingUsers = await authModel.findOne({
      email
    });

    if (existingUsers) {
      throw new ConflictError("user already exist")
    }


    // Create and save user
    const hashedPass = await hashPassword(password, 10);

    const newUserPayload = {
      email,
      password: hashedPass,
    };

    if (deviceType) {
      newUserPayload.deviceType = deviceType;
    }

    if (deviceToken) {
      newUserPayload.deviceToken = deviceToken;
    }

    const newUser = new authModel(newUserPayload);
    const savedUser = await newUser.save();

    // Build verification link using runtime host and configured API prefix
    const apiPrefix = process.env.API_PRIFEX || "/api/v1";
    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get("host")}`;
    const apiLink = `${appUrl}${apiPrefix}/user/auth/verifyUser/${savedUser._id}`;

    const emailData = {
      subject: "yesdoer - Account Verification",
      html: emailTemplates.verificationLink(apiLink),
    };

    await sendEmails(email, emailData.subject, emailData.html);

    handlerOk(res, 200, apiLink, "link sent successfully");

  } catch (error) {
    next(error)
  }
}

const verifyUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await authModel.findById(id);
    if (!user) {
      throw new NotFoundError("user not found")
    }

    const verifyuser = await authModel.findByIdAndUpdate(
      id,
      { $set: { userVerified: true }, $unset: { expireAt: 1 } }, // removes TTL field
      { new: true }
    );

    if (!verifyuser) {
      throw new ValidationError("user not verify")
    }

    const responseHtml =
      `<html><body><h1>User Verification Successful</h1><p> Thank you ,For Verifying Your Account</p></body></html>`.trim();

    // Remove HTML tags using a regular expression
    const plainText = responseHtml.replace(/<[^>]*>/g, "");

    handlerOk(res, 200, plainText, "user verify successfully")


  } catch (error) {
    next(error)
  }
}

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Fetch user and check for child username if provided
    const user = await authModel
      .findOne({ email, userVerified: true })

    if (!user) {
      throw new NotFoundError("user not found")
    }


    const comparePass = await comparePassword(password, user.password);

    if (!comparePass) {
      throw new BadRequestError("password not correct");
    }

    const token = genToken({
      id: user._id,
    });

    const response = {
      userToken: token
    }

    handlerOk(res, 200, { ...user._doc, ...response }, 'user login successfully')

  } catch (error) {
    next(error)
  }
}



const userLogout = async (req, res, next) => {
  try {

    const { id } = req.user;

    const finduser = await authModel.findByIdAndUpdate(id, {
      deviceToken: null
    });

    handlerOk(res, 200, null, 'user logout successfully');

  } catch (error) {
    next(error)
  }
}


const getMe = async (req, res, next) => {
  try {
    const { id } = req.user;

    console.log(id)

    const finduser = await authModel.findById(id);

    if (!finduser) {
      throw new NotFoundError("user not found")
    }

    handlerOk(res, 200, finduser, 'user found successfully');

  } catch (error) {
    next(error)
  }
}

module.exports = {
  userRegister,
  verifyUser,
  userLogin,
  userLogout,
  getMe
}
