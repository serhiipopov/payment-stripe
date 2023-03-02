const bcrypt = require('bcryptjs');

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}
