import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env'), debug: true });

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const user = await registerUser(username, email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

export const verifyToken = async (req: Request, res: Response) => {
    const token=req.body.token;
    if(!token){
        return res.status(401).json({ message: 'Unauthorized! Token is required!' });
    }
    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        if(decoded){
            res.status(200).json({valid:true, decoded});
        }else{
            res.status(401).json({ valid: false, message: 'Invalid token' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Token verification failed', error: error.message });
    }
}