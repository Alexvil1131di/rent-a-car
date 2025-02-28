// client/client.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClientDto } from 'src/client/dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) { }

  private clientSelect = {
    id: true, name: true, email: true, phone: true, createdAt: true,
    reservations: {
      select: { id: true, vehicleId: true, startDate: true, endDate: true, totalCost: true, status: true, createdAt: true },
    },
  };

  create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({ data: createClientDto, select: this.clientSelect });
  }

  findAll() {
    return this.prisma.client.findMany({ where: { deletedAt: null }, select: this.clientSelect, take: 200 });
  }

  findOne(id: number) {
    return this.prisma.client.findUnique({ where: { id, deletedAt: null }, select: this.clientSelect });
  }

}