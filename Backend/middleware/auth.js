const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function protect(req, res, next) {
  try {
    let token;

    // Check for Bearer token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user (without password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // attach logged-in user to request
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
}
function adminOnly(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ success: false, message: "Admin access only" });
  }
}
function doctorOnly(req, res, next) {
  if (req.user && req.user.role === "doctor") return next();
  return res.status(403).json({ success: false, message: "Doctor access only" });
}

module.exports = { protect, adminOnly, doctorOnly };