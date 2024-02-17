import fastify from 'fastify'
import userRouter from './routes/user.routes';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

const PORT = 3000;
const swaggerOptions = {
  swagger: {
    info: {
      title: "fastify-demo API",
      description: "OpenAPI style documentation for fastify-demo API.",
      version: "1.0.0",
    },
    host: "localhost",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "Default", description: "Default" }],
  },
};

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};

const start = async () => {
  try {
    const server = fastify({
      logger: true
    }).withTypeProvider<TypeBoxTypeProvider>();

    server.get('/', async (request, reply) => {
      reply.send("Welcome to fastify demo")
    });

    server.register(fastifySwagger, swaggerOptions);
    server.register(fastifySwaggerUI, swaggerUiOptions); 
    server.register(userRouter, { prefix: '/api/V1' });

    await server.listen({ port: PORT });
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start();
