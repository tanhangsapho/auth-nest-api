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
      return this._postService.createPost({
        ...createPost,
        userId,
      });
    } catch (error) {
      throw error;
    }
  }
  @Get('/:id')
  async findById(@Param('id') id: number) {
    try {
      return this._postService.findByID(id);
    } catch (error) {
      throw error;
    }
  }
  @Patch('/:id')
  @UseGuards(AuthGuard)
  async updatePost(
    @Param('id') id: number,
    @Body() updatePost: CreatePostEntity,
  ) {
    try {
      return this._postService.updatePost(id, updatePost);
    } catch (error) {
      throw error;
    }
  }
  @Delete('/:id')
  @UseGuards(AuthGuard) // Protect the route
  async deletePost(@Param('id') id: number) {
    return this._postService.deletePost(id);
  }
}
