import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

// Extend the Express Request interface to include user property
interface AuthenticatedRequest extends Request {
    user?: any;
}

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:5000';
        const response=await axios.post(`${authServiceUrl}/api/auth/verify-token`, { token });
        if(response.data.valid){
            req.user=response.data.decoded;
            next();
        }else{
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Token verification failed', error: error.message });
    }
}