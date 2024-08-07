const jwt = require('jsonwebtoken');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const Charity = require('../models/charity');

exports.userAuthorisation = catchAsync(async(req, res, next) => {
    try {
        
        let token = req.headers.authorization.split(" ")[1];
        console.log("In user",token);
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized user... Try login again"
            });
        }


        const userObj = jwt.verify(token, process.env.JWT_SECRET);
       
        const user = await User.findByPk(userObj.id);

        req.user = user;
        next();
    } catch (err) {
        console.log("In Middleware", err);
        res.status(401).json({
            status: "fail",
            message: "Unauthorized user... Try login again"
        });
    }
});


exports.charityAuthorisation = catchAsync(async(req, res, next) => {
    try {
        
        let token = req.headers.authorization.split(" ")[1];
        console.log(" In charity middleware:" , token);
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized user... Try login again"
            });
        }


        const charityObj = jwt.verify(token, process.env.JWT_SECRET);
       
        const charity = await Charity.findByPk(charityObj.id);

        req.charity = charity;
        next();
    } catch (err) {
        console.log("In Middleware", err);
        res.status(401).json({
            status: "fail",
            message: "Unauthorized charity... Try login again"
        });
    }
});