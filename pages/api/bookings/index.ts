// pages/api/bookings/index.ts
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
    const { status } = req.query;
    let bookings;

    if (payload.role === 'SuperAdmin') {
      bookings = await prisma.booking.findMany({
        where: status ? { status: status as string } : undefined,
      });
    } else if (payload.role === 'TenantAdmin') {
      bookings = await prisma.booking.findMany({
        where: { tenantId: payload.tenantId, ...(status ? { status: status as string } : {}) },
      });
    }

    return res.status(200).json(bookings);
  }

  if (req.method === 'POST') {
    if (payload.role !== 'TenantAdmin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { carId, userId, status, date } = req.body;
    if (!carId || !userId || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const booking = await prisma.booking.create({
      data: {
        carId,
        userId,
        tenantId: payload.tenantId,
        status: status || 'pending',
        date: new Date(date),
      },
    });

    return res.status(201).json(booking);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
