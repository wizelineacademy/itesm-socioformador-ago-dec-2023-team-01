import { Prisma } from '@prisma/client';
import prisma from '../../../../prisma/prisma-client';
import { CreatePostInput, Post } from './postModel';
import CustomError from '../../../utils/errorModel';

export const postRepository = {
  async createPost(postInput: CreatePostInput): Promise<Post> {
    try {
      const post = await prisma.post.create({
        data: {
          content: postInput.content,
          prompt: postInput.prompt,
          tokenCost: postInput.tokenCost,
          conversationId: postInput.conversationId,
        },
      });
      const newPost: Post = {
        id: post.id,
        content: post.content,
        prompt: post.prompt,
        tokenCost: post.tokenCost,
        conversationId: post.conversationId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt ?? new Date(),
      };
      return newPost;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new CustomError(
            400,
            `Invalid Conversation id:${postInput.conversationId}`,
          );
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new CustomError(400, 'Invalid input');
      }
    }
    throw new CustomError(500, 'Internal server error');
  },

  async getPostsOfConversation(conversationId: number): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const newPosts: Post[] = posts.map(post => ({
      id: post.id,
      content: post.content,
      prompt: post.prompt,
      tokenCost: post.tokenCost,
      conversationId: post.conversationId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt ?? new Date(),
    }));
    return newPosts;
  },
};

export default postRepository;
