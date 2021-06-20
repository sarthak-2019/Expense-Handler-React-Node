const router = require('express').Router();

const expenseController = require('./../controller/expenseController');
const authController = require('./../controller/authController');

router.use(authController.protect);
// register
router.post('/', expenseController.createExpense);
router.get('/', expenseController.ExpenseList);
router.get('/user', expenseController.userName);

router
  .route('/:id')
  .get(expenseController.getExpense)
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
