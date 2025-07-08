import { Request, Response, NextFunction } from 'express'
import { param, validationResult } from 'express-validator'
import Budget from '../models/Budget';

declare global {
  namespace Express {
    interface Request {
      budget?: Budget; // Attach the budget to the request object for further use
    }
  }
}
export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {

  await param('id')
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
    const { id } = req.params;
    const budget = await Budget.findByPk(id);
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
