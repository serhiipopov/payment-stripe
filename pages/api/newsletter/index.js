import { MongoClient } from 'mongodb';
import { method } from '../../../src/constants';
import { MONGO_URL } from '../../../helpers/mongodb';

async function handler(req, res) {
  if (req.method === method.POST) {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address!' })
      return
    }

    const client = await MongoClient.connect(MONGO_URL)
    const db = client.db()
    await db.collection('newsletter').insertOne({ email: userEmail })
    await client.close()

    res.status(201).json({ message: 'Signed up!' })
  }
}

export default handler;
