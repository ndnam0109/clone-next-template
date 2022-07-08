import { prisma } from "../../../../lib/prisma";
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    const {firstName, lastName, address, city, state} = req.body
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
  try {
    const userSearch = await prisma.userSearch.create({
        data: {
            firstName: firstName, 
            lastName: lastName, 
            address: address,
            city: city,
            state: state,
            userId: user.id,
          },
    });
    res.status(200).json(userSearch)
  } catch (error) {
    res.status(400).json(error.message);
  }
}
