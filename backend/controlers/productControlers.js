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
const product_add_post = (req, res) => {
    console.log(req.body)
    const product = new Product({
        //my req.body but more defined

        private: {
            p_email: req.body.email,
            p_phone: {
                mobile: req.body.p_phone,
                home: req.body.p_phone
            },
            p_address: {
                city: req.body.p_city,
                country: req.body.p_country,
                street: req.body.p_street,
                postalcode: req.body.postalcode,
                streetNr: req.body.p_streetNr
            },
        },
        work: {
            jobTitle: req.body.jobTitle,
            w_phone: req.body.w_phone,
            w_org: {
                name: req.body.org_name,
                address: req.body.w_address,
                department: req.body.w_department
            }
        },
        notes: req.body.w_notes,
        isFamily: (req.body.Family == 'on' ? true : false),
        isFriend: (req.body.Friend == 'on' ? true : false),
        isAcquaintance: (req.body.Acquaintance == 'on' ? true : false),
        isColleague: (req.body.Colleague == 'on' ? true : false),
        isFavorite: false
    })
    contact.save()
        .then((result) => {
            console.log(result)
            res.json({ redirect: "/" })
        })
        .catch((err) => {
            console.log(err)
            res.json({ redirect: "/404" })
        })
}

module.exports = {
    product_index_get
}