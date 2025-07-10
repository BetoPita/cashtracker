import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post('/create-account',
  body('name')
    .notEmpty().withMessage('Name is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('email')
    .isEmail().withMessage('Invalid email format'),
    handleInputErrors,
  AuthController.createAccount);

export default router;
