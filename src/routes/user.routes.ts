import { FastifyInstance } from "fastify";
import { getUserById, getAllUsersSchema } from "../schema/user.schema";

const userRouter = async(fastify: FastifyInstance) => {

  fastify.get('/users', getAllUsersSchema);

  fastify.get('/user/:id', getUserById);

}

export default userRouter;
