import { MongoClient } from 'mongodb';
import { method } from '../../../src/constants';

async function handler(req, res) {
  if (req.method === method.POST) {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address!' })
      return
    }

    const client = await MongoClient.connect('mongodb+srv://serhii3001:aT82hHlTExxS4p5L@cluster0.me33jvi.mongodb.net/newsletter?retryWrites=true&w=majority')
    const db = client.db()

    await db.collection('emails').insertOne({ email: userEmail })

    await client.close()

    res.status(201).json({ message: 'Signed up!' })
  }
}

export default handler;
