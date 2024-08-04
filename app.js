const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const charityRoutes = require('./routes/charityRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/charity', charityRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
