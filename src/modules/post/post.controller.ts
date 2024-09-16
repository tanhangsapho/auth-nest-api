import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostEntity } from './interface/post.entity';
import { AuthGuard } from '../common/guard/jwt.guard';

@Controller('post')
export class PostController {
  constructor(private readonly _postService: PostService) {}
  @Post('')
  @UseGuards(AuthGuard)
  async createPost(@Body() createPost: CreatePostEntity, @Req() req: any) {
    try {
      const userId = req.user.sub;
      return await this._postService.createPost({
        ...createPost,
        userId,
      });
    } catch (error) {
      throw error;
    }
  }
  @Get('/:id')
  async findById(@Param('id') id: string) {
    try {
      return await this._postService.findByID(id);
    } catch (error) {
      throw error;
    }
  }
  @Patch('/:id')
  @UseGuards(AuthGuard)
  async updatePost(
    @Param('id') id: string,
    @Body() updatePost: CreatePostEntity,
  ) {
    try {
      return await this._postService.updatePost(id, updatePost);
    } catch (error) {
      throw error;
    }
  }
  @Delete('/:id')
  @UseGuards(AuthGuard) // Protect the route
  async deletePost(@Param('id') id: string) {
    try {
      await this._postService.deletePost(id);
      return;
    } catch (error) {
      throw error;
    }
  }
}
