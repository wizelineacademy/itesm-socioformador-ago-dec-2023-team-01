import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import { CreateConversationInput, Conversation } from './conversationModel';
import { PostResponse } from '../../shared/models/responseModel';
import CustomError from '../../utils/errorModel';

export const conversationRepository = {
  async createConversation(
    conversationInput: CreateConversationInput,
  ): Promise<PostResponse> {
    try {
      const conversation = await prisma.conversation.create({
        data: {
          userId: conversationInput.userId,
          languageId: conversationInput.languageId,
          title: conversationInput.title,
        },
      });
      const newConversation: PostResponse = {
        id: conversation.id,
      };
      return newConversation;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new CustomError(
            400,
            `Invalid user id:${conversationInput.userId} or language id:${conversationInput.languageId}`,
          );
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new CustomError(400, 'Invalid input');
      }
    }
    throw new CustomError(500, 'Internal server error');
  },

  async getConversationById(conversationId: number): Promise<Conversation> {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!conversation) {
      throw new CustomError(
        404,
        `Conversation with id:${conversationId}, not found`,
      );
    }
    const newConversation: Conversation = {
      id: conversation.id,
      title: conversation.title,
      isDeleted: conversation.isDeleted,
      languageId: conversation.languageId,
      userId: conversation.userId,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt ?? new Date(),
      deletedAt: conversation.deletedAt,
    };
    return newConversation;
  },
};

export default conversationRepository;
