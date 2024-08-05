const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const charityRoutes = require('./routes/charityRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');
const Charity=require('./models/charity');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/charitylife', authRoutes);
app.use('/charitylife/user', userRoutes);
app.use('/charitylife/admin', adminRoutes);
app.use('/charitylife/charity', charityRoutes);

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});


app.post('/charitylife/charity/register', (async (req, res) => {
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
}))

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


module.exports = {
    io,
    server
};
