const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/ThirteenSteps', {
    useNewUrlParser: true,
    useCreateIndex: true,
});