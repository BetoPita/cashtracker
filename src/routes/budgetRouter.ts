import { Router } from 'express';
import { BudgetController } from '../controllers/BudgetController';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { validateBudgeExists, validateBudgeInput, validateBudgetId } from '../middleware/budget';
import { ExpensesController } from '../controllers/ExpensesController';
import { validateExpenseExists, validateExpenseId, validateExpenseInput } from '../middleware/expense';


const router = Router();

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgeExists)

router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExists)

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

// Routes for expenses

router.post('/:budgetId/expenses',
  validateExpenseInput,
  handleInputErrors,
  ExpensesController.create);

router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById);

router.put('/:budgetId/expenses/:expenseId',
  validateExpenseInput,
  handleInputErrors,
  ExpensesController.updateById);

router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById);


export default router;
