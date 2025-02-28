import { Controller, Get, Post, Body, Param, HttpException } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('clients')
@ApiTags('auth')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const client = this.clientService.findOne(+id);
    if (!client) throw new HttpException('Client not found', 404);
    return client
  }

}
