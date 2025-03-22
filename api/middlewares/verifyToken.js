import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      status: false,
      messaage: "Unothorized - No token found",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({
        status: false,
        messaage: "Unothorized - Invalid token",
      });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("error in verifyToken");
    res.status(400).json({ success: false, message: error.message });
  }
};
