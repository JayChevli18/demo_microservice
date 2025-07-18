import { Request, Response } from 'express';
import { getUserProfile, updateUserProfile } from '../services/userService';

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await getUserProfile(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get user profile', error: error.message });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const updatedData = req.body;
        const user = await updateUserProfile(userId, updatedData);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user profile', error: error.message });
    }
}