// pages/api/bookings/[id].ts
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

  const booking = await prisma.booking.findUnique({ where: { id: id as string } });
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  // Authorization
  if (payload.role === 'TenantAdmin' && booking.tenantId !== payload.tenantId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(booking);
  }

  if (req.method === 'PUT') {
    if (payload.role !== 'TenantAdmin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { status, date } = req.body;
    const updatedBooking = await prisma.booking.update({
      where: { id: id as string },
      data: { status, date: date ? new Date(date) : undefined },
    });

    return res.status(200).json(updatedBooking);
  }

  if (req.method === 'DELETE') {
    if (payload.role !== 'TenantAdmin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await prisma.booking.delete({ where: { id: id as string } });
    return res.status(204).end();
  }

  res.status(405).json({ message: 'Method not allowed' });
}
