import express from 'express';
import { createUser, getUserByAuth0Id } from '../services/userServices';

const userRouter = express.Router();

userRouter.get('/create', async (req, res) => { 
    try {
        console.info('Creating',req.oidc.user, req.oidc.isAuthenticated());
        if (req.oidc.isAuthenticated()) {
            const authUser = req.oidc.user;
            const user = await getUserByAuth0Id(authUser?.sub);
            if (user !== null) {
                return res.redirect('http://localhost:8080/');
            } if(authUser) {
                await createUser({ idAuth0: authUser.sub, email: authUser.email, name: authUser.given_name, lastName: authUser.family_name, profilePicture: authUser.picture});
                return res.redirect('http://localhost:8080/');
            }
        } else {
            return res.status(401).json({ message: 'User is not authenticated' });
        }
    } catch (error) { 
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }  
});

export default userRouter;