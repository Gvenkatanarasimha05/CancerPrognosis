const User = require("../models/User");

const createAdminIfNotExists = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("❌ ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
      return;
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        firstName: "Venkat",
        lastName: "Narasimha",
        email: adminEmail,
        password: adminPassword, // plain password -> will be hashed by pre-save hook
        role: "admin",
        isVerified: true,
      });

      console.log("✅ Admin created:", adminEmail);
    } 
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
};

module.exports = createAdminIfNotExists;
