const Expense = require('../models/Expense');

exports.addExpense = async(req, res, next)=> {

    if (!req.body.expenseAmount) {
        throw new Error('Entering amount is mandatory');
    }
    try {   
      const amount = req.body.expenseAmount;
      const description = req.body.expenseDescription;
      const category = req.body.expenseCategory;
      const data = await Expense.create({expenseAmount: amount, expenseDescription: description, expenseCategory: category});
      res.status(201).json({newExpenseDetail: data});
  } catch(err) {
    console.log('adding expense failed')
      res.status(500).json({error: err});
  }
};

exports.getExpense = async(req, res, next) => {
    try{
    const expense = await Expense.findAll();
    res.status(200).json({allExpense: expense});
    }catch(err) {
      console.log('Getting expense is failed',JSON.stringify(err));
      res.status(500).json({error: err})
    };
  }
  
  exports.deleteExpense = async(req, res, next) => {
    try{
    const EId = req.params.id;
    await Expense.destroy({where:{id: EId}});
    res.sendStatus(200);
    }catch(err) {
      console.log('deleting expense failed',JSON.stringify(err));
      res.status(500).json({error: err});
    }
  }