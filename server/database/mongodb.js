var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/categoryLists', {useNewUrlParser: true, useUnifiedTopology: true});


var categorySchema = new mongoose.Schema({
    parentId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

var Category = mongoose.model('Categories',categorySchema)


module.exports = Category