import { verifyToken } from "../helpers/jwt";

export const protectRoute = (req: any, res: any, done: any) => {
  const authorization = req.headers["authorization"];
  let token = "";

  if (!authorization)
    return res.status(404).send({ message: "Unauthorized error" });

  if (authorization) {
    token = authorization.split(" ")[1];
  }

  try {
    const user = verifyToken(token);
    if (!user) {
      return res.status(400).send({ message: "Unauthorized user!!" });
    }
    done();
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: err });
  }
}
