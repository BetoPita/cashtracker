import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import Budget from '../models/Budget';

declare global {
  namespace Express {
    interface Request {
      budget?: Budget; // Attach the budget to the request object for further use
    }
  }
}
export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {

  await param('budgetId')
    .isInt().withMessage('ID no valido')
    .custom((value) => value >= 0).withMessage('ID no válido')
    .run(req);

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return;
  }
  next()
}



export const validateBudgeExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { budgetId } = req.params;
    const budget = await Budget.findByPk(budgetId);
    if (!budget) {
      res.status(404).json({ error: 'Budget not found' });
      return
    }
    // modificar el type de la request para que pueda ser usado en el controlador
    req.budget = budget; // Attach the budget to the request object for further use
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const validateBudgeInput = async (req: Request, res: Response, next: NextFunction) => {

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
