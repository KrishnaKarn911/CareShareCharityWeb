const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');
const path=require('path');
const Charity = require('./../models/charity');
const catchAsync = require('./../utils/catchAsync');



const signToken = (id,name) => {
    return jwt.sign({ id: id, name: name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.getRegisterCharityPage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'views', 'registerCharity.html'));
}

exports.getCharityLoginPage=(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'..','views','charityLogin.html'));
}

exports.getCharityProfilePage=(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'..','views','charityProfile.html'));
}


exports.getCharities = async (req, res) => {
    try {
        const charities = await Charity.findAll({ where: { approved: true } });
        res.status(200).json(charities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getPendingCharities = async (req,res)=>{
    try{
        const charities = await Charity.findAll({where: {approved: false}});
        res.status(200).json(charities)
    }catch(err){
        res.status(500).json({error: err.message});
    }
}


exports.loginCharity = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 404));
    }

    // Check if user exists and if password is correct
    const charity = await Charity.findOne({ where: { email: email } });

    if (!charity) {
        return next(new AppError(`charity doesn't Exist`, 404));
    }

    const correct = await bcrypt.compare(password, charity.password);
    console.log(correct);
    if (!correct) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // If everything is ok then send the jwt token to client
    const token = signToken(charity.id, charity.name);
    res.status(200).json({
        status: "success",
        token
    });
});


exports.getCharityDetails = catchAsync(async(req,res)=>{
     const charity = req.charity;
     const charityDetails = await Charity.findOne({where:{id: charity.id}});

     if(!charityDetails){
        res.status(404).json({
            status: "fail",
            message: "Page not found"
        })
     }
     res.status(200).json({
        status: "success",
        charityDetails,
     })
})
