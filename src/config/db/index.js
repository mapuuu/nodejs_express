const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:2271toan@cluster0.c51yr.mongodb.net/education_dev?retryWrites=true&w=majority');
        console.log('Connected to DB!!!');
    } catch (error) {
        console.log('Failure connected to DB!!!');
    }
}

module.exports = {connect};