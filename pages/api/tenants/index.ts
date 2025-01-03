// pages/api/tenants/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { verifyToken, JwtPayload } from '../../../lib/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  const payload = verifyToken(token || '');

  if (!payload || payload.role !== 'SuperAdmin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const tenants = await prisma.tenant.findMany();
    return res.status(200).json(tenants);
  }

  if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const tenant = await prisma.tenant.create({
      data: { name },
    });

    return res.status(201).json(tenant);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
