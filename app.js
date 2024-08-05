const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const charityRoutes = require('./routes/charityRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.use('/charitylife', authRoutes);
app.use('/charitylife/user', userRoutes);
app.use('/charitylife/charity', charityRoutes);
// app.use('/api/charity', charityRoutes);
// app.use('/api/donation', donationRoutes);
// app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
