import { FastifyReply, FastifyRequest } from "fastify";
import { users } from "../helpers/constants";

class UserController {

  public getAllUsers = async(req: FastifyRequest, reply: FastifyReply) => {
    return reply.send(users); 
  }

}

export { UserController }