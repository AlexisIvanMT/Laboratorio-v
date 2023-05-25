import express from "express";
import { formularioLogin, formularioRegistro, formularioOlvidePassword, registrar, confirmar, } from "../controllers/usuarioController.js";

const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro)
router.post('/registro', registrar)
//Obtenemos el token con una variable dinamica
router.get('/confirmar/:token',confirmar);

router.get('/Olvide-password', formularioOlvidePassword)

export default router;