import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query.keyword as string

  const result = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: { search: query.replace(/[\s\n\t]/g, '_') },
          email: { search: query.replace(/[\s\n\t]/g, '_') }
        }
      ]
    },
    select: {
      name: true,
      email: true
    }
  })

  if (!result) {
    return res.status(404).json({ message: 'Requested data is not available' })
  }

  return res.status(200).json(result)
}
