// pages/api/tenants/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { verifyToken, JwtPayload } from '../../../lib/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const token = req.cookies.token;
  const payload = verifyToken(token || '');

  if (!payload || payload.role !== 'SuperAdmin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const tenant = await prisma.tenant.findUnique({ where: { id: id as string } });
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    return res.status(200).json(tenant);
  }

  if (req.method === 'PUT') {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const tenant = await prisma.tenant.update({
      where: { id: id as string },
      data: { name },
    });

    return res.status(200).json(tenant);
  }

  if (req.method === 'DELETE') {
    await prisma.tenant.delete({ where: { id: id as string } });
    return res.status(204).end();
  }

  res.status(405).json({ message: 'Method not allowed' });
}
