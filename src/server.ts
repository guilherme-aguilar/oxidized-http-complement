import { FastifyInstance, fastify } from 'fastify';
import router from './routes';
import fastifyMultipart from '@fastify/multipart';
import * as dotenv from 'dotenv';

dotenv.config();

const awaitingApiKey = process.env.API_KEY
const applicationPort = process.env.PORT || 3333;

const server = async () => {
  const app = fastify();

  // API Key middleware
  app.addHook('onRequest', async (request, reply) => {
    const apiKey = request.headers['x-api-key'];
    const expectedApiKey = awaitingApiKey?.replace(/"/g, ''); // Remove as aspas

    console.log('apiKey Received:', apiKey);
    console.log('awaitingApiKey:', expectedApiKey);

    if (!apiKey || apiKey !== expectedApiKey) {
      return reply.code(401).send({ 
        error: 'Unauthorized',
        message: 'Invalid or missing API key'
      });
    }
  });
  
  // Register @fastify/multipart to handle file uploads
  app.register(fastifyMultipart);
  
  // Rotas e configurações aqui
  app.register(router);

  await app.listen({ 
    port: Number(applicationPort),
    host: '0.0.0.0'
  });
  console.log(awaitingApiKey)
  console.log(`Servidor rodando em http://localhost:` + applicationPort);
};

server();
