const db = require('../config/config');

const Estanco = {};

Estanco.findByEstanco = (id_zona, result) => {
    const sql = `
    SELECT
        e.id_estanco,
        e.nombre_estanco, e.direccion_estanco, 
        e.barrio, e.telefono_estanco, e.id_zona,
        e.id_franquicia, e.imagen_estanco, logo_estanco, 
        e.descripcion, e.hora_estanco, e.horario_estanco,
        e.longitud, e.latitud, e.id_usuario
    FROM
        estanco e
    INNER JOIN zona a ON e.id_zona = a.id_zonas
    WHERE 
        e.id_zona = ?
    `;

    db.query(
        sql,
        [id_zona],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo producto:', res);
                result(null, res);
            }
        }
    );
}


Estanco.findEstancoByUser = (id_usuario, result) => {
    const sql = `
    SELECT 
        e.* 
    FROM  
        estanco e 
    WHERE 
        e.id_usuario = ?;
    `;

    db.query(
        sql,
        [id_usuario],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Estancos encontrados por el id usuario:', res);
                result(null, res);
            }
        }
    );
}

Estanco.listarEstanco = (result) => {
    const sql = `
    SELECT
        e.*
    FROM
        estanco e
    `;

    db.query(
        sql,
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo estanco:', res);
                result(null, res);
            }
        }
    );
}

Estanco.findByEstancozona = (id_zona, result) => {
    const sql = `
    SELECT
        e.*
    FROM
        estanco e
    WHERE 
        e.id_estanco = ?
    `;  

    db.query(
        sql,
        [id_zona],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo estanco:', res);
                result(null, res);
            }
        }
    );
}

Estanco.create = (estanco, result) => {

    const sql = `
    INSERT INTO
        estanco(
            nombre_estanco,
            direccion_estanco,
            barrio,
            telefono_estanco,
            id_zona,
            id_franquicia,
            imagen_estanco,
            logo_estanco,
            descripcion,
            hora_estanco,
            horario_estanco,
            longitud,
            latitud, 
            id_usuario
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            estanco.nombre_estanco,
            estanco.direccion_estanco,
            estanco.barrio,
            estanco.telefono_estanco,
            estanco.id_zona,
            estanco.id_franquicia,
            estanco.imagen_estanco,
            estanco.logo_estanco,
            estanco.descripcion,
            estanco.hora_estanco,
            estanco.horario_estanco,
            estanco.longitud,
            estanco.latitud,
            estanco.id_usuario,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo estanco:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}



Estanco.update = (estanco, result) => {

    const sql = `
    UPDATE
        estanco
    SET
        nombre_estanco = ?,
        direccion_estanco = ?,
        barrio = ?,
        telefono_estanco = ?,
        id_zona = ?,
        id_franquicia = ?,
        imagen_estanco = ?,
        logo_estanco = ?,
        descripcion = ?,
        hora_estanco = ?,
        horario_estanco = ?,
        longitud = ?,
        latitud = ?,
        id_usuario = ?
    WHERE
        id_estanco = ?
    `;

    db.query(
        sql, 
        [
            estanco.nombre_estanco,
            estanco.direccion_estanco,
            estanco.barrio,
            estanco.telefono_estanco,
            estanco.id_zona,
            estanco.id_franquicia,
            estanco.imagen_estanco,
            estanco.logo_estanco,
            estanco.descripcion,
            estanco.hora_estanco,
            estanco.horario_estanco,
            estanco.longitud,
            estanco.latitud,
            estanco.id_estanco,
            estanco.id_usuario
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del estanco actualizado:', estanco.id_estanco);
                result(null, estanco.id_estanco);
            }
        }
    )
}

Estanco.delete = (id_estanco, result) => {
    const sql = `
    DELETE FROM
        estanco
    WHERE
        id_estanco = ?
    `;

    db.query(
        sql,
        [id_estanco],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del estanco eliminado:', id_estanco);
                result(null, id_estanco);
            }
        }
    )
}

module.exports = Estanco;