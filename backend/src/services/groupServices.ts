
import prisma from '../../prisma/prisma-client';


export async function createGroup(name: string) {
    const group = await prisma.group.create({
        data: {
            name,
        }
    });
    return group;
}

export async function deleteGroup(id: string) {
    const group = await prisma.group.delete({
        where: {
            id,
        }
    });
    return group;
}