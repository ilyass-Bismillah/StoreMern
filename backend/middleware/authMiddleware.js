import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import asyncHandler from "../middleware/asyncHandler.js"

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt

  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'supersecretjwtkey_987654321'
      const decoded = jwt.verify(token, secret)
      req.user = await User.findById(decoded.userId).select('-password')
      if (!req.user) {
        res.status(401)
        throw new Error('Not authorized, user not found')
      }
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }