/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { createPostDto } from './create-post.dto';

export class updatePostDto extends PartialType(createPostDto) {}
