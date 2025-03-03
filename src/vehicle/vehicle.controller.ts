import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto, VehicleFiltersDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('vehicles')
@ApiTags('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    const vehicle = await this.vehicleService.findOneByLicensePlate(createVehicleDto.licensePlate);
    if (vehicle) throw new HttpException('Vehicle already exists', 409);
    return await this.vehicleService.create(createVehicleDto);
  }

  @Get()
  async findAll() {
    return await this.vehicleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vehicle = await this.vehicleService.findOne(+id);
    if (!vehicle) throw new HttpException('Vehicle not found', 404);
    return vehicle
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.vehicleService.findOne(+id);
    if (!vehicle) throw new HttpException('Vehicle not found', 404);
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const vehicle = await this.vehicleService.findOne(+id);
    if (!vehicle) throw new HttpException('Vehicle not found', 404);
    const deleted = this.vehicleService.remove(+id);
    if (!deleted) throw new HttpException('Vehicle not deleted', 404);
    return "Vehicle deleted";
  }

  @Get('search')
  async search(@Query() filters: VehicleFiltersDto) {
    return await this.vehicleService.search(filters);
  }
}
