import { FastifyReply, FastifyRequest } from "fastify";
import { users } from "../helpers/constants";
import { ParamsSchema, QuerySchema } from "../schema/user.schema";  

class UserController {

  public getAllUsers = async(req: FastifyRequest, reply: FastifyReply) => {
    const { skip, take, text } = req.query as typeof QuerySchema;

    if(text) {
      return users.filter(
        (user) => user.fname == text || 
          user.lname == text || 
          user.email == text || 
          user.phoneNumber == text
      ).slice(skip || 0, take || 5);
    }else {
      return users.slice(skip || 0, take || 5);
    }
  }

  public getUserById = async(req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as typeof ParamsSchema;
    console.log(id);

    return users.filter((user) => user.id == id);
  }

}

export { UserController }
