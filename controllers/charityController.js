// const Charity = require('../models/charity');

// exports.registerCharity = async (req, res) => {
//   const { name, description } = req.body;

//   try {
//     await Charity.create({ name, description });
//     res.status(201).json({ message: 'Charity registered, pending approval.' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getCharities = async (req, res) => {
//   try {
//     const charities = await Charity.findAll({ where: { approved: true } });
//     res.json(charities);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getPendingCharities = async (req, res) => {
//   try {
//     const charities = await Charity.findAll({ where: { approved: false } });
//     res.json(charities);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateCharityStatus = async (req, res) => {
//   const { id } = req.params;
//   const { approved } = req.body;

//   try {
//     await Charity.update({ approved }, { where: { id } });
//     res.json({ message: 'Charity status updated.' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
