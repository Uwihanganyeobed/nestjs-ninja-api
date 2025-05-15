import { Injectable } from '@nestjs/common';
import { createPostDto } from './dto/create-post.dto';
import { updatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  //array of our testing posts data
  private posts = [
    {
      id: 0,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      pages: 180,
      status: 'published',
    },
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      pages: 281,
      status: 'draft',
    },
    {
      id: 2,
      title: 'The River between Us',
      author: 'Richard Peck',
      pages: 240,
      status: 'published',
    },
  ];

  getPosts(status?: 'published' | 'draft') {
    if (status) {
      return this.posts.filter((post) => post.status === status);
    }
    return this.posts;
  }
  getPost(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      return { message: 'Post not found' };
    }
    return post;
  }
  
  createPost(createPostDto: createPostDto) {
    const newPost = { ...createPostDto, id: Date.now() };
    this.posts.push(newPost);
    return newPost;
  }
  updatePost(id:number, updatePostDto:updatePostDto){
    const newPost = this.posts.find((post) => post.id === id);
    if(!newPost){
      return {message: 'Post not found'}
    }
    const updatedPost = {...newPost, ...updatePostDto}
    return updatedPost;
  }
  deletePost(id:number){
    const removeMe = this.getPost(id);
    this.posts = this.posts.filter((post) => post.id !== id);
    return removeMe;
  }
}
