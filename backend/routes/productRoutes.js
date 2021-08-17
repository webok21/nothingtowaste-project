const express = require('express')
const router = express.Router()
const Product = require('../../backend/models/product.js')
const productControlers = require('../controlers/productControlers')

router.get('/', productControlers.product_index_get)
module.exports = router;