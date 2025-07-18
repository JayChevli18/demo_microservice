import { AppDataSource } from '../config/db';
import { User } from '../../../../shared/src/models/User';
import axios from 'axios';

export const getUserProfile = async (userId: number) => {
    const user=await AppDataSource.getRepository(User).findOne({ 
        where: { id: userId } 
    });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

export const updateUserProfile = async (userId: number, updatedData: Partial<User>) => {
    const user=await AppDataSource.getRepository(User).findOne({ 
        where: { id: userId } 
    });

    if (!user) {
        throw new Error('User not found');
    }
    Object.assign(user, updatedData);
    await AppDataSource.getRepository(User).save(user);
    return user;
}

export const verifyAuthToken = async (token: string) => {
    try {
        const response=await axios.post(`http://localhost:5000/api/auth/verify-token`, { token });
        return response.data;
    } catch (error) {
        throw new Error('Token verification failed');
    }
}