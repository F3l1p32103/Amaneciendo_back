const db = require('../config/config');

const Zona = {};

Zona.getAll = (result) => {
    const sql = `
    SELECT
        z.id_zona,
        z.tipo_zona
    FROM 
        zona z`;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Zonas obtenidas exitosamente:', data);
                result(null, data);
            }
        }
    )
}

Zona.findByZonas = (id_zonas, result) => {
    const sql = `
    SELECT
        z.id_zona,
        z.tipo_zona
    FROM
        zona z
    WHERE 
        z.id_zona = ?
    `;

    db.query(
        sql,
        [id_zonas],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la zona:', res);
                result(null, res);
            }
        }
    );
}

Zona.create = (zona, result) => {
    const sql = `
    INSERT INTO
        zona(
            tipo_zona,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?)
    `;

    db.query(
        sql, 
        [
            zona.tipo_zona,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Zona creada exitosamente:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

Zona.update = (category, result) => {
    const sql = `
    UPDATE
        zona
    SET
        tipo_zona = ?
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [
            zona.tipo_zona,
            new Date(),
            category.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Zona actualizada exitosamente:', category.id);
                result(null, category.id);
            }
        }
    )
}

Zona.delete = (id, result) => {
    const sql = `
    DELETE FROM
        zona
    WHERE
        id = ?
    `;
    db.query(
        sql,
        id,
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Zona eliminada exitosamente:', id);
                result(null, id);
            }
        }
    )
}


module.exports = Zona;