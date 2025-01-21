import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { HostController } from './controllers/host.controller';
import { HostProvider } from './providers/host.provider';

const router = async (app: FastifyInstance) => {

  const hostProvider = new HostProvider();
  const hostController = new HostController(hostProvider);
  // Create host
  app.post('/', async (req: FastifyRequest, res: FastifyReply) => {
    await hostController.create(req, res)
  });

  // create many hosts by csv
  app.post('/csv', async (req: FastifyRequest, res: FastifyReply) => {
    await hostController.createManyByCSV(req, res);
  });

  // Update host
  app.put('/:id', async (req: FastifyRequest, res: FastifyReply) => {
    await hostController.update(req, res);
  });

  // Get all hosts
  app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    await hostController.findAll(req, res)
  });

  // Get host by id
  app.get('/:id', async (req: FastifyRequest, res: FastifyReply) => {
    await hostController.findOne(req, res)
  });

  // Delete host
  app.delete('/:id', async (req: FastifyRequest, res: FastifyReply) => {
    await hostController.delete(req, res)
  });
};

export default router;
