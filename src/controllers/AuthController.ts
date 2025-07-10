
import type { Request, Response } from 'express';
import User from '../models/User';
import { checkPassword, hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';

export class AuthController {

  static createAccount = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    //prevenir duplicados
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'El correo electrónico ya está en uso' });
    }

    try {
      const user = new User(req.body)
      user.password = await hashPassword(password);
      user.token = generateToken();
      await user.save();

      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token
      })
      res.status(200).json("Cuenta creada correctamente");
    } catch (error) {
      console.error({ message: 'Error creating budget', error });
      res.status(500).json({ error: 'Internal Server Error' });

    }

  }

  static confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    try {
      const user = await User.findOne({ where: { token } });

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      user.token = null; // Clear the token after confirmation
      user.confirmed = true; // Set the user as confirmed
      await user.save();

      res.status(200).json({ message: 'Account confirmed successfully' });
    } catch (error) {
      console.error({ message: 'Error confirming account', error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (!user.confirmed) {
      return res.status(403).json({ error: "Cuenta no confirmada" });
    }

    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
  }
}
