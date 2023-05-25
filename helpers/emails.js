import nodemailer from 'nodemailer';

//Tenomso dos emails uno para crear la cuenta y otro para cuando el usuario se le olvide su password 

const emailRegistro = async (datos) => {
    const  transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "be51d6eb62f095",
                pass: "1d361f225ac341"
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
            <p> Hola ${nombre}, comprueba tu cuenta en el laboratorio de veterinaria  </p> 

            <p> Confirma tu cuanta en el siguiente enlace <a href= ""> Confirmar cuenta </p> 
        `
      })

}

export {
    emailRegistro
}
