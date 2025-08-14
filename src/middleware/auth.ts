import { Request, Response, NextFunction } from 'express'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import User from '../models/User';


declare global {
  namespace Express {
    interface Request {
      user?: User; // Attach the user to the request object for further use
    }
  }
}
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const [, token] = bearer.split(' ');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  //revisar si es token válido
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === 'object' && decoded.userId) {
      req.user = await User.findByPk(decoded.userId, {
        attributes: ['id', 'name', 'email']
      });
      next();
    }

  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired'});
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.error({ message: 'Error validating token', error });
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}
