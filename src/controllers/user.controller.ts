import { FastifyReply, FastifyRequest } from "fastify";
import { getEmailHtml, users } from "../helpers/constants";
import { GetTokenRequestBodySchema, ParamsSchema, QuerySchema, VerificationRequestBodySchema } from "../schema/user.schema";
import { MailService } from "../helpers/nodemailer";
import { generateAccessToken } from "../helpers/jwt";

class UserController {

  mailService: MailService;

  constructor() {
    this.mailService = new MailService();
  }

  public getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    const { skip, take, text } = req.query as typeof QuerySchema;

    if (text) {
      return users.filter(
        (user) => user.fname == text ||
          user.lname == text ||
          user.email == text ||
          user.phoneNumber == text
      ).slice(skip || 0, take || 5);
    } else {
      return reply.send({ message: "users fetched", data: users.slice(skip || 0, take || 5) });
    }
  }

  public getUserById = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as typeof ParamsSchema;
    console.log(id);

    return users.filter((user) => user.id == id);
  }

  public getVerificationCode = async (req: FastifyRequest, reply: FastifyReply) => {
    const { email, type } = req.body as typeof VerificationRequestBodySchema;
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    try {
      console.log(email, type);
      await this.mailService.sendEmailVerificationCode(email, type as string == "VERIFICATION" ? "Email Verification" : "Password Reset Verification", type);
      reply.send(getEmailHtml(type, verificationCode));
    } catch (error) {
      throw error
    }
  }

  public getToken = async (req: FastifyRequest, reply: FastifyReply) => {
    const { email } = req.body as typeof GetTokenRequestBodySchema;

    try {
      const token = generateAccessToken({ email }, '1h');
      return reply.status(200).send({
        message: "token generated",
        data: {
          token: token
        }
      })
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: "Internal server error", error })
    }
  }

}

export { UserController }
