const passport = require('passport');
const zonaController = require('../controllers/zonaController');

module.exports = (app) => {


// Rutas para las zonas
// app.get('/api/zonas/findByZonas/:id_categor', passport.authenticate('jwt', {session: false}), zonaController.findByZonas);
app.get('/api/zonas/getAll', zonaController.getAll);
// app.post('/api/zonas/create', passport.authenticate('jwt', {session: false}), zonaController.create);
// app.put('/api/zonas/update', passport.authenticate('jwt', {session: false}) , zonaController.update);
// app.delete('/api/zonas/delete/:id', passport.authenticate('jwt', {session: false}), zonaController.delete);

}