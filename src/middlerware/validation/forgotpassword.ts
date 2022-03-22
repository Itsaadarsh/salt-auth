import { body } from 'express-validator';

export default module.exports = () => {
  return [body('email').isEmail().withMessage('Incorrect EMAIL format')];
};
