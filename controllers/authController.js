const jwt = require('jsonwebtoken');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');
const path=require('path');



// const signToken = (id,name) => {
//     return jwt.sign({ id: id, name: name}, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN
//     });
// };


exports.homepage = (req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'..', 'views', 'homepage.html'))
}

// exports.register = catchAsync(async (req, res) => {

//     //check if user exist already
//     const ifUserExist = await User.findOne({where:{email:req.body.email}});
//     if(ifUserExist){
//         return res.status(400).json({
//             status: "fail",
//             message: "User Already Exist with that mail ID"
//         })
//     }

//     console.log("No existing User")
//     const newUser = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         confirmPassword: req.body.confirmPassword
//     });


//     const token = signToken(newUser.id, newUser.name);

//     res.status(201).json({
//         status: "success",
//         token,
//         data: {
//             newUser,
//         }
//     });
// });

// exports.login = catchAsync(async (req, res, next) => {
//     const { email, password } = req.body;

//     // Check if email and password exist
//     if (!email || !password) {
//         return next(new AppError('Please provide email and password', 404));
//     }

//     // Check if user exists and if password is correct
//     const user = await User.findOne({ where: { email: email } });

//     if (!user) {
//         return next(new AppError(`User doesn't Exist`, 404));
//     }

//     const correct = await bcrypt.compare(password, user.password);
//     console.log(correct);
//     if (!correct) {
//         return next(new AppError('Incorrect email or password', 401));
//     }

//     // If everything is ok then send the jwt token to client
//     const token = signToken(user.id, user.name);
//     res.status(200).json({
//         status: "success",
//         token
//     });
// });


// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found.' });

//     res.json({ id: user.id, username: user.username, email: user.email });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateProfile = async (req, res) => {
//   const { username, email } = req.body;

//   try {
//     await User.update({ username, email }, { where: { id: req.user.id } });
//     res.json({ message: 'Profile updated successfully!' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
