
const Expense = require('../models/expense');
const User = require('../models/user');
const AWS = require('aws-sdk');

function uploadToS3(data, fileName) {
    //these are constants so written in caps
    const BUCKET_NAME = 'expensetrackeramar';
    const IAM_USER_KEY = 'AKIAQLLC2W7HV3GSBPWE';
    const IAM_USER_SECRET = '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';

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    })

    var params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3response)=>{
            if(err) {
                console.log('something went wrong', err);
                reject(err);
            } else {
                console.log('success', s3response);
                resolve(s3response.Location);
            }
        })

    })
   
}

exports.downloadexpense = async (req, res, next) => {
    try {
    const expenses = await req.user.getExpenses();
    console.log(expenses);
    const stringifiedExpenses = JSON.stringify(expenses);

    const userId = req.user.id;

    const fileName = `myexpense${userId}/${new Date()}.csv`;
    const fileUrl =  await uploadToS3(stringifiedExpenses, fileName);
    res.status(200).json({fileUrl, success: true});
    }catch(err) {
        console.log(err);
        res.status(500).json({fileUrl: '', success: false, err: err});
    }
}

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



