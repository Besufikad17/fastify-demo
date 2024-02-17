import { FastifyReply, FastifyRequest } from "fastify";

export const getAllUsersSchema = {
  schema: {
    response : {
      200 : {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            fname: { type: 'string' },
            lname: { type: 'string' },
            phoneNumber: { type: 'string' },
            email: { type: 'string' }
          }
        }
      }
    }
  },
  handler: (request: FastifyRequest, reply: FastifyReply) => {
    
  }
}
