const mongoose = require('mongoose');

const db=mongoose.connect('mongodb://localhost:27017/4th_task').then(()=>{
    console.log("Connect");})

module.exports = db;
