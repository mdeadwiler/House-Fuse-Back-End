const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assign decoded payload to req.user
    req.user = decoded;

    // Call next() to invoke the next middleware function
    next();
  } catch (error) {
    // If errors, send back a 401 'Invalid token.' error
    res.status(401).json({ error: "Invalid token." });
  }
}

module.exports = verifyToken;
