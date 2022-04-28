const Expenses = require('../../model/Expenses');

const createExpense = async (req, res) => {
  try {
    if (
      !req.body.description
      || !req.body.amount
      || !req.body.category
      || !req.body.user
    ) {
      return res.status(400).json({
        error: true,
        msg: 'Missing fields to create expense',
      });
    }
    const expense = new Expenses(req.body);
    const newExpense = await expense.save();
    return res.status(201).json(newExpense);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const getAllExpenses = async (req, res) => {
  const { page } = req?.query;
  try {
    const response = await Expenses.paginate(
      {},
      { limit: 10, page: Number(page) },
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const response = await Expenses.findOne({ _id: req.params.id });

    if (!response || response.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No expense with the id of ${req.params.id}`,
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    if (
      req.body.description === ''
      || req.body.amount === ''
      || req.body.category === ''
      || req.body.user === ''
    ) {
      return res.status(400).json({
        error: true,
        msg: 'Missing fields to update expense',
      });
    }
    const expenseUpdated = await Expenses.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );

    if (!expenseUpdated || expenseUpdated.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No expense with the id ${req.params.id}`,
      });
    }

    return res.status(201).json(expenseUpdated);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expenseFound = await Expenses.findOneAndRemove({
      _id: req.params.id,
    });

    if (!expenseFound || expenseFound.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No expense with the id ${req.params.id}`,
      });
    }

    return res.status(202).json(expenseFound);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
