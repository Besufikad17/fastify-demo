import * as jwt from "jsonwebtoken";

export const generateAccessToken = (data: Object, tokenLife: string | number) => {
  return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: tokenLife });
};

export const verifyToken = (token: string) => {
  console.log(token)
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string, (err, data) => {
      if (err) {
        return null;
      }
      return data;
    });
  } catch (error) {
    return null;
  }
};
