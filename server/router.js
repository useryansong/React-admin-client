const fs = require('fs')
const express = require('express')
const Category = require('./database/mongodb')
// const Product = require('./database/mongodb-pro')

const router = express.Router()

router.post('/login', function (req, res) {
    // res.send(req.body)
    const username = req.body.username
    const password = req.body.password
    if (username === 'admin' && password === 'admin'){
        return res.json({status:0, msg: 'yangke', data: req.body})
    }else {
        return res.json({status:1,msg:'username or password wrong'})
    } 
    
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
    Category.findByIdAndUpdate(id, {status:newStatus },function(err,data){
        if (err) {
            return res.status(500).send('Server.error')
        }
        return res.json({status: 0, data: data})
    })
})
router.post('/manage/product/update', function (req,res) {
    // Category.findByIdAndUpdate
        const id = req.body._id
        const name = req.body.name
        const desc = req.body.desc
        const price = req.body.price
        Category.findByIdAndUpdate(id, {name:name, desc:desc, price:price },function(err,data){
            if (err) {
                return res.status(500).send('Server.error')
            }
            return res.json({status: 0, data: data})
        })
})

router.post('/manage/product/add', function (req,res) {
    // Category.findByIdAndUpdate
        // const id = req.body._id
        const name = req.body.name
        const desc = req.body.desc
        const price = req.body.price
        new Category({parentId:1, name:name,desc:desc, price:price}).save(function (err,data){
            if (err) {
                return res.status(500).send('Server.error')
            }
            return res.json({status: 0, data: data})
        })
})

module.exports = router 