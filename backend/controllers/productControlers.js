const Product = require('../models/product')
const path = require('path')

//ALL PRODUCTS7ARTICLES
const product_index_get = (req, res) => {

    console.log('a get index request ')
    // console.log(req)
    Product.find({ p_isSold: false })
        .then((result) => {
            // console.log(result)
            res.json(result)
            res.end()
        })
        .catch((err) => {
            console.log(err)
            // res.json({ redirect: "/404" })
        })
}
const product_sold_get = (req, res) => {
    console.log('a get sold request ')
    Product.find({ p_isSold: true })
        .then((result) => {
            // console.log(result)
            res.json(result)
            res.end()
        })
        .catch((err) => {
            console.log(err)
            // res.json({ redirect: "/404" })
        })
}

//DETAILS
const product_detail_get = (req, res) => {

    Product.findById(req.params.id)
        .then((result) => {
            // console.log(result)
            res.json(result)
            res.end()
        })
        .catch((err) => {
            console.log(err)
            // res.json({ redirect: "/404" })
        })
}

//NEW PRODUCT
const product_add_post = (req, res) => {
    console.log(req.body)
    const product = new Product({
        //my req.body but more defined
        p_titel: req.body.title,
        p_imageUrl: req.body.p_imageUrl,
        p_mark: req.body.mark,
        p_shiping: (req.body.delivery == 'no' ? false : true),
        p_pickup: (req.body.pickup == 'no' ? false : true),
        p_price: req.body.price,
        p_amount: req.body.quantity,
        p_category: req.body.category,
        p_description: req.body.description,
        p_owner: req.body.name,
        p_forFree: (req.body.condition == 'free' ? true : false),
        p_priceFlex: (req.body.condition == 'flex' ? true : false),
        p_toGiveAway: (req.body.advertType == 'search' ? true : false),
        p_call: req.body.phone,
        p_street: req.body.street,
        p_city: req.body.city,
        p_PLZ: req.body.postcode,
        p_isSold: false,
        p_ownerID: '611e44bb2e64921e848d7f19'
    })
    product.save()
        .then((result) => {
            console.log(result)
            // res.json({ result })
            res.json({ redirect: "/marketplace" })
        })
        .catch((err) => {
            console.log(err)
            // res.json({ redirect: "/404" })
        })
}

const product_set_isSold = (req, res) => {
    console.log(req.params.id)
    const currentProduct = Product.where({ _id: req.params.id });
    // console.log(currentProduct)
    currentProduct.update({ $set: { p_isSold: true } }).exec()
    console.log('Product was marked as sold')
    res.json({ redirect: "/marketplace" })
}

const product_edit_get = (req, res) => {
    console.log(req.params.id)
    Product.findById(req.params.id)
        .then((result) => {
            console.log(result)
            res.json(result)
            res.end()
        })
        .catch((err) => {
            console.log(err)
        })
}
const product_edit_put = (req, res) => {
    console.log('new edit request sent')
    const Product = Product.findByIdAndUpdate(req.params.id, req.body)
        .then(result => {
            console.log('edited product in db')
            console.log(result)
        })
        .catch(err => {
            console.log(err)
            res.end()
        })

}

//Please don't delete here, i still need it for tests
// const product_add_post = (req, res) => {
//     console.log(req.body)
//     const product = new Product({
//         //my req.body but more defined
//         p_titel: 'white-shooooes',
//         p_imageUrl: '/img/shop/white-shoes.png',
//         p_mark: 'Apple',
//         p_shiping: false,
//         p_pickup: true,
//         p_price: 0,
//         p_amount: 1,
//         p_category: ['Shoes', 'Fashion'],
//         p_description: 'Größe 38, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac id elementum nec dolor. Ridiculus diam ac tellus id egestas mauris sed etiam. Amet, at eu tristique quis. Massa fermentum eget pharetra magna vitae vitae ultricies consequat. Amet, integer diam sit netus adipiscing eu vestibulum vitae ut. Sem vel fringilla malesuada amet. Tellus massa amet porta vel in. Viverra non proin tempus viverra rhoncus volutpat ac. Accumsan facilisi orci et amet vitae mauris scelerisque sed.',
//         p_owner: 'ixavierayix@gmail.com',
//         p_forFree: true,
//         p_priceFlex: true,
//         p_toGiveAway: false,
//         p_call: 090098098,
//         p_street: 'Liebigstraße 78',
//         p_city: 'Frankfurt',
//         p_PLZ: '9877',
//         p_isSold: false,
//         p_ownerID: '611e44bb2e64921e848d7f19'
//     })
//     product.save()
//         .then((result) => {
//             console.log(result)
//             res.json({ result })
//         })
//         .catch((err) => {
//             console.log(err)
//             // res.json({ redirect: "/404" })
//         })
// }

module.exports = {
    product_index_get,
    product_add_post,
    product_index_get,
    product_detail_get,
    product_set_isSold,
    product_sold_get,
    product_edit_get,
    product_edit_put
}