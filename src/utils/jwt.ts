import jwt from "jsonwebtoken";

export const generateJWT = (userId: string): string => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
