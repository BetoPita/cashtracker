import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import Expense from '../models/Expense';

declare global {
  namespace Express {
    interface Request {
      expense?: Expense; // Attach the budget to the request object for further use
    }
  }
}

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {

  await body('name')
    .notEmpty().withMessage('Name is required')
    .run(req);

  await body('amount')
    .notEmpty()