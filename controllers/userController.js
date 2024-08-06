const jwt = require('jsonwebtoken');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');
const path=require('path');
const Order=require('../models/Order');

const Razorpay = require('razorpay');





const signToken = (id,name) => {
    return jwt.sign({ id: id, name: name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


exports.register = (req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'..', 'views', 'registerUser.html'))
}  

exports.loginPage = (req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'..', 'views', 'login.html'))
}


exports.createUser = catchAsync(async (req, res) => {


    //check if user exist already
    const ifUserExist = await User.findOne({where:{email:req.body.email}});
    if(ifUserExist){
        return res.status(400).json({
            status: "fail",
            message: "User Already Exist with that mail ID"
        })
    }

    console.log("No existing User")
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });


    const token = signToken(newUser.id, newUser.name);

    res.status(201).json({
        status: "success",
        token,
        data: {
            newUser,
        }
    });
});


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 404));
    }

    // Check if user exists and if password is correct
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
        return next(new AppError(`User doesn't Exist`, 404));
    }

    const correct = await bcrypt.compare(password, user.password);
    console.log(correct);
    if (!correct) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // If everything is ok then send the jwt token to client
    const token = signToken(user.id, user.name);
    res.status(200).json({
        status: "success",
        token
    });
});


exports.getProfilePage = (req,res)=>{
     res.status(200).sendFile(path.join(__dirname,'..', 'views', 'profile.html'))
}




exports.getUserProfile = catchAsync(async (req, res) => {
    const user = await User.findByPk(req.user.id);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }
    });
});



exports.createOrder = async (req, res) => {
    try {
        const Razorpay = require('razorpay');
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const userId = req.user.id;
        const { charityId, amount } = req.body;
        const options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };

        instance.orders.create(options, async (err, order) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Failed to create Razorpay order",
                    error: err
                });
            }

            try {
                await Order.create({
                    orderId: order.id,
                    status: "PENDING",
                    userId: userId,
                    charityId: charityId,
                    amount: amount,
                    payment_id: order.id,
                });

                return res.status(201).json({
                    order,
                    key_id: instance.key_id
                });
            } catch (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Failed to save order in the database",
                    error: err
                });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Something went wrong",
            error: err
        });
    }
};




exports.updateDonation = (req, res) => {
    const { payment_id, order_id, charityId, userId, amount } = req.body;

    Order.findOne({ where: { orderId: order_id } }).then(order => {
        order.update({ paymentId: payment_id, status: "SUCCESSFUL", charityId: charityId, userId: userId, amount: amount }).then(() => {
            return res.status(201).json({
                status: "success",
                message: "Transaction successfully completed",
            });
        }).catch(err => {
            return res.status(500).json({
                status: "failed",
                message: "Something went wrong",
                err
            });
        });
    }).catch(err => {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
            err
        });
    });
};






