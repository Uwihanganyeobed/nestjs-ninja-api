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
  ValidationPipe,
} from '@nestjs/common';
import { createPostDto } from './dto/create-post.dto';
import { updatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

//Decorators are used to define the routes and HTTP methods for the controller
/*
@Param(id)
@Body()
@Query()
@Headers()
@Session()
*/
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  //GET Posts
  @Get('/')
  getPosts(@Query('status') status: 'published' | 'draft') {
    try {
      return this.postsService.getPosts(status);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  //GET Posts by Id
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.postsService.getPost(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  //POST Posts
  @Post('/')
  createPost(@Body(new ValidationPipe()) createPostDto) {
    try {
      return this.postsService.createPost(createPostDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  //PUT Posts
  @Put(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: updatePostDto) {
    try {
      return this.postsService.updatePost(+id, updatePostDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  //DELETE Posts
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    try {
      return this.postsService.deletePost(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
