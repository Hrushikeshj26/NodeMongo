import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startswith('Bearer')) {
    return res.status(401).json({ error: 'Access denied. Token missing!'})
  }

  const token = authHeader.split(" ")[1]

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    req.user = verified
    next()
  } catch (e) {
    res.status(401).json({error: e.message})
  }
}

export default authMiddleware
