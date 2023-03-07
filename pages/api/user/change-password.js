import { getSession } from 'next-auth/react';
import { connectDatabase, findOneValue, updateOneValue } from '../../../helpers/db-util';
import { hashPassword, verifyPassword } from '../../../helpers/auth';
import { method } from '../../../src/constants';

async function handler(req, res) {
  if (req.method !== method.PATCH) {
    return;
  }

  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' })
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectDatabase();
  const user = await findOneValue(client,'users', { email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found' })
    await client.close()
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const currentPassword = user.password;
  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordAreEqual) {
    res.status(403).json({ message: 'Invalid password!' })
    await client.close()
    return;
  }

  const result = await updateOneValue(
    client,
    'users',
    { email: userEmail }, { $set: { password: hashedPassword }}
  )

  await client.close()
  res.status(200).json({ message: 'Updated password!' })
}

export default handler;
