import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token;

    // 1. Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // 2. Extract token
      token = req.headers.authorization.split(" ")[1];
    }

    // 3. If no token
    if (!token) {
      return res.status(401).json({
        error: "Not authorized, no token"
      });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach user info to request
    req.user = decoded;
    console.log(req.user.id); // Log user ID for debugging
    // 6. Continue
    
    next();

  } catch (error) {
    return res.status(401).json({
      error: "Not authorized, token failed"
    });
  }
};