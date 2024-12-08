import jwt from "jsonwebtoken";
const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // prevents xss attacks
    secure: process.env.NODE_ENV === "production",
    samesite: "strict", // prevents csrf attack
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  });
  return token;
};

export default generateTokenAndSetCookie;
