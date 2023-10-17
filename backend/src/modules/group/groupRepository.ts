import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import {createGroupInput, Group} from "./groupModel";
import CustomError from '../../utils/errorModel';

// eslint-disable-next-line import/prefer-default-export
export const groupRepository = {
    async createGroup(groupInput: createGroupInput) : Promise<Group> {
        try {
            const group = await prisma.group.create({
                data: {
                    name: groupInput.name.toLowerCase(),
                    area: groupInput.area || '',
                },
            });

            return {
                id: group.id,
                name: group.name,
                area: group.area ?? '',
                createdAt: group.createdAt,
                updatedAt: group.updatedAt ?? new Date(),
            };
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
    async deleteGroupByIdOrName(groupIdOrName: string) {
        let group = null;

        if (Number.isNaN(Number(groupIdOrName))) {
            group = await prisma.group.findUnique({
                where: {
                    name: groupIdOrName,
                }
            });
        } else {
            group = await prisma.group.findUnique({
                where:{
                   id: Number(groupIdOrName)
                }
            });
        }
        if (!group) {
            throw new CustomError(
                404,
                `Group with id/name:${groupIdOrName}, not found`
            );
        }

         await prisma.group.update({
            where: Number.isNaN(Number(groupIdOrName))
                ? { name: groupIdOrName }
                : { id: Number(groupIdOrName) },
            data: {
                users: {
                    disconnect: (group as any).users.map((user: any) => ({ id: user.id })),
                },
            },
        });

        await prisma.group.delete({
            where: Number.isNaN(Number(groupIdOrName))
                ? { name: groupIdOrName }
                : { id: Number(groupIdOrName) },
        });

    },
    async addUserToGroupByIdOrName(groupIdOrName: string, userId: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const group = Number.isNaN(Number(groupIdOrName))
            ? await prisma.group.findUnique({ where: { name: groupIdOrName } })
            : await prisma.group.findUnique({ where: { id: Number(groupIdOrName) }});

        if (!user || !group) {
            throw new CustomError(
                404,
                `Group or user with id/name:${groupIdOrName} and ${userId}, not found`
            );
        }

        return prisma.group.update({
            where: Number.isNaN(Number(groupIdOrName))
                ? { name: groupIdOrName }
                : { id: Number(groupIdOrName) },
            data: {
                users: {
                    connect: { id: userId }
                }
            }
        });
    },
    async removeUserFromGroupByIdOrName(userId: string, groupIdOrName: string) {
        const group = Number.isNaN(Number(groupIdOrName))
        ? await prisma.group.findUnique({where: {name: groupIdOrName} })
            : await prisma.group.findUnique({ where: {id: Number(groupIdOrName)} });

        if (!group) {
            throw new CustomError(
                404,
                `Group with id/name ${groupIdOrName} not found`
            );
        }

        await prisma.group.update({
            where: Number.isNaN(Number(groupIdOrName))
                ? { name: groupIdOrName }
                : { id: Number(groupIdOrName) },
            data: {
                users: {
                    disconnect: {id: userId }
                }
            }
        });
    },
    async addAreaToGroupByIdOrName(groupIdOrName: string, area: string) {
        const group = Number.isNaN(Number(groupIdOrName))
            ? await prisma.group.findUnique({where: {name: groupIdOrName} })
            : await prisma.group.findUnique({ where: {id: Number(groupIdOrName)} });

        if (!group) {
            throw new CustomError(
                404,
                `Group with id/name ${groupIdOrName} not found`
            );
        }

        await prisma.group.update({
            where: Number.isNaN(Number(groupIdOrName))
                ? { name: groupIdOrName }
                : { id: Number(groupIdOrName) },
            data: {
                area
            }
        });
    },
    async listAllGroups() : Promise<Array<Group>> {
        const groups = await prisma.group.findMany();
        return groups.map((group) => ({
            id: group.id,
            name: group.name,
            area: group.area ?? '',
            createdAt: group.createdAt,
            updatedAt: group.updatedAt,
        }));
    },
    async findUsersInGroupByIdOrName(groupIdOrName: string) {
        const group = Number.isNaN(Number(groupIdOrName))
            ? await prisma.group.findUnique({where: {name: groupIdOrName} })
            : await prisma.group.findUnique({ where: {id: Number(groupIdOrName)} });

        if (!group) {
            throw new CustomError(
                404,
                `Group with id/name ${groupIdOrName} not found`
            );
        }

        const whereCondition = Number.isNaN(Number(groupIdOrName))
            ? { groups: { some: { name: groupIdOrName } } }
            : { groups: { some: { id: Number(groupIdOrName) } } };

        return prisma.user.findMany({
            where: whereCondition
        });
    }
};