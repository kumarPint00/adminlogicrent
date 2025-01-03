// lib/jwt.ts
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  role: 'SuperAdmin' | 'TenantAdmin';
}

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch (error) {
    return null;
  }
};
