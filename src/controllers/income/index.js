const Income = require('../../model/Income');

const createIncome = async (req, res) => {
  try {
    if (!req.body.description || !req.body.amount || !req.body.user) {
      return res.status(400).json({
        error: true,
        msg: 'Missing fields to create income',
      });
    }
    const income = new Income(req.body);
    const newIncome = await income.save();
    return res.status(201).json(newIncome);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const getAllIncome = async (req, res) => {
  const { page } = req.query;
  try {
    const response = await Income.paginate(
      {},
      { limit: 10, page: Number(page), populate: 'user' },
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const getIncomeById = async (req, res) => {
  try {
    const response = await Income.findOne({ _id: req.params.id });

    if (!response || response.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No income with the id of ${req.params.id}`,
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

const updateIncome = async (req, res) => {
  try {
    if (
      req.body.description === ''
      || req.body.amount === ''
      || req.body.user === ''
    ) {
      return res.status(400).json({
        error: true,
        msg: 'Missing fields to update income',
      });
    }
    const incomeUpdated = await Income.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );

    if (!incomeUpdated || incomeUpdated.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No income with the id ${req.params.id}`,
      });
    }

    return res.status(201).json(incomeUpdated);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const incomeFound = await Income.findOneAndRemove({
      _id: req.params.id,
    });

    if (!incomeFound || incomeFound.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No income with the id ${req.params.id}`,
      });
    }

    return res.status(202).json(incomeFound);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

module.exports = {
  createIncome,
  getAllIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
};
