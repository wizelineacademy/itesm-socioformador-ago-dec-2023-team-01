import { Prisma } from '@prisma/client';
import { Language, CreateLanguageInput } from './languageModel';
import prisma from '../../../prisma/prisma-client';
import CustomError from '../../utils/errorModel';

export const languageRepository = {
  async createLanguage(languageInput: CreateLanguageInput): Promise<Language> {
    try {
      const language = await prisma.language.create({
        data: {
          name: languageInput.name,
        },
      });
      const newLanguage: Language = {
        id: language.id,
        name: language.name,
        createdAt: language.createdAt,
        updatedAt: language.updatedAt ?? new Date(),
      };
      return newLanguage;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new CustomError(409, 'Language already exists');
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new CustomError(400, 'Invalid input');
      }
    }
    throw new CustomError(500, 'Internal server error');
  },

  async getLanguages(): Promise<Language[]> {
    const languages = await prisma.language.findMany();
    const newLanguages: Language[] = languages.map(language => ({
      id: language.id,
      name: language.name,
      createdAt: language.createdAt,
      updatedAt: language.updatedAt ?? new Date(),
    }));
    return newLanguages;
  },
};

export default languageRepository;
