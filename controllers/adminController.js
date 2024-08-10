// adminController.js
const catchAsync=require('./../utils/catchAsync');
const path=require('path')

const Charity = require('../models/charity');
const Order = require('../models/Order');
const User = require('../models/user');

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




exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            attributes: ['orderId', 'amount', 'createdAt', 'paymentId'],
            include: [
                {
                    model: User,
                    attributes: ['name'], 
                },
                {
                    model: Charity,
                    attributes: ['name'], 
                }
            ]
        });

        const formattedOrders = orders.map(order => ({
            orderId: order.orderId,
            userName: order.User.name,
            charityName: order.Charity.name,
            amount: order.amount,
            createdAt: order.createdAt,
            paymentId: order.paymentId,
           
        }));

        res.status(200).json(formattedOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

