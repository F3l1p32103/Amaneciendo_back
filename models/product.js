const db = require('../config/config');

const Product = {};

Product.findByEstanco = (id_estanco, result) => {

Product.findByEstanco = (id_estanco, result) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        P.description,
        P.price,
        P.image,
        P.id_estanco
    FROM
        products P
    WHERE
        P.id_estanco = ?
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
                console.log('Productos Encontrados Por Id Estanco', res);
                result(null, res);
            }
        }
    );
}

Product.findByCategory = (id_categoria, result) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        P.description,
        P.price,
        P.image,
        CONVERT(P.id_estanco, char) AS id_estanco
    FROM
        products as P
    WHERE 
        P.id_estanco = ?
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
                console.log('Id del nuevo producto:', res);
                result(null, res);
            }
        }
    );
}

Product.findByCategory = (id_categoria, result) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        P.description,
        P.price,
        P.image,
        P.id_categoria
    FROM
	    products P
    WHERE
	    P.id_categoria = ?
    `;

    db.query(
        sql,
        [id_categoria],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Productos Encontrados Por Categoria', res);
                result(null, res);
            }
        }
    );
}



Product.create = (product, result) => {

    const sql = `
    INSERT INTO
        products(
            name,
            description,
            price,
            image,
            id_categoria,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            product.name,
            product.description,
            product.price,
            product.image,
            product.id_categoria,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo producto:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}


Product.update = (product, result) => {

    const sql = `
    UPDATE
        products
    SET
        name = ?,
        description = ?,
        price = ?,
        image = ?,
        updated_at = ? 
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            product.name,
            product.description,
            product.price,
            product.image,
            new Date(),
            product.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del producto actualizado:', product.id);
                result(null, product.id);
            }
        }
    )
}

Product.delete = (id, result) => {
    const sql = `
    DELETE FROM
        products
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [id],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del producto eliminado:', id);
                result(null, id);
            }
        }
    )
}
}
module.exports = Product;