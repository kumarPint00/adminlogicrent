// pages/api/analytics/user-activity.ts
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
    const userActivity = await prisma.user.groupBy({
      by: ['email'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    const formatted = userActivity.map((u) => ({
      user: u.email,
      activity: u._count.id,
    }));

    return res.status(200).json(formatted);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
