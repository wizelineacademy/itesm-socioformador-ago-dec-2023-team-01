import express from 'express';
// import { Request, Response } from 'express';
// import { createUser, getUserByAuth0Id } from '../services/userServices';
const userRouter = express.Router();

userRouter.get('/create', async (req, res) => { 
    
    try {
        console.log(req.oidc);
        // if (req.oidc.isAuthenticated()) {
        //     const authUser = req.oidc.user;
        //     const user = await getUserByAuth0Id(authUser?.sub);
        //     if (user !== null) {
        //         res.status(409).json({ message: 'User already exists in database' });
        //     } else if(authUser) {
        //         await createUser({ idAuth0: authUser.sub, email: authUser.email, name: authUser.given_name, lastName: authUser.family_name });
        //         res.status(201).json({ message: 'User created successfully' }); 
        //     }
        // } else {
        //     res.status(401).json({ message: 'User is not authenticated' });
        // }
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) { 
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default userRouter;