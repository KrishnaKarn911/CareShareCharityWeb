const Razorpay = require('razorpay');
const Donation = require('../models/donation');
const Charity = require('../models/charity');
const sendgrid = require('@sendgrid/mail');
require('dotenv').config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.donate = async (req, res) => {
  const { amount, charityId } = req.body;
  const { id: userId, email: userEmail } = req.user;

  try {
    const payment = await razorpay.orders.create({
      amount: amount * 100, // amount in smallest currency unit
      currency: 'INR',
      payment_capture: 1,
    });

    const donation = await Donation.create({
      amount,
      charityId,
      userId,
      payment_id: payment.id,
    });

    const charity = await Charity.findByPk(charityId);
    const receipt = {
      to: userEmail,
      from: 'no-reply@charityplatform.com',
      subject: 'Donation Confirmation',
      text: `Thank you for your donation of ₹${amount} to ${charity.name}.`,
    };

    await sendgrid.send(receipt);
    res.json({ message: 'Donation successful!', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDonationHistory = async (req, res) => {
  const { id: userId } = req.user;
  
  try {
    const donations = await Donation.findAll({ where: { userId } });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
