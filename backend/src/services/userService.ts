import {User} from '../models/user';

import prisma from '../../prisma/prisma-client';


// Create user service
export async function createUser(data: User) {
    return prisma.user.create({
        data: {
            id: data.id,
            email: data.email,
            firstName: data.name,
            lastName: data.lastName,
        },
        // group: { connect: {  id: ''} } need to check this in the future, typescript is not recognizing the id
    });
}

// User getters
export async function getUserByAuth0Id(id: string) {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: {
            id
        }
    });
}

// User deletes
export async function deleteUserById(id: string) {
    return prisma.user.delete({
        where: {
            id
        }
    });
}


// User updates















