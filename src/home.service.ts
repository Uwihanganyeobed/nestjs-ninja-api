/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {

  getHome(): string {
    return 'Hello Vargas Home!';
  }
}
