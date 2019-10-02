const fs = require('fs')
const express = require('express')
const Category = require('./database/mongodb')
// const Product = require('./database/mongodb-pro')

const router = express.Router()

router.post('/login', function (req, res) {
    // res.send(req.body)
    // console.log(req.body)
    return res.json({status:0, msg: 'yangke', data: req.body})
})


router.get('/manage/category/list', function (req,res) {
    Category.find ( function (err, categorys) {
        if (err) {
            return res.status(500).send('Server.error')
        }
        return res.json({status: 0, data: categorys})
    })
})

router.post('/manage/category/update', function (req, res) {

    Category.findByIdAndUpdate(req.body.categoryId.categoryId,{name:req.body.categoryId.categoryName }, function(err,data){
        if (err) {
            return res.status(500).send('Server.error')
        }
        return res.json({status: 0, data: data})
    })
})

router.post('/manage/category/add', function (req, res) {
    const parentId = req.body.parentId
    const name = req.body.categoryName
    console.log(parentId, name)
    new Category({parentId: parentId, name:name}).save(function (err,data){
        if (err) {
            return res.status(500).send('Server.error')
        }
        return res.json({status: 0, data: data})
    })
    
})

// product router
router.get('/manage/product/productlist', function (req,res) {
    Category.find ( function (err, products) {
        if (err) {
            return res.status(500).send('Server.error')
        }
        return res.json({status: 0, data: products})
    })
})

router.get('/manage/product/search', function (req,res) {
    const name = req.query.productName
    Category.find ({name:name}, function (err, products) {
        if (err) {
            return res.status(500).send('Server.error')
        }
        return res.json({status: 0, data: products})
    })
})

router.post('/manage/product/updateStatus', function (req,res) {
    // Category.findByIdAndUpdate
    const id = req.body.productId
    const newStatus = req.body.status
    console.log(newStatus)
    Category.findByIdAndUpdate(id, {status:newStatus },function(err,data){
        if (err) {
            return res.status(500).send('Server.error')
        }
        return res.json({status: 0, data: data})
    })
})

module.exports = router 