const express = require('express')
const router = express.Router()
const Product = require('../../backend/models/product.js')
const productControlers = require('../controlers/productControlers')

router.get('/products', productControlers.product_index_get)
router.post('/addProduct', productControlers.product_add_post)
router.get('/productDetails/:id', productControlers.product_detail_get)
module.exports = router;