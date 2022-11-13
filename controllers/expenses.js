
const Expense = require('../models/expense');
const User = require('../models/user');

exports.addExpense = async (req, res, next) => {

    try {
        
    const {amount, description, category} = req.body;
    console.log(amount);

    if (!amount || !description || !category) {
        res.status(401).json({message: 'please enter all the fields'});
    }

    const data = await Expense.create({amount, description, category});
    res.status(200).json({expDetails: data});

}catch(err) {console.log(err)};

}


exports.getExpenses = async (req, res, next) => {
    try {
        const data = await Expense.findAll();
        res.status(200).json({allDetails: data})
    }catch(err) {
        res.status(500).json({error:err})
    };
   
}

exports.deleteExpense = async (req, res, next) => {
    try {
        const expId = req.params.id;
        await Expense.destroy({where: {id: expId}})
        res.status(200).json({message:'user deleted successfully'});
    }catch(err) {console.log(err)};
}