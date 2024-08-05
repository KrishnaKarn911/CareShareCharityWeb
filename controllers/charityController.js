const io = require('../app');
const Charity = require('./../models/charity');
const catchAsync = require('./../utils/catchAsync');
const path = require('path');


console.log(io);

exports.getRegisterCharityPage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'views', 'registerCharity.html'));
}

exports.createCharity = catchAsync(async (req, res) => {
    console.log(req.body);
    console.log(io);
    const newCharity = await Charity.create({
        name: req.body.name,
        description: req.body.description,
        approved: false
    });

    // Notify admin about new charity registration
    io.emit('charityRegistered', {
        id: newCharity.id,
        name: newCharity.name,
        description: newCharity.description
    });

    res.status(201).json({
        status: 'success',
        data: {
            newCharity
        }
    });
});

exports.getCharities = async (req, res) => {
    try {
        const charities = await Charity.findAll({ where: { approved: true } });
        res.json(charities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
