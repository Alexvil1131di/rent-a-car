import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaService } from 'src/prisma.service';
import { ClientService } from 'src/client/client.service';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, PrismaService, ClientService, VehicleService],
})
export class ReservationModule { }
