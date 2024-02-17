import fastify from 'fastify'
import userRouter from './routes/user.routes';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const PORT = 3000;

const start = async () => {
  try {
    const server = fastify({
      logger: true
    }).withTypeProvider<TypeBoxTypeProvider>();

    server.get('/', async (request, reply) => {
      reply.send("Welcome to fastify demo")
    });

    server.register(userRouter, { prefix: '/api/V1' });

    await server.listen({ port: PORT });
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start();
