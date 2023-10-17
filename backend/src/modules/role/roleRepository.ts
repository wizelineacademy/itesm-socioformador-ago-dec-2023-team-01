import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import { CreateRoleInput, Role } from './roleModel';
import CustomError from '../../utils/errorModel';

export const roleRepository = {
  async createRole(roleInput: CreateRoleInput): Promise<Role> {
    try {
      const role = await prisma.role.create({
        data: {
          name: roleInput.name?.toLowerCase(),
          description: roleInput.description,
        },
      });
      const newRole: Role = {
        id: role.id,
        name: role.name,
        description: role.description ?? '',
        createdAt: role.createdAt,
        updatedAt: role.updatedAt ?? new Date(),
      };
      return newRole;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new CustomError(409, 'Role already exists');
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new CustomError(400, 'Invalid input');
      }
    }
    throw new CustomError(500, 'Internal server error');
  },

  async getRoleByIdOrName(roleIdOrName: string): Promise<Role> {
    let role = null;
    if (Number.isNaN(Number(roleIdOrName))) {
      role = await prisma.role.findUnique({
        where: {
          name: roleIdOrName,
        },
      });
    } else {
      role = await prisma.role.findUnique({
        where: {
          id: Number(roleIdOrName),
        },
      });
    }
    if (!role) {
      throw new CustomError(
        404,
        `Role with id/name:${roleIdOrName}, not found`,
      );
    }
    const newRole: Role = {
      id: role.id,
      name: role.name,
      description: role.description ?? '',
      createdAt: role.createdAt,
      updatedAt: role.updatedAt ?? new Date(),
    };
    return newRole;
  },
};

export default roleRepository;
