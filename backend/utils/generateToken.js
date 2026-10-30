import jwt from 'jsonwebtoken'

export const generateToken = (res, userId) => {
  const secret = process.env.JWT_SECRET || 'supersecretjwtkey_987654321'

  const token = jwt.sign({ userId }, secret, {
    expiresIn: '30d',
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
}