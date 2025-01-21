import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface HostsCreateInput {
  name: string;
  address: string;
  port: string;
  username: string;
  password: string;
  type: string;
}

export interface HostsUpdateInput {
  id: string;
  name?: string;
  address?: string;
  port?: string;
  username?: string;
  password?: string;
  type?: string;
}

export class HostService {
  constructor() {}

  async create(data: HostsCreateInput) {
    const host = await prisma.hosts.create({ data });
    return host;
  }

  async findAll() {
    const hosts = await prisma.hosts.findMany();
    return hosts;
  }

  async findById(id: string) {
    const host = await prisma.hosts.findUnique({ where: { id: parseInt(id) } });
    return host;
  }

  async update(id: string, data: Omit<HostsUpdateInput, 'id'>) {
    const host = await prisma.hosts.update({ where: { id: parseInt(id) }, data });
    return host;
  }

  async delete(id: string) {
    const host = await prisma.hosts.delete({ where: { id: parseInt(id) } });
    return host;
  }

  
}