// pages/api/analytics/revenue.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { verifyToken, JwtPayload } from '../../../lib/jwt';
import { format } from 'date-fns';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  const payload = verifyToken(token || '');

  if (!payload) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const revenue = await prisma.transaction.groupBy({
      by: ['month'],
      _sum: {
        amount: true,
      },
      orderBy: {
        month: 'asc',
      },
    });

    const formatted = revenue.map((r) => ({
      month: format(new Date(r.month), 'MMMM yyyy'),
      revenue: r._sum.amount || 0,
    }));

    return res.status(200).json(formatted);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
