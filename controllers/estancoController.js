const Estanco = require('../models/estancoModel');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');


module.exports = {

    create(req, res) {

        const estanco = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        Estanco.create(estanco, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del estanco',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            });

        });

    },


    async createWithImage(req, res) {

        const estanco = JSON.parse(req.body.estanco); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `imagen_estanco_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                estanco.image = url;
            }
        }

        Estanco.create(estanco, (err, id_estanco) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del estanco',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: `${id_estanco}`
            });

        });

    },
    
    findByEstanco(req, res) {
        const id_zona = req.params.id_zona;

        Estanco.findByEstanco(id_zona, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las estancos por zonas',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    findEstancoByUser(req, res) {
        const id_usuario = req.params.id_usuario;

        Estanco.findEstancoByUser(id_usuario, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las estancos por usuario',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    listarEstanco(req, res) {
        Estanco.listarEstanco((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las estancos',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },
    findByZona(req, res) {
        const id_zona = req.params.id_zona;

        Estanco.findByEstancozona(id_zona, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las estancos',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    
    update(req, res) {
        const estanco = req.body;

        Estanco.update(estanco, (err, id_estanco) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion del estanco',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El estanco se actualizo correctamente',
                data: `${id_estanco}`
            });
        })
    },

    
    async updateWithImage(req, res) {
        const estanco = JSON.parse(req.body.estanco); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                estanco.imagen_estanco = url;
            }
        }

        Estanco.update(estanco, (err, data) => {

        
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion del estanco',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El estanco se actualizo correctamente',
                data: data
            });
        

        });

    },

    async delete(req, res) {
        const id_estanco = req.params.id_estanco;

        Estanco.delete(id_estanco, (err, id_estanco) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de eliminar el estanco',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El estanco se elimino correctamente',
                data: `${id_estanco}`
            });
        });
    },

}