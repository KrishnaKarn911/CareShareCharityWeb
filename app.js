const bodyParser = require('body-parser');
const express = require('express');
const path=require('path');
require('dotenv').config({path: 'config.env'});



const app=express();



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server Starte in port: ', PORT);
})