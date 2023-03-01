import { connectDatabase } from '../../../helpers/db-util';
import { hashPassword } from '../../../helpers/auth';

async function handler(req, res) {
  const data = req.body;

  const { email, password } = data;

  if (!email || !email.includes('@') || !password || password.trim().length < 7) {
    res.status(422).json({message: 'Invalid input or password'})
  }

  return;

  const client = await connectDatabase();

  const db = client.db();

  const hashedPassword = hashPassword(password)

  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
  })

  res.status(201).json({ message: 'Created user' })
}

export default handler;
