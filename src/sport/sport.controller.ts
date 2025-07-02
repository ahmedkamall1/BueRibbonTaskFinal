import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SportService } from './sport.service';
import { CreateSportDto } from './dto/create-sport.dto';

@Controller('sports')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Post()
  create(@Body() dto: CreateSportDto) {
    return this.sportService.create(dto);
  }

  @Get()
  findAll() {
    return this.sportService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateSportDto) {
    return this.sportService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportService.remove(+id);
  }
}
