const User = require("../models/User");
const bcrypt = require("bcrypt");

const createAdminIfNotExists = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("❌ ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
      return;
    }

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await User.create({
        firstName: "Venkat",
        lastName: "Narasimha",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        isVerified: true,
      });

      console.log("✅ Admin created:", adminEmail);
    } else {
      console.log("ℹ️ Admin already exists:", adminEmail);
    }
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
};

module.exports = createAdminIfNotExists;
