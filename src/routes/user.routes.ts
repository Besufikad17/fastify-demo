import { FastifyInstance } from "fastify";
import { getAllUsersSchema } from "../schema/user.schema";

const userRouter = async(fastify: FastifyInstance) => {

  fastify.get('/users', getAllUsersSchema); 

}

export default userRouter;
