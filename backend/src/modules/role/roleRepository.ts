import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import { CreateRoleInput, Role } from './roleModel';
import CustomError from '../../utils/errorModel';
import { PostResponse } from '../../shared/models/responseModel';

export const roleRepository = {
  async createRole(roleInput: CreateRoleInput): Promise<PostResponse> {
    try {
      const role = await prisma.role.create({
        data: {
          name: roleInput.name?.toLowerCase(),
          description: roleInput.description,
        },
      });
      const newRole: PostResponse = {
        id: role.id,
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

  async getRoleById(roleId: number): Promise<Role> {
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new CustomError(404, `Role with id:${roleId}, not found`);
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

  async getRoleByName(roleName: string): Promise<Role> {
    const role = await prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      throw new CustomError(404, `Role with name:${roleName}, not found`);
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

  async getRoles(): Promise<Role[]> {
    const roles = await prisma.role.findMany();
    const newRoles: Role[] = roles.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description ?? '',
      createdAt: role.createdAt,
      updatedAt: role.updatedAt ?? new Date(),
    }));
    return newRoles;
  },
};

export default roleRepository;
