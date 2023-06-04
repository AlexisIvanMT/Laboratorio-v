import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: '.env'});

//En un arrow podemos pasar solo un argumento
// Si eliminamos las llaves da por implicito el return

//Palabra para firmar el jwt
//Despues un objeto coloca la duracion del jwt

//Expira en un dia
const generarJWT = datos => jwt.sign({id: datos.id, nombre: datos.nombre},process.env.JWT_SECRET,{expiresIn:'1d'})



const generarId = () => Math.random().toString(32).substring(2) + Date.now().toString(32);

export {
    generarJWT,
    generarId,

}