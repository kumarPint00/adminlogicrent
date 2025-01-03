// pages/api/analytics/bookings.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { verifyToken, JwtPayload } from '../../../lib/jwt';
import { startOfMonth, format } from 'date-fns';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  const payload = verifyToken(token || '');

  if (!payload) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const bookings = await prisma.booking.groupBy({
      by: ['date'],
      _count: {
        date: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    const formatted = bookings.map((b) => ({
      date: format(new Date(b.date), 'yyyy-MM-dd'),
      count: b._count.date,
    }));

    return res.status(200).json(formatted);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
