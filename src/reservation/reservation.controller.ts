// reservation/reservation.controller.ts
import { Controller, Get, Post, Body, Patch, Param, HttpException, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from 'src/client/client.service';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Controller('reservations')
@ApiTags('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService, private readonly clientService: ClientService, private readonly vehicleService: VehicleService) { }

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto,) {
    const vehicle = await this.vehicleService.findOne(createReservationDto.vehicleId);
    if (!vehicle) { throw new HttpException('Vehicle not found', 404); }
    const client = await this.clientService.findOne(createReservationDto.clientId);
    if (!client) { throw new HttpException('Client not found', 404); }
    const reservations = await this.reservationService.checkAvailability(createReservationDto.vehicleId, new Date(createReservationDto.startDate), new Date(createReservationDto.endDate));
    if (reservations.length > 0) { throw new HttpException('vehicle is not available ', 404); }
    return await this.reservationService.create(createReservationDto);
  }

  @Get()
  async findAll() {
    return await this.reservationService.findAll();
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const reservation = await this.reservationService.findOne(+id);
    if (!reservation) throw new HttpException('Reservation not found', 404);
    return await this.reservationService.updateStatus(+id, status);
  }

  @Get('check-availability')
  async checkAvailability(@Query() { vehicleId, startDate, endDate, status }) {
    console.log(vehicleId)
    const reservation = await this.reservationService.checkAvailability(vehicleId, startDate, endDate, status);
    return reservation;
  }
}