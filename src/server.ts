import { FastifyInstance, fastify } from 'fastify';
import router from './routes';
import fastifyMultipart from '@fastify/multipart';


const server = async () => {
  const app = fastify();

  // API Key middleware
  app.addHook('onRequest', async (request, reply) => {
    const apiKey = request.headers['x-api-key'];
    
    if (!apiKey || apiKey !== process.env.API_KEY) {
      reply.code(401).send({ 
        error: 'Unauthorized',
        message: 'Invalid or missing API key'
      });
    }
  });
  
  // Register @fastify/multipart to handle file uploads
  app.register(fastifyMultipart);
  
  // Rotas e configurações aqui
  app.register(router);

  await app.listen({ port: 3000 });
  console.log(`Servidor rodando em http://localhost:3000`);
};

server();
