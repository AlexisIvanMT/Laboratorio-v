import express from 'express';
import { body } from 'express-validator';
const router = express.Router();
import { admin, crearCaso, crearHematologia, crearUrianalisis, crearParasitologia, guardarCaso, guardarHematologia, guardarUrianalisis, guardarParasitologia } from '../controllers/examenController.js'
import protegerRuta from '../middleware/protegerRuta.js';

router.get('/mis-examenes', protegerRuta, admin );

// Crea los tres tipos de exámenes
// En la ruta va primero el formulario y después el método 

router.get('/examenes/form-caso', protegerRuta, crearCaso);
router.post('/examenes/form-caso', protegerRuta, guardarCaso);


router.get('/examenes/form-hematologia/:id', protegerRuta, crearHematologia);
router.post('/examenes/form-hematologia', protegerRuta, guardarHematologia);


router.get('/examenes/form-urianalisis/:id', protegerRuta,  crearUrianalisis);
router.post('/examenes/form-urianalisis', protegerRuta, guardarUrianalisis);

router.get('/examenes/form-parasitologia/:id', protegerRuta, crearParasitologia);
router.post('/examenes/form-parasitologia', protegerRuta, guardarParasitologia);

export default router;
