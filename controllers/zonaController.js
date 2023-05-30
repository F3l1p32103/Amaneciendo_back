const Zona = require('../models/zonaModel');

module.exports = {
    getAll(req, res) {
        Zona.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las zonas',
                    error: err
                });
            }
            return res.status(201).json(data);
        }
        );
}}

// exports.getById = (req, res) => {
//     Zona.getById(req.params.id, (error, result) => {
//         if (error) throw error;
//         res.json(result);
//     });
// };

// exports.findByZonas =(req, res) => {
//     const id_zonas = req.params.id_zonas;

//     Zona.findByZonas(id_zonas, (err, data) => {
//         if (err) {
//             return res.status(501).json({
//                 success: false,
//                 message: 'Hubo un error al momento de listar las zonas',
//                 error: err
//             });
//         }

//         return res.status(201).json(data);
//     });
// },

// exports.create = (req, res) => {
//     const newZone = {
//         tipo_zona: req.body.tipo_zona
//     };
//     Zona.create(newZone, (error, result) => {
//         if (error) throw error;
//         res.json({ message: 'Zona creada exitosamente', id: result.insertId });
//     });
// };

// exports.update = (req, res) => {
//     const updatedZone = {
//         id: req.body.id,
//         tipo_zona: req.body.tipo_zona
//     };
//     Zona.update(req.params.id, updatedZone, (error, result) => {
//         if (error) throw error;
//         res.json({ message: 'Zona actualizada exitosamente', rowsAffected: result.affectedRows });
//     });
// };

// exports.delete = (req, res) => {
//     Zona.delete(req.params.id, (error, result) => {
//         if (error) throw error;
//         res.json({ message: 'Zona eliminada exitosamente', rowsAffected: result.affectedRows });
//     });
// };