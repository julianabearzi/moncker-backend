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

module.exports = {
  createIncome,
};
