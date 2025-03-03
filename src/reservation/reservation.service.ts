import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationStatus } from 'src/enums/enums';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) { }

  private reservationSelect = {
    id: true, startDate: true, endDate: true, totalCost: true, status: true,
    vehicle: { select: { id: true, brand: true, model: true, year: true } },
    client: { select: { id: true, name: true, email: true } },
  };

  public async create(createReservationDto: CreateReservationDto) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: createReservationDto.vehicleId },
    });

    const startDate = new Date(createReservationDto.startDate);
    const endDate = new Date(createReservationDto.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const totalCost = (vehicle.dailyPrice.toNumber() * days).toFixed(2);

    return this.prisma.reservation.create({
      data: {
        ...createReservationDto,
        totalCost,
        startDate,
        endDate,
        status: ReservationStatus.CONFIRMED,
      },
    });
  }

  public findAll() {
    return this.prisma.reservation.findMany({ where: { deletedAt: null }, take: 200, select: this.reservationSelect });
  }

  public findOne(id: number) {
    return this.prisma.reservation.findUnique({ where: { id, deletedAt: null }, select: this.reservationSelect });
  }

  public updateStatus(id: number, status: string) {
    return this.prisma.reservation.update({
      where: { id },
      data: { status },
      select: this.reservationSelect
    });
  }

  public checkAvailability(vehicleId?: number, startDate?: Date, endDate?: Date, status?: ReservationStatus) {

    const whereClause: any = { deletedAt: null };

    if (vehicleId) whereClause.vehicleId = Number(vehicleId);
    if (startDate) whereClause.startDate = { lte: new Date(endDate) };
    if (endDate) whereClause.endDate = { gte: new Date(startDate) };
    if (status) whereClause.status = status;

    return this.prisma.reservation.findMany({
      where: whereClause,
      select: this.reservationSelect
    });
  }
}
