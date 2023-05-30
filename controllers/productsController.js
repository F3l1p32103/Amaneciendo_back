const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');


module.exports = {
    
    findByEstanco(req, res) {
        const id_estanco = req.params.id_estanco;

        Product.findByEstanco(id_estanco, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los productos',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    findByCategory(req, res) {
        const id_categoria = req.params.id_categoria;

        Product.findByCategory(id_categoria, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las categorias',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },


    create(req, res) {

        const product = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        Product.create(product, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del producto',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data // EL ID DEL NUEVO PRODUCTO QUE SE REGISTRO
            });

        });

    },

    async createWithImage(req, res) {

        const product = JSON.parse(req.body.product); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        
        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                product.image = url;
            }
        }
        Product.create(product, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del producto',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'El registro del producto se realizo correctamente',
                data: `${id}`
            });

        });
    },

    update(req, res) {
        const product = req.body;

        Product.update(product, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del producto',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El producto se actualizo correctamente',
                data: data
            });
        })
    },

    async updateWithImage(req, res) {
        const product = JSON.parse(req.body.product); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                product.image = url;
            }
        }

        Product.update(product, (err, data) => {

        
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion del producto',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El producto se actualizo correctamente',
                data: product
            });
        

        });

    },

    async delete(req, res) {
        const id = req.params.id;

        Product.delete(id, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de eliminar el producto',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El producto se elimino correctamente',
                data: `${id}`
            });
        });
    },

}