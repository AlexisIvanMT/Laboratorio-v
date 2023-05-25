import {check, validationResult} from 'express-validator';
//Check valida en un campo en especifico y validatorResult valida el resultado
import Usuario from '../models/Usuario.js';
import {generarId} from '../helpers/tokens.js'
import {emailRegistro} from '../helpers/emails.js'

const formularioLogin = (req, res) => {
        //Primer parametro la vista, el segundo la informacion que se pasa a la vista
        res.render('auth/login', {
            pagina: 'Iniciar Sesión'
           
        })
 }

 const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
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
    pagina: "Cuenta creada corectamente",
    mensaje: "Hemos enviado un mail de confirmacion, preciona sobre el enlace",
  });

  //console.log(existeUsuario)
  //return;

  //insercion
  //const usuario = await Usuario.create(req.body)

  //res.json(usuario)
}
//Funcion que comprueba una cuenta
const confirmar =(req, res) => {
 //Si queremos leer los parametros usamos
 //Aplicamos distruct
 const {token} = req.params;
 console.log(token) 
}


const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar Acceso'
    })
}

 

 export{
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword
 }

