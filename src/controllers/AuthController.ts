
import type { Request, Response } from 'express';
import User from '../models/User';
import { hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';

export class AuthController {

  static createAccount = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    //preven