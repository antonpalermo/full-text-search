import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await prisma.user.findMany()
    return res.status(200).json(result)
  } catch (e) {
    return res.status(500).json(e.message)
  }
}
