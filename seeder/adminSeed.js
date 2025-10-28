const adminModel = require("../model/adminModel");
const { hashPassword } = require("../utils/passwordHashed");

const adminSeed = async () => {
  try {
    const email = "admin@example.com";
    const password = "admin123";

    const existingAdmin = await adminModel.findOne({
      email
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists. Skipping seeding.");
      return;
    }

    const hashedPassword = await hashPassword(password);

    await adminModel.create({
      email,
      password: hashedPassword,
    });

    console.log("✅ Admin seeded successfully.");
  } catch (error) {
    console.log(error);

  }


}

module.exports = adminSeed