import { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/user.controller";
import { Type } from '@sinclair/typebox'

const controller = new UserController();

const UserSchema = Type.Object({
  id: Type.String(),
  fname: Type.String(),
  lname: Type.String(),
  phoneNumber: Type.String(),
  email: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
});

export const QuerySchema = Type.Object({
  skip: Type.Number(),
  take: Type.Number(),
  text: Type.String()
});

export const getAllUsersSchema = {
  schema: {
    queryString: QuerySchema,
    response: {
      200: Type.Array(UserSchema)
    } 
  },
  handler: (req: FastifyRequest, reply: FastifyReply) => {
    return controller.getAllUsers(req, reply);
  }
}

