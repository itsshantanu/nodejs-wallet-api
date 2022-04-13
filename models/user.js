const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        balance: {
            type: Number,
            requires: true
        },
        transactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Transaction'
            }
        ]
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);