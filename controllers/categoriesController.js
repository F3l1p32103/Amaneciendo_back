const Category = require('../models/category');
const storage = require('../utils/cloud_storage');

module.exports = {

    async getAll(req, res) {
        Category.getAll((err, data) => {
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

    getByEstanco(req, res) {
        const id_estanco = req.params.id_estanco;

        Category.getByEstanco(id_estanco, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las categorias por estanco',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },
    create(req, res) {

        const category = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        Category.create(category, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del categoria',
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

        const category = JSON.parse(req.body.category); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                category.image = url;
            }
        }

        Category.create(category, (err, id) => {

        
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la creacion de la categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se creo correctamente',
                data: `${id}`
            });
        });

    },
    async updateWithImage(req, res) {

        const category = JSON.parse(req.body.category); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                category.image = url;
            }
        }

        Category.update(category, (err, id) => {

        
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion de la categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se actualizo correctamente',
                data: `${id}`
            });
        });

    },
    async update(req, res) {

        const category = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        console.log('CATEGORIA: ', category);
    
        Category.update(category, (err, id) => {

        
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion de la categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se actualizo correctamente',
                data: `${id}`
            });
        });

    },

    async delete(req, res) {
        const id = req.params.id;
        Category.delete(id, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de eliminar una categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria se elimino correctamente',
                data: `${id}`
            });
        });
    }
}