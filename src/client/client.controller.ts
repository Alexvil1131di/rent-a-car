import { Controller, Get, Post, Body, Param, HttpException } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('clients')
@ApiTags('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    const client = await this.clientService.getClientByDocumentId(createClientDto.documentId);
    if (client) throw new HttpException('Client already exists', 409);
    return await this.clientService.create(createClientDto);
  }

  @Get()
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientService.findOne(+id);
    if (!client) throw new HttpException('Client not found', 404);
    return client
  }

}
