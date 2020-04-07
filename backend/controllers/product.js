const Product = require('../models/Product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const path = require('path')



exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {

        if (err) {
            return res.status(400).json({
                error: 'error in finding a product in adatabase',
            })
        }
        req.product = product;
        next();

    })


}



exports.createProduct = (req, res) => {

    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Error in uplaoded Image",
            })

        }

        //feild REstictiond here//

        newProduct = new Product(fields);
        if (file.photo) {
            if (file.photo.size > 4000000) {
                return res.status(400).json({
                    error: 'too big file',
                })
            }





            newProduct.photo.data = fs.readFileSync(file.photo.path)
            newProduct.photo.contentType = file.photo.type;
            newProduct.save()
                .then(product => {
                    res.json({
                        msg: "created successfully",
                        product: product,
                    })
                })
                .catch(err => {
                    res.json({
                        msg: 'Error in saving product in database'
                    })
                })
        }

    })

}