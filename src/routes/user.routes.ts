import { FastifyPluginCallback } from "fastify";
import { getAllUsersSchema, getTokenSchema, getUserByIdSchema, getVerificationCodeSchema } from "../schema/user.schema";
import { UserController } from "../controllers/user.controller";
import { protectRoute } from "../middleware/auth";

const userController = new UserController();

const userRouter: FastifyPluginCallback = (fastify, options, done) => {

  fastify.get('/users', { schema: getAllUsersSchema, preHandler: protectRoute }, userController.getAllUsers);

  fastify.get('/user/:id', { schema: getUserByIdSchema }, userController.getUserById);

  fastify.post('/auth/code', { schema: getVerificationCodeSchema }, userController.getVerificationCode);

  fastify.post('/token', { schema: getTokenSchema }, userController.getToken);

  done();
}

export default userRouter;
