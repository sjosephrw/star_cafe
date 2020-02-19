const mongoose = require('mongoose');
//https://stackoverflow.com/questions/16641210/mongoose-populate-with-array-of-objects-containing-ref
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Menu must have a name.'],
        unique: true,
        trim: true
    },
    categories: [
        
        {
            category: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product'
            },
            name: String,
            image: String
        }
        
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }     
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;