import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';
import { CreatePostEntity } from './interface/post.entity';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async createPost(postData: CreatePostEntity): Promise<Post> {
    try {
      return this.prisma.post.create({
        data: {
          title: postData.title,
          content: postData.content,
          userId: postData.userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async findByID(postId: number): Promise<Post> {
    try {
      const post = this.prisma.post.findUnique({ where: { id: postId } });
      if (!post) {
        throw new NotFoundException(`Post with ID ${postId} not found`);
      }
      return post;
    } catch (error) {
      throw error;
    }
  }
  async updatePost(postId: number, postData: CreatePostEntity): Promise<Post> {
    try {
      const post = await this.prisma.post.update({
        where: { id: postId },
        data: { ...postData },
      });
      if (!post) {
        throw new NotFoundException(`Post with ID ${postId} not found`);
      }

      return post;
    } catch (error) {
      throw error;
    }
  }
  async deletePost(postId: number) {
    try {
      const post = await this.prisma.post.delete({
        where: { id: postId },
      });

      if (!post) {
        throw new NotFoundException(`Post with ID ${postId} not found`);
      }

      return post;
    } catch (error) {
      throw error;
    }
  }
}
