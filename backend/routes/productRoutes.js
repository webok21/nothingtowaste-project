const express = require('express')
const router = express.Router()
const Product = require('../../backend/models/product.js')
const productControlers = require('../controllers/productControlers')

router.get('/products', productControlers.product_index_get)
router.get('/products/sold', productControlers.product_sold_get)
router.post('/addProduct', productControlers.product_add_post)
router.get('/productDetails/:id', productControlers.product_detail_get)
router.put('/makeSold/:id', productControlers.product_set_isSold)
module.exports = router;