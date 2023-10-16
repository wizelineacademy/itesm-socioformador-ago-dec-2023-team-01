import prisma from '../../../prisma/prisma-client';

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
export async function deleteGroupById(id: number) {
    const group = await prisma.group.findUnique({
        where: {
            id,
        },
        include: {
            users: true,
        },
    });
    if (group) {
        await prisma.group.update({
            where: {
                id,
            },
            data: {
                users: {
                    disconnect: group.users.map((user) => ({ id: user.id })),
                },
            },
        });
    }
    return prisma.group.delete({
        where: {
            id,
        }
    });
}



export async function deleteGroupByName(name: string) {
    const group = await prisma.group.findUnique({
        where: {
            name,
        },
        include: {
            users: true,
        },
    });
    if (group) {
        await prisma.group.update({
            where: {
                name,
            },
            data: {
                users: {
                    disconnect: group.users.map((user) => ({ id: user.id })),
                },
            },
        });
    }
    return prisma.group.delete({
        where: {
            name,
        }
    });
}

// Updates
export async function addUserToGroupById(id: string, groupId: number) {

    const user = await prisma.user.findUnique({where: {id}});
    const group = await prisma.group.findUnique({where: {id: groupId}});
    if (!user || !group) {
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
}

export async function removeUserFromGroupById(userId: string, groupId: number) {
    return prisma.group.update({
        where: {id: groupId},
        data: {
            users: {
                disconnect: {id: userId}
            }
        }
    });
}

export async function removeUserFromGroupByName(userId:string, name: string) {
    return prisma.group.update({
        where: {name},
        data: {
            users: {
                disconnect:{id: userId}
            }
        }
    });
}

export async function addAreaToGroupById(area: string, id: number) {
    return prisma.group.update({
        where: {id},
        data: {
            area
        }
    });
}

export async function addAreaToGroupByName(area: string, name: string) {
    return prisma.group.update({
        where: {name},
        data: {
            area
        }
    });
}

// Finds
export async function findUsersInGroupById(groupId: number) {
    return prisma.user.findMany({
        where: {
            groups: {
                some: {
                    id: groupId
                },
            },
        },
    });
}

export async function listAllGroups() {
    return prisma.group.findMany();
}