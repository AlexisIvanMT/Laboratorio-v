import express from "express";
import { formularioLogin, formularioRegistro, formularioOlvidePassword, registrar, confirmar, resetPassword, comprobarToken, nuevoPassword} from "../controllers/usuarioController.js";

const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
//Obtenemos el token con una variable dinamica
router.get('/confirmar/:token',confirmar);

router.get('/olvide-password', formularioOlvidePassword);
//Resetear el pasword a traves de esta URL
router.post('/olvide-password', resetPassword);

//Almacena el nuevo password, se va comparar el token
router.get('/olvide-password/:token', comprobarToken); 
//El token se envia mediante la URL
router.post('/olvide-password/:token', nuevoPassword);  



export default router;