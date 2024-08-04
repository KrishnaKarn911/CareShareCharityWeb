const User = require('../models/user');
//const Charity = require('../models/charity');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await User.update({ status }, { where: { id } });
    res.json({ message: 'User status updated.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
