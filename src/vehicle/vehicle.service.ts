// vehicle/vehicle.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) { }

  private VehicleSelect = {
    id: true, brand: true, model: true, year: true, licensePlate: true, status: true, dailyPrice: true, createdAt: true,
    reservations: {
      select: { id: true, clientId: true, startDate: true, endDate: true, totalCost: true, status: true, createdAt: true },
    },
  };

  public async create(createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: createVehicleDto,
    });
  }

  public findAll() {
    return this.prisma.vehicle.findMany({
      where: { deletedAt: null },
      select: this.VehicleSelect,
      take: 200
    });
  }

  public findOne(id: number) {
    return this.prisma.vehicle.findUnique({
      where: { id, deletedAt: null },
      select: this.VehicleSelect
    });
  }

  public update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  public remove(id: number) {
    return this.prisma.vehicle.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  public search(filters: { brand?: string; model?: string; year?: number; status?: string }) {
    return this.prisma.vehicle.findMany({ where: { ...filters, deletedAt: null } });
  }

}