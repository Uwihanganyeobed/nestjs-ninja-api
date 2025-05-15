/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { Validator } from 'class-validator';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  //GET /ninjas?type=fast --->[] (weapon: 'Shuriken')
  @Get('')
  getNinjas(@Query('weapon') weapon: 'Shuriken' | 'Kunai' | 'Katana') {
    return this.ninjasService.getNinjas(weapon);
  }
  //GET /ninjas/:id
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  //POST /ninjas
  @Post('')
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) CreateNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(CreateNinjaDto);
  }
  //PUT /ninjas/:id
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() UpdateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, UpdateNinjaDto);
  }

  //DELETE /ninjas/:id
  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjasService.removeNinja(+id);
  }
}
