import fastify from 'fastify'

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    const server = fastify({
      logger: true
    });

    server.get('/', async (request, reply) => {
      reply.send("Welcome to fastify demo")
    });
    await server.listen(PORT);
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start();
