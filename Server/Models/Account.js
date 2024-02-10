const mongoose = require("mongoose");
const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    Balance: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model("Account" , AccountSchema);