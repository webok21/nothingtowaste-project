const Product = require('../models/product')

//ALL PRODUCTS7ARTICLES
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

//DETAILS
const product_detail_get = (req, res) => {

    console.log('here the id from backend: ' + req.params.id)
    Product.findById(req.params.id)
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

//NEW PRODUCT
const product_add_post = (req, res) => {
    console.log(req.body)
    const product = new Product({
        //my req.body but more defined
        p_titel: 'white-shoes',
        p_imageUrl: '/img/shop/white-shoes.png',
        p_mark: 'Apple',
        p_shiping: false,
        p_pickup: true,
        p_price: 0,
        p_amount: 1,
        p_category: ['Shoes', 'Fashion'],
        p_description: 'Größe 38, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac id elementum nec dolor. Ridiculus diam ac tellus id egestas mauris sed etiam. Amet, at eu tristique quis. Massa fermentum eget pharetra magna vitae vitae ultricies consequat. Amet, integer diam sit netus adipiscing eu vestibulum vitae ut. Sem vel fringilla malesuada amet. Tellus massa amet porta vel in. Viverra non proin tempus viverra rhoncus volutpat ac. Accumsan facilisi orci et amet vitae mauris scelerisque sed.',
        p_owner: 'ixavierayix@gmail.com',
        p_forFree: true,
        p_priceFlex: true,
        p_toGiveAway: false,
        p_call: '098-098-098',
        p_street: 'Liebigstraße 78',
        p_city: 'Frankfurt',
        p_PLZ: '9877',
        p_isSold: false,
    })
    product.save()
        .then((result) => {
            console.log(result)
            res.json({ result })
        })
        .catch((err) => {
            console.log(err)
            // res.json({ redirect: "/404" })
        })
}

// const product_add_post = (req, res) => {
//     console.log(req.body)
//     const product = new Product({
//         //my req.body but more defined
//         p_titel: 'white-shoes',
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
//         p_call: '098-098-098',
//         p_street: 'Liebigstraße 78',
//         p_city: 'Frankfurt',
//         p_PLZ: '9877',
//         p_isSold: false,
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
    product_detail_get
}