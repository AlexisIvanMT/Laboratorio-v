import {check, validationResult} from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//Check valida en un campo en especifico y validatorResult valida el resultado
import Usuario from '../models/Usuario.js';
import {generarJWT ,generarId} from '../helpers/tokens.js'
import {emailRegistro, emailOlvidePassword} from '../helpers/emails.js'

const formularioLogin = (req, res) => {
        //Primer parametro la vista, el segundo la informacion que se pasa a la vista
        res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            //Genera un token antes de renderizar la vista 
            csrfToken: req.csrfToken()
           
        })
 }

 const autenticar = async (req, res) => {
    //Validacion
    await check("email")
    .isEmail()
    .withMessage("El email es obligatorio")
    .run(req);
  await check("password")
    .notEmpty()
    .withMessage("El password es obligatorio")
    .run(req);

    let resultado = validationResult(req);

    //return res.json(resultado.array())
  
    //Verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
      //Errores
      return res.render("auth/login", {
        pagina: "Iniciar sesion",
        csrfToken : req.csrfToken(),
        //Se obtine un resultado que se convierte en un arreglo para iterarlo
        //Se itera dentro de un div en la pantalla de crearCuenta
        errores: resultado.array(),
      });
    }

    const {email, password} = req.body;
    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ where : {email}})

    if(!usuario){
      //Errores
      return res.render("auth/login", {
        pagina: "Iniciar sesion",
        csrfToken : req.csrfToken(),
        //Se obtine un resultado que se convierte en un arreglo para iterarlo
        //Se itera dentro de un div en la pantalla de crearCuenta
        errores: [{msg: 'El usuario no existe'}]
      });

    }

    //Comprobar si el usuario esta confirmado

    if(!usuario.confirmado){
      //Errores
      return res.render("auth/login", {
        pagina: "Iniciar sesion",
        csrfToken : req.csrfToken(),
        //Se obtine un resultado que se convierte en un arreglo para iterarlo
        //Se itera dentro de un div en la pantalla de crearCuenta
        errores: [{msg: 'Tu cuenta no ha sido confirmada'}]
      });

    }

    //Rvisar el password
    //Toma el password del prototipe de Usuario.js
    //Si retorna false el password es incorrecto
    if(!usuario.verificarPassword(password)){
       //Errores
       return res.render("auth/login", {
        pagina: "Iniciar sesion",
        csrfToken : req.csrfToken(),
        //Se obtine un resultado que se convierte en un arreglo para iterarlo
        //Se itera dentro de un div en la pantalla de crearCuenta
        errores: [{msg: 'El password es incorrecto'}]
      });
    }
    //Autenticar al usuario 
    const token = generarJWT( {id: usuario.id, nombre: usuario.nombre});

    //.sing metodo para crear un jwt 
    
    console.log(token)
    //Almacenar en un cookie
    //Anteriormente habilitamos el cookie parser en index 
    //Podemos usar la funcion en para poder escribir en los cookies
    //Se va almacenar en la base de datos no en memoria
    return res.cookie('_token', token, {
      //Evita los ataques cross
      //El cookie no es accesible desde la la api de jascript 
      httpOnly: true,
      //Permite los cookies en conecciones seguras
      //secure: true,
      //sameSite: true
    }).redirect('/mis-examenes')


 }

 const formularioRegistro = (req, res) => {

  console.log(req.csrfToken());

    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        //Se genera antes de que se renderice la vista
        csrfToken : req.csrfToken() 
    })
}

const registrar = async(req, res) => {
  //console.log(req.body);
  //Validacion
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre no puede ir vacio")
    .run(req);
  await check("email")
    .isEmail()
    .withMessage("El email no puede ir vacio")
    .run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe ser de almenos 6 caracteres")
    .run(req);
  await check("repetir_password")
    .equals(req.body.password)
    .withMessage("El password  debe ser igual")
    .run(req);

  let resultado = validationResult(req);

  //return res.json(resultado.array())

  //Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken : req.csrfToken(),
      //Se obtine un resultado que se convierte en un arreglo para iterarlo
      //Se itera dentro de un div en la pantalla de crearCuenta
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }
  //Extraemos los valore
  const { nombre, email, password } = req.body;
  //Verificar que el usuario no este duplicado
  //Consulta y busca en la base hasta maximo un usuario: email
  const existeUsuario = await Usuario.findOne({ where: { email } });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken : req.csrfToken(),
      //Se obtine un resultado que se convierte en un arreglo para iterarlo
      //Se itera dentro de un div en la pantalla de crearCuenta
      //Se crea un arreglo al vuelo, se crea en el momendto
      errores: [{ msg: "El Usuario ya está Registrado" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }
  //Almacenar un usuario
  //Guarda un usuario y nos regresa una instancia, usuario que esta en la base de datos
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });
  //Envia email de confirmacion
  //En lugar de pasar parametros. Le pasamos un objeto con la informacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  //Mostrar mensaje de confirmacion
  res.render("templates/mensaje", {
    pagina: "Cuenta creada correctamente",
    mensaje: "Hemos enviado un mail de confirmacion, preciona sobre el enlace",
  });

  //console.log(existeUsuario)
  //return;

  //insercion
  //const usuario = await Usuario.create(req.body)

  //res.json(usuario)
}
//Funcion que comprueba una cuenta
const confirmar = async(req, res) => {
 //Si queremos leer los parametros usamos, accedemos al nombre que le dimos a la ruta por ejemplo token
 //Aplicamos distruct
 const { token } = req.params;

 //Verificar si el token es valido
 //finOne 
 // Se lee un objeto
 const usuario = await Usuario.findOne({ where: {token} });

 //Existe el Usuario
 if (!usuario) {
    return res.render('auth/confirmar-cuenta', {
        //Cuando no exista el token. Esto imprime una vista
        pagina: "Error al confirmar tu cuenta",
        mensaje: "Hubo un error al confirmar tu cuenta, intenta de nuevo",
        error: true
    }) 
 }
  //Confirmar la cuenta
  console.log(usuario)
  //Se realizan cambios. Se borra el token
 usuario.token = null;
  //Cuando el usuario esta confirmado. El ORM lo trata como objeto y le da valor de 1
 usuario.confirmado=true;
  //Metodo del ORM que guarda loscambios en la BD
  await usuario.save();
  

  return res.render('auth/confirmar-cuenta', {
    //Cuando no exista el token. Esto imprime una vista
    pagina: "Cuenta confirmada",
    mensaje: "La cuenta se confirmo correctamente",

  })


}


const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: "Recupera tu acceso al Laboratorio de Veterinaria",
        csrfToken : req.csrfToken(),
    })
}

const resetPassword = async(req, res) => {

//Validacion
await check('email').isEmail().withMessage('Eso no parece ser un email').run(req);

let resultado = validationResult(req)
//Verificar que el resultado no este vacion
if (!resultado.isEmpty()) {
  //Errores
    return res.render('auth/olvide-password', { 
      pagina: "Recupera tu acceso - Laboratorio de Veterinaria",
      csrfToken : req.csrfToken(),
      errores: resultado.array()
    })
  
}

//Buscar el usuario
const { email } = req.body

const usuario = await Usuario.findOne({ where: { email }})
  if(!usuario){
    return res.render('auth/olvide-password', { 
      pagina: "Recupera tu acceso - Laboratorio de Veterinaria",
      csrfToken : req.csrfToken(),
      errores: [{msg: 'El Email no pertenece a ningun usuario'}]
    })

  }
    //Genera un token y enviar el email 
    usuario.token = generarId();
    //Almacenar en la base de datos
    await usuario.save();

    //Enviar un email 
    emailOlvidePassword({
      email:usuario.email,
      nombre: usuario.nombre,
      token: usuario.token
    })

    //Renderizar un mensaje 
    res.render("templates/mensaje", {
      pagina: "Restablece tu Password",
      mensaje: "Hemos enviado un email con las instrucciones",
    });

}

const comprobarToken = async (req, res, next) => {

  const { token } = req.params;

  const usuario = await Usuario.findOne({where: {token}})
  if (!usuario) {
      return res.render('auth/confirmar-cuenta',{
        pagina: 'Restablecetu password',
        mensaje: 'Hubo un error al validar tu informacion, intenta de nuevo',
        error: true
      })
    
  } 
  // Mostrar formulario paramodificar el password
  res.render('auth/reset-password', { 
      pagina: 'Restablece tu password',
      csrfToken : req.csrfToken()
  })

}

const nuevoPassword = async (req, res) => {
    //Validar el password
    await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe ser de almenos 6 caracteres")
    .run(req);

    let resultado = validationResult(req);

    //return res.json(resultado.array())
  
    //Verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
      //Errores
      return res.render("auth/reset-password", {
        pagina: "Restablece tu password",
        csrfToken : req.csrfToken(),
        //Se obtine un resultado que se convierte en un arreglo para iterarlo
        //Se itera dentro de un div en la pantalla de crearCuenta
        errores: resultado.array(),
        
      });
    }

    const { token } = req.params;
    const { password } = req.body;
    //Identificar quien hace el cambio
    const usuario = await Usuario.findOne({ where: {token}})

    console.log(usuario)
    //Hashear el nuevo password

    //Icrementa el numero para una contr mas segura
    const salt = await bcrypt.genSalt(10)
    //Rescribimos el paswword antes de guardarlo en la base de datos
    usuario.password = await bcrypt.hash(usuario.password, salt);
    //La siguiente vez que entre el token ya no va ser valido
    usuario.token = null;
    //Guardamos elnuevo hash en la base de datos
    await usuario.save();
    //Renderizamos una vista 
    res.render('auth/confirmar-cuenta', {
      pagina: 'Password Restablecido',
      mensaje: 'El password se guardo correctamente'
    })
  
}
 

 export{
    formularioLogin,
    autenticar,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
    comprobarToken,
    nuevoPassword,
    

 }