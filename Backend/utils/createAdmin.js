const User = require("../models/User");

const createAdminIfNotExists = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) return;

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        firstName: "Venkat",
        lastName: "Narasimha",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
        isVerified: true,
      });

      console.log("Admin created:", adminEmail);
    }
  } catch (err) {
    console.error("Error creating admin:", err);
  }
};

module.exports = createAdminIfNotExists;
