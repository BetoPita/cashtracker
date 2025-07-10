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
    .notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Amount must be a number')
    .custom((value) => value >= 0).withMessage('Amount must be a positive number')
    .run(req);

  next()
}

export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
  await param('expenseId')
    .isInt().withMessage('ID no valido')
    .custom((value) => value >= 0).withMessage('ID no válido')
    .run(req);

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return;
  }
  next();
}

export const validateExpenseExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findByPk(expenseId);
    if (!expense) {
      res.status(404).json({ error: 'Expense not found' });
      return
    }
    // modificar el type de la request para que pueda ser usado en el controlador
    req.expense = expense; // Attach the budget to the request object for further use
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
