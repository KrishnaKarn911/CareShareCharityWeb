// adminController.js
const catchAsync=require('./../utils/catchAsync');
const path=require('path')

const Charity = require('../models/charity');

exports.approveCharity = catchAsync(async (req, res) => {
    const { id } = req.params;
    const charity = await Charity.findByPk(id);

    if (!charity) {
        return res.status(404).json({
            status: 'fail',
            message: 'Charity not found'
        });
    }

    charity.approved = true;
    await charity.save();

    res.status(200).json({
        status: 'success',
        message: 'Charity approved'
    });
});

exports.rejectCharity = catchAsync(async (req, res) => {
    const { id } = req.params;
    const charity = await Charity.findByPk(id);

    if (!charity) {
        return res.status(404).json({
            status: 'fail',
            message: 'Charity not found'
        });
    }

    await charity.destroy();

    res.status(200).json({
        status: 'success',
        message: 'Charity rejected'
    });
});


exports.getProfilePage=(req,res)=>{
     res.status(200).sendFile(path.join(__dirname,'..', 'views', 'adminprofile.html'))
}
