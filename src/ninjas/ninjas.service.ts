import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'Ninja', age: 25, rank: 'Genin', weapon: 'Shuriken' },
    { id: 1, name: 'Ninja2', age: 30, rank: 'Chunin', weapon: 'Kunai' },
    { id: 2, name: 'Ninja3', age: 35, rank: 'Jonin', weapon: 'Katana' },
  ];
  getNinjas(weapon?: 'Shuriken' | 'Kunai' | 'Katana') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }
  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('Ninja not found');
    }
    return ninja;
  }
  createNinja(createNinjaDto:CreateNinjaDto) {
    const newNinja = {
        ...createNinjaDto,
        id: Date.now(),
    };
    this.ninjas.push(newNinja);
    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
        if (ninja.id === id) {
            return {
                ...ninja,
                ...updateNinjaDto,
            };
        }
            return ninja;

    })
    return this.getNinja(id);
  } 

  removeNinja(id: number) {
    const toBeRemoved = this.getNinja(id);
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);
    return toBeRemoved;
  }
}
