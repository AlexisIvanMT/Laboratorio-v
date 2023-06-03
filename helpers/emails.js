import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({path: '.env'});
//import { confirmar } from '../controllers/usuarioController';

//Tenomso dos emails uno para crear la cuenta y otro para cuando el usuario se le olvide su password 

const emailRegistro = async (datos) => {
    const  transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
      });

//Tenemos que leer el los datos para saber cual fue el que se envio a la base de datos 
//Extraemos los datos de forma individual 

      const {email, nombre, token} = datos;

      //Enviar el email, Primero inicia sesion y despues tiene acceso a la funcion send email usuando los servicios
      await transport.sendMail({
        from: 'Laboratorio v',
        //Se le envia el email a cada persona por esos se hace de forma dinamica 
        to:email,
        subject: 'Confima tu cuenta Laboratorio de veterinaria',
        text: 'Confima tu cuenta Laboratorio de veterinaria',
        //Colocamos un template con los datos
        html:`
            <p> Hola ${nombre}, comprueba tu cuenta en el Laboratorio de Veterinaria  </p> 

            <p> Confirma tu cuenta en el siguiente enlace <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}"> Confirmar cuenta </p> 
        `
      })

}

//olvide mi password
const emailOlvidePassword = async (datos) => {
    const  transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
      });

//Tenemos que leer el los datos para saber cual fue el que se envio a la base de datos 
//Extraemos los datos de forma individual 

      const {email, nombre, token} = datos;

      //Enviar el email, Primero inicia sesion y despues tiene acceso a la funcion send email usuando los servicios
      await transport.sendMail({
        from: 'Laboratorio v',
        //Se le envia el email a cada persona por esos se hace de forma dinamica 
        to:email,
        subject: 'Restablecer password Laboratorio de veterinaria',
        text: 'Restablecer password Laboratorio de veterinaria',
        //Colocamos un template con los datos
        html:`
            <p> Hola ${nombre}, has solicitado establecer tu password en el Laboratorio de Veterinaria  </p> 
            <p> Sigue elsiguiente enlace para generar tu password nuevo: </p>
            <p> Confirma tu cuenta en el siguiente enlace <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}"> Restablecer Password </a> </p>
            
            <p> Si no solicitaste cambio de password,puedes ignorar este mensaje   </p>
        `
      })

}

export {
    emailRegistro,
    emailOlvidePassword
}
