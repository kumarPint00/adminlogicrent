// pages/api/cars/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { verifyToken, JwtPayload } from '../../../lib/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const token = req.cookies.token;
  const payload = verifyToken(token || '');

  if (!payload) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const car = await prisma.car.findUnique({ where: { id: id as string } });
  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }

  // Authorization
  if (payload.role === 'TenantAdmin' && car.tenantId !== payload.tenantId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(car);
  }

  if (req.method === 'PUT') {
    if (payload.role !== 'TenantAdmin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { model, otherFields } = req.body;
    const updatedCar = await prisma.car.update({
      where: { id: id as string },
      data: { model, ...otherFields },
    });

    return res.status(200).json(updatedCar);
  }

  if (req.method === 'DELETE') {
    if (payload.role !== 'TenantAdmin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await prisma.car.delete({ where: { id: id as string } });
    return res.status(204).end();
  }

  res.status(405).json({ message: 'Method not allowed' });
}
