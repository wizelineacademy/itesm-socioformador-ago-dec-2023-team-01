
import { User } from '../models/user';

import prisma from '../../prisma/prisma-client';



export async function createUser(data: User) {
    const user = await prisma.user.create({
        data: {
            idAuth0: data.idAuth0,
            email: data.email,
            name: data.name,
            lastName: data.lastName,
            profilePicture: data.profilePicture,
        },
        // groups: { connect: {  id: ''} } need to check this in the future, typescript is not recognizing the id
    });
    return user;
}

export async function getUserByAuth0Id(idAuth0: string) {
    const user = await prisma.user.findUnique({
        where: {
            idAuth0,
        },
    });
    return user;
}





