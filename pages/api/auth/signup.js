import { connectDatabase, findOneValue, insertDocument } from '../../../helpers/db-util';
import { hashPassword } from '../../../helpers/auth';
import { method } from '../../../src/constants';

async function handler(req, res) {
  if (req.method !== method.POST) {
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (!email || !email.includes('@') || !password || password.trim().length < 7) {
    res.status(422).json({ message: 'Invalid input or password' })
    return;
  }

  let client;

  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' })
    return;
  }

  const existingUser = await findOneValue(client, 'users', { email: email })

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' })
    await client.close();
    return;
  }

  const hashedPassword = await hashPassword(password)
  await insertDocument(client, 'users', {
    email: email,
    password: hashedPassword 
  })

  res.status(201).json({ message: 'Created user' })
}

export default handler;
