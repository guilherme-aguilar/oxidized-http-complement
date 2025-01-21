import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { HostService, type HostsCreateInput, type HostsUpdateInput } from '../services/host.service';



export class HostProvider {
  private hostService: HostService;

  constructor() {
    this.hostService = new HostService();
  }

  async create(data: HostsCreateInput, res: FastifyReply) {
    try {
      const hostData = data;
      const newHost = await this.hostService.create(hostData);
      return res.status(201).send(newHost);
    } catch (error) {
      return res.status(500).send({ error: 'Failed to create host' + error });
    }
  }

  async createManyByCSV(data: HostsCreateInput[], res: FastifyReply) {
    try {
      const hostData = data;
      hostData.map(async (host) => {
        await this.hostService.create(host);
      });
      return res.status(201).send(hostData);
    } catch (error) {
      return res.status(500).send({ error: 'Failed to create host' + error });
    }
  }

  async update(data: HostsUpdateInput, res: FastifyReply) {
    try {

      const {id, ...hostData} = data;
      const updatedHost = await this.hostService.update(id, hostData);

      if (!updatedHost) {
        return res.status(404).send({ error: 'Host not found' });
      }

      return res.status(200).send(updatedHost);
    } catch (error) {
      return res.status(500).send({ error: 'Failed to update host' });
    }
  }

  async delete(id: string, res: FastifyReply) {
    try {
      const deletedHost = await this.hostService.delete(id);
      if (!deletedHost) {
        return res.status(404).send({ error: 'Host not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).send({ error: 'Failed to delete host' });
    }
  }

  async findAll(res: FastifyReply) {
    try {
      const hosts = await this.hostService.findAll();
      return res.status(200).send(hosts);
    } catch (error) {
      return res.status(500).send({ error: 'Failed to find hosts' });
    }
  }

  async findById(id: string, res: FastifyReply) {
    try {
      const host = await this.hostService.findById(id);
      if (!host) {
        return res.status(404).send({ error: 'Host not found' });
      }
      return res.status(200).send(host);
    } catch (error) {
      return res.status(500).send({ error: 'Failed to find host' });
    }
  }
}
