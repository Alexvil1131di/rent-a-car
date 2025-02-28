import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('vehicles')
@ApiTags('auth')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const vehicle = this.vehicleService.findOne(+id);
    if (!vehicle) throw new HttpException('Vehicle not found', 404);
    return vehicle
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    const vehicle = this.vehicleService.findOne(+id);
    if (!vehicle) throw new HttpException('Vehicle not found', 404);
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const vehicle = this.vehicleService.findOne(+id);
    if (!vehicle) throw new HttpException('Vehicle not found', 404);
    const deleted = this.vehicleService.remove(+id);
    if (!deleted) throw new HttpException('Vehicle not deleted', 404);
    return "Vehicle deleted";
  }

  @Get('search')
  search(@Query() filters: any) {
    return this.vehicleService.search(filters);
  }
}
