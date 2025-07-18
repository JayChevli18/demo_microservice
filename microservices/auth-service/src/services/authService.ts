import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/db';
import { User } from '../../../../shared/src/models/User';

export const registerUser = async (username: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    await AppDataSource.getRepository(User).save(user);
    return user;
};

export const loginUser = async (email: string, password: string) => {
    const user = await AppDataSource.getRepository(User).findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
}

