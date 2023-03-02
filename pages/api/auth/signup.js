import { connectDatabase, insertDocument } from '../../../helpers/db-util';
import { hashPassword } from '../../../helpers/auth';
import { method } from '../../../src/constants';

async function handler(req, res) {

  if (req.method === method.POST) {
    const data = req.body;

    const { email, password } = data;

    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
      res.status(422).json({ message: 'Invalid input or password' })
    }

    let client;

    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' })
      return;
    }

    try {
      const hashedPassword = await hashPassword(password)
      await insertDocument(client, 'user', ({ email: email, password: hashedPassword }))
      await client.close()
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' })
      return;
    }

    res.status(201).json({ message: 'Created user' })
  }
}

export default handler;
