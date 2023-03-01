const bcrypt = require('bcryptjs');

export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 12)
}
