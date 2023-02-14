import { method } from '../../../src/constants';
import { connectDatabase, insertDocument } from '../../../helpers/db';

async function handler(req, res) {

  if (req.method === method.POST) {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address!' })
      return;
    }

    let client;

    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' })
      return;
    }

    try {
      await insertDocument(client, { email: userEmail })
      await client.close()
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' })
      return;
    }

    res.status(201).json({ message: 'Signed up!' })
  }
}

export default handler;
