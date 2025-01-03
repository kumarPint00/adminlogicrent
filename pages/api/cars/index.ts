// pages/api/cars/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { verifyToken, JwtPayload } from '../../../lib/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  const payload = verifyToken(token || '');

  if (!payload) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    let cars;
    if (payload.role === 'SuperAdmin') {
      cars = await prisma.car.findMany();
    } else if (payload.role === 'TenantAdmin') {
      cars = await prisma.car.findMany({ where: { tenantId: payload.tenantId } });
    }
    return res.status(200).json(cars);
  }

  if (req.method === 'POST') {
    if (payload.role !== 'TenantAdmin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { model, otherFields } = req.body;
    if (!model) {
      return res.status(400).json({ message: 'Model is required' });
    }

    const car = await prisma.car.create({
      data: {
        model,
        tenantId: payload.tenantId,
        // Add other fields
      },
    });

    return res.status(201).json(car);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
