import prisma from '../../prisma/prisma-client';


// Create group
export async function createGroup(name: string, area: string) {
    return prisma.group.create({
        data: {
            name,
            area,
        }
    });
}

// Delete Group
export async function deleteGroup(id: number) {
    return prisma.group.delete({
        where: {
            id,
        }
    });
}

// Updates
export async function addUserToGroupById(id: string, groupId: number) {
    try {
        const user = await prisma.user.findUnique({where: {id}});
        const group = await prisma.group.findUnique({where: {id: groupId}});
        if (!user || !group) {
            console.info('user not found');
            return;
        }
        // eslint-disable-next-line consistent-return
        return prisma.group.update({
            where: {id: groupId},
            data: {
                users: {
                    connect: {id}
                }
            }
        });
    } catch (e) {
        console.info('Error', e);
        throw e;
    }
}

export async function removeUserFromGroup(userId: string, groupId: number) {
    return prisma.group.update({
        where: {id: groupId},
        data: {
            users: {
                disconnect: {id: userId}
            }
        }
    });
}