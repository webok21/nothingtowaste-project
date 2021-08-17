const Product = require('../models/product')

const product_index_get = (req, res) => {
    console.log('a get request ')
    Product.find().sort({})
        .then((result) => {
            console.log(result)
            res.json(result)
            res.end()
        })
        .catch((err) => {
            console.log(err)
            // res.json({ redirect: "/404" })
        })

}


module.exports = {
    product_index_get
}