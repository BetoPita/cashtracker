import { Router } from 'express';
import { BudgetController } from '../controllers/BudgetController';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { validateBudgeExists, validateBudgeInput, validateBudgetId } from '../middleware/budget';


const router = Router();

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgeExists)

router.get('/', BudgetController.getAll);

router.post('/',
  validateBudgeInput,
  handleInputErrors,
  BudgetController.create);

router.get('/:budgetId',
  BudgetController.getById);

router.put('/:budgetId',
  validateBudgeInput,
  handleInputErrors,
  BudgetController.updateById);

router.delete('/:budgetId', BudgetController.deleteById);

export default router;
