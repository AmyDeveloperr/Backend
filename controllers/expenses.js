
const Expense = require('../models/expense');
const User = require('../models/user');


exports.addExpense = async (req, res, next) => {

    try {
        
    const {amount, description, category} = req.body;
    console.log(amount);

    if (!amount || !description || !category) {
        res.status(401).json({message: 'please enter all the fields'});
    }

    const data = await Expense.create({amount, description, category, userId: req.user.id});

    res.status(200).json({expDetails: data});

}catch(err) {console.log(err)};

}


exports.getExpenses = async (req, res, next) => {
    try {
        // const data = await Expense.findAll();
       const data = await Expense.findAll({where: {userId: req.user.id}}); //getting expense of user who is logged in
        res.status(200).json({allDetails: data})
    }catch(err) {
        console.log(err);
        res.status(500).json({error:err})
    };
   
}

exports.deleteExpense = async (req, res, next) => {
    try {
        const expId = req.params.id;
        // await Expense.destroy({where: {id: expId}})
        const noOfRows = await Expense.destroy({where: {id: expId, userId: req.user.id}}) //user can only delete his data not others
        if(noOfRows === 0) {
            res.status(404).json({success: false, message: 'You cant delete expesnes of others'});
        }
    
        return res.status(200).json({message:'user deleted successfully'});
    }catch(err) {console.log(err)};
}