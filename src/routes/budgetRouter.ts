import { Router } from 'express';
import { BudgetController } from '../controllers/BudgetController';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { validateBudgeExists, validateBudgetId } from '../middleware/budget';


const router = Router();


router.get('/', BudgetController.getAll);

router.post('/',
  body('name').notEmpty().withMessage('Name is required'),
  body('amount').notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Amount must be a number')
    .custom((value) => value >= 0).withMessage('Amount must be a positive number'),
  handleInputErrors,
  BudgetController.create);

router.get('/:id',
  validateBudgetId,
  validateBudgeExists,
  BudgetController.getById);

router.put('/:id',
  validateBudgetId,
  validateBudgeExists,
  body('name').notEmpty().withMessage('Name is required'),
  body('amount').notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Amount must be a number')
    .custom((value) => value >= 0).withMessage('Amount must be a positive number'),
  handleInputErrors,
  BudgetController.updateById);

router.delete('/:id',
  validateBudgetId,
  BudgetController.deleteById);

export default router;
