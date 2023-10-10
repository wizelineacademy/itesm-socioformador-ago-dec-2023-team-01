import express from 'express';
import {createGroup, listAllGroups} from "../services/groupService";

const groupRouter = express.Router();

groupRouter.post('/create' , async (req, res) => {
    try {
        const {name, area} = req.body;
        await createGroup(name, area);
        return res.status(200).json({ message: 'Group created successfully' });
    } catch (e) {
        return res.status(500).json({ message: e });
    }
});

groupRouter.get('/getAllGroups', async (_, res) => {
    try {
        const groups = await listAllGroups();
        return res.status(201).send(groups);
    } catch (e) {
        return res.status(500).json({ message: e });
    }
});
export default groupRouter;