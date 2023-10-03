
import { PrismaClient } from '@prisma/client';
import { User } from '../models/user';
const prisma = new PrismaClient();



export async function createUser(data: User) {
    const user = await prisma.user.create({
        data: {
            idAuth0: data.idAuth0,
            email: data.email,
            name: data.name,
            lastName: data.lastName,
        },
    });
    return user;
}

