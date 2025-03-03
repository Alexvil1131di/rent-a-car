// client/client.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClientDto } from 'src/client/dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) { }

  private clientSelect = {
    id: true, name: true, lastName: true, email: true, phone: true, createdAt: true, documentId: true,
    reservations: {
      select: { id: true, vehicleId: true, startDate: true, endDate: true, totalCost: true, status: true, createdAt: true },
    },
  };

  public create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({ data: createClientDto, select: this.clientSelect });
  }

  public findAll() {
    return this.prisma.client.findMany({ where: { deletedAt: null }, select: this.clientSelect, take: 200 });
  }

  public findOne(id: number) {
    return this.prisma.client.findUnique({ where: { id, deletedAt: null }, select: this.clientSelect });
  }

  public getClientByDocumentId(documentId: string) {
    return this.prisma.client.findFirst({ where: { documentId, deletedAt: null }, select: this.clientSelect });
  }

}