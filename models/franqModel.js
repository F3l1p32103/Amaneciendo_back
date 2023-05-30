const db = require('../config/config');

const Franquicia =  {};

Franquicia.getAll = (result) => {
    const sql = `SELECT id_franquicia, nombre_franquicia FROM franquicia`;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Franquicias obtenidas exitosamente:', data);
                result(null, data);
            }
        }
    )
}

Franquicia.create = (franquicia, result) => {
    const sql = `
    INSERT INTO
        franquicia(
            nombre_franquicia,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?)
    `;

    db.query(
        sql, 
        [
            franquicia.nombre_franquicia,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Franquicia creada exitosamente:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

Franquicia.update = (franquicia, result) => {
    const sql = `
    UPDATE
        franquicia
    SET
        nombre_franquicia = ?,
        updated_at = ?
    WHERE
        id_franquicia = ?
    `;

    db.query(
        sql,
        [
            franquicia.nombre_franquicia,
            new Date(),
            franquicia.id_franquicia
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Franquicia actualizada exitosamente:', franquicia.id_franquicia);
                result(null, franquicia.id_franquicia);
            }
        }
    )
}

Franquicia.delete = (id_franquicia, result) => {
    const sql = `
    DELETE FROM
        franquicia  
    WHERE
        id_franquicia = ?
    `;
    db.query(
        sql,
        [id_franquicia],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Franquicia eliminada exitosamente:', id_franquicia);
                result(null, id_franquicia);
            }
        }
    )
}

module.exports = Franquicia;