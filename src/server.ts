import { FastifyInstance, fastify } from 'fastify';
import router from './routes';
import fastifyMultipart from '@fastify/multipart';
import * as dotenv from 'dotenv';

dotenv.config();

const awaitingApiKey = process.env.API_KEY
const applicationPort = process.env.PORT || 3000;

const server = async () => {
  const app = fastify();

  // API Key middleware
  app.addHook('onRequest', async (request, reply) => {
    const apiKey = request.headers['x-api-key'];
    console.log('apiKey Received:', apiKey);
    console.log('awaitingApiKey:', awaitingApiKey);

    if (!apiKey || apiKey !== awaitingApiKey) {
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

  await app.listen({ port: Number(applicationPort)});
  console.log(awaitingApiKey)
  console.log(`Servidor rodando em http://localhost:` + applicationPort);
};

server();
