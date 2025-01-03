// pages/api/transactions/index.ts
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
    const { startDate, endDate, minAmount, maxAmount, status } = req.query;
    const filters: any = {};

    if (payload.role === 'TenantAdmin') {
      filters.tenantId = payload.tenantId;
    }

    if (startDate || endDate) {
      filters.date = {};
      if (startDate) {
        filters.date.gte = new Date(startDate as string);
      }
      if (endDate) {
        filters.date.lte = new Date(endDate as string);
      }
    }

    if (minAmount || maxAmount) {
      filters.amount = {};
      if (minAmount) {
        filters.amount.gte = parseFloat(minAmount as string);
      }
      if (maxAmount) {
        filters.amount.lte = parseFloat(maxAmount as string);
      }
    }

    if (status) {
      filters.status = status as string;
    }

    const transactions = await prisma.transaction.findMany({
      where: filters,
    });

    return res.status(200).json(transactions);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
