// reservation/reservation.controller.ts
import { Controller, Get, Post, Body, Patch, Param, HttpException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('reservations')
@ApiTags('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
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
  async checkAvailability(@Body() { vehicleId, startDate, endDate }) {
    const reservation = await this.reservationService.checkAvailability(vehicleId, new Date(startDate), new Date(endDate));
    reservation.length > 0 ? { available: false } : { available: true };
  }
}