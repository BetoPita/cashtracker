import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(limiter);

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

router.post('/confirm-account',
  body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('Token is invalid'),
  handleInputErrors,
  AuthController.confirmAccount)

router.post('/login',
  body('email')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleInputErrors,
  AuthController.login);


router.post('/forgot-password',
  body('email')
    .isEmail()
    .withMessage('Invalid email format'),
  handleInputErrors,
  AuthController.forgotPassword

)

router.post('/validate-token',
  body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('Token is invalid'),
  handleInputErrors,
  AuthController.validateToken
)

router.post('/reset-password/:token',
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  handleInputErrors,
  AuthController.resetPasswordWithToken
);

router.get('/user',
  authenticate,
  AuthController.user
)

router.post('/update-password',
  authenticate,
  body('currentPassword')
    .notEmpty().withMessage('Current password is required'),
  body('password')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  handleInputErrors,
  AuthController.updateCurrentUserPassword
)

router.post('/check-password',
  authenticate,
  body('password')
    .notEmpty().withMessage('Password is required'),
  handleInputErrors,
  AuthController.checkPassword
)
export default router;
