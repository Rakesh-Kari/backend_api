import jwt from "jsonwebtoken";

export const sendCookie = (userID, res, message, statuscode = 200) => {
  const token = jwt.sign({ _id: userID._id }, process.env.JWT_SECRET);

  res
    .status(statuscode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};
