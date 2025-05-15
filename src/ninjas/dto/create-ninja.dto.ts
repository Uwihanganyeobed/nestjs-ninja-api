import { IsEnum, MaxLength, MinLength } from "class-validator";

export class CreateNinjaDto {
    @MinLength(3)
    name: string;
    age: number;
    rank: string;
    @IsEnum(['Shuriken', 'Kunai', 'Katana'],{message: `Invalid weapon type use one of these ${['Shuriken', 'Kunai', 'Katana']}`})
    weapon: 'Shuriken' | 'Kunai' | 'Katana';

}
