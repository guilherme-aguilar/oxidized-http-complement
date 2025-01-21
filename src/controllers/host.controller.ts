import { FastifyReply, FastifyRequest } from 'fastify'
import type { HostProvider } from '../providers/host.provider'
import type { HostsCreateInput, HostsUpdateInput } from '../services/host.service'

export class HostController {
  constructor(private hostProvider: HostProvider) { }

  async create(request: FastifyRequest, reply: FastifyReply) {

    const { address, name, password, port, type, username } = request.body as HostsCreateInput
    return await this.hostProvider.create({
      address,
      name,
      password,
      port,
      type,
      username,
    },
      reply)
  }
  
  async createManyByCSV(request: FastifyRequest, reply: FastifyReply) {
    const file = await request.file()
    const csvContent = await file.toBuffer()
    const data = csvContent.toString()
    
    const rows = data.split('\n').slice(0) // Remove header
    const hosts = rows.map(row => {
      const [name, address, port, factory, model, version, type, username, password, ] = row.split(',')
      return {
        name: name.trim(),
        address: address.trim(),
        port: port.trim(),
        username: username.trim(),
        password: password.trim(),
        type: type.trim()
      }
    })

    return await this.hostProvider.createManyByCSV(hosts, reply)
  }
  async findAll(request: FastifyRequest, reply: FastifyReply) {
    return await this.hostProvider.findAll(reply)
  }

  async findOne(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    return await this.hostProvider.findById(id, reply)
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    const { address, name, password, port, type, username } = request.body as Omit<HostsUpdateInput, 'id'>
    return await this.hostProvider.update({
      id,
      address,
      name,
      password,
      port,
      type,
      username
    }, reply)
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    return await this.hostProvider.delete(id, reply)
  }
}
