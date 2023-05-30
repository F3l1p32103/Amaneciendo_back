const categoriesController = require('../controllers/categoriesController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.get('/api/categories/getAll', categoriesController.getAll);
    app.get('/api/categories/getByEstanco/:id_estanco', categoriesController.getByEstanco);
    app.post('/api/categories/createWithImage', upload.array('image', 1), categoriesController.createWithImage);
    app.post('/api/categories/create', upload.array('image', 1), categoriesController.create);
    app.put('/api/categories/updateWithImage', passport.authenticate('jwt', {session: false}) , upload.array('image', 1), categoriesController.updateWithImage);
    app.put('/api/categories/update', passport.authenticate('jwt', {session: false}) , categoriesController.update);
    app.delete('/api/categories/delete/:id', passport.authenticate('jwt', {session: false}), categoriesController.delete);

}