var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/productLists', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('success')
});

var productSchema = new mongoose.Schema({
    parentId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status:{
        type: Number,
        required:true,
    },
    desc: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

var Product = mongoose.model('Products',productSchema)

module.exports = Product