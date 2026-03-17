const express = require('express');
const { body } = require('express-validator');
const { register, login, me } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

router.post(
  '/register',
  [body('name').isLength({ min: 2 }), body('email').isEmail(), body('password').isLength({ min: 8 })],
  validateRequest,
  register,
);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validateRequest, login);
router.get('/me', authMiddleware, me);

module.exports = router;
