// pages/api/setFreeAccessClaim.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { setFreeAccessClaim } from '../../server/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.AUTHORIZED_UIDS) {
    console.error('AUTHORIZED_UIDS environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (req.method === 'POST') {
    const { uid } = req.body;
    if (!uid) {
      return res.status(400).json({ error: 'UID is required' });
    }

    try {
      const result = await setFreeAccessClaim(uid);
      if (result) {
        res.status(200).json({ message: 'Free access claim set successfully' });
      } else {
        res.status(403).json({ error: 'User not authorized for free access' });
      }
    } catch (error) {
      console.error('Error in setFreeAccessClaim API route:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}