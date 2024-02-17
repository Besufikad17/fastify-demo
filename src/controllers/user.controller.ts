import { FastifyReply, FastifyRequest } from "fastify";
import { users } from "../helpers/constants";
import { QuerySchema } from "../schema/user.schema";  

class UserController {

  public getAllUsers = async(req: FastifyRequest, reply: FastifyReply) => {
    const { skip, take, text } = req.query as typeof QuerySchema;
    
    return users.filter(
      (user) => user.fname == text || 
        user.lname == text || 
        user.email == text || 
        user.phoneNumber == text
    ).slice(skip || 0, take || 5); 
  }

}

export { UserController }
