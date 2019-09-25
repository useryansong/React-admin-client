const fs = require('fs')
const express = require('express')
const Category = require('./database/mongodb')

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


module.exports = router 