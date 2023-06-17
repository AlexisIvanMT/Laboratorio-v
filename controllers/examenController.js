//Lee el resultado de la validacio e indica si hubo errores
import { check, validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import Caso from '../models/Caso.js'; // Importa el modelo Caso si lo tienes definido
import Usuario from '../models/Usuario.js';
import Hematologia from '../models/Hematologia.js';
import Urianalisis from '../models/Urianalisis.js';
import Parasitologia from '../models/Parasitologia.js';

const admin = (req, res) => {
    res.render('examenes/admin',{
        pagina: 'Mis examenes',
        barra:true
    })
}

//formulario para crear un nuevo caso

const crearCaso = async (req, res) => {
    //Consultar usuario que crea el caso
    const [usuarios] = await Promise.all([
        Usuario.findAll()
    ])

    res.render('examenes/form-caso',{
        pagina: 'Llena el formulario para crear un caso',
        barra:true,
        csrfToken: req.csrfToken(),
        usuarios//Usuario de la base de datos
    })
}

const guardarCaso = async (req, res) => {
    // Validación
    
      
    let resultado = validationResult(req);

    //console.log(resultado);
  
    if (!resultado.isEmpty()) {

    //Consultar usuario que crea el caso
    const [usuarios] = await Promise.all([
        Usuario.findAll()
      ])
        
      return res.render('examenes/form-caso', {
        pagina: 'Llena el formulario para crear un caso',
        barra: true,
        csrfToken: req.csrfToken(),
        errores: resultado.array(),
        datos: req.body
      });
    }
  
    // Crear un registro
    //console.log(req.body)
    const {
        caso,
        medicoVeterinario,
        propietario,
        direccion,
        telefono,
        paciente,
        especie,
        raza,
        sexo,
        castrado,
        usuario
      } = req.body;
    

     const {id: usuarioId} = req.usuario
     
    try {
        const casoGuardado = await Caso.create({
        caso,
        medicoVeterinario,
        propietario,
        direccion,
        telefono,
        paciente,
        especie,
        raza,
        sexo,
        castrado,
        usuarioId : usuario

        })

        const {id} = casoGuardado

        res.redirect(`/examenes/form-hematologia/${id}`)
        
    } catch (error) {
        console.log(error);
    }
  }
  
  
  

const crearHematologia = async(req, res) => {
    //Consultar usuario que crea el caso
    const [casos] = await Promise.all([
        Caso.findAll()
      ])

    res.render('examenes/form-hematologia',{
        pagina: 'Llena el formulario de resultados',
        barra:true,
        csrfToken: req.csrfToken(),
        casos//Casos de la base de datos
    })
}

const guardarHematologia = async(req, res) => {

    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
    //Consultar usuario que crea el caso
    const [casos] = await Promise.all([
        Caso.findAll()
      ])
        
      return res.render('/examenes/form-hematologia', {
        pagina: 'Llena el formulario para crear un caso',
        barra: true,
        csrfToken: req.csrfToken(),
        errores: resultado.array(),
        datos: req.body
      });
    }
    
    //Crear registro
    const { id, paciente, ...names } = req.body;

    const {id: usuarioId} = req.usuario

    try {
        const linfocitosR = names.linfocitosR ? names.linfocitosR.toString() : ''; 
        const neutrofilos = names.neutrofilos ? names.neutrofilos.toString() : '';
        const linfocitos = names.linfocitos ? names.linfocitos.toString() : '';

        
      
        const hematologiaGuardado = await Hematologia.create({
          ...names,
          linfocitosR: linfocitosR, // Incluye el valor de linfocitosR en la creación del registro
          neutrofilos: neutrofilos,
          linfocitos: linfocitos,
        });

        
        const {id} = hematologiaGuardado
        res.redirect(`/examenes/form-urianalisis/${id}`);
      } catch (error) {
        console.log(error);
      }

}



const crearUrianalisis = async(req, res) => {
  //Consultar usuario que crea el caso
  
    const [casos] = await Promise.all([
        Caso.findAll()
      ])

    res.render('examenes/form-urianalisis',{
        pagina: 'Llena el formulario de resultados',
        barra:true,
        csrfToken: req.csrfToken(),
        casos//De la base de datos
    })
}

const guardarUrianalisis = async (req, res) => {
  
  
    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
    //Consultar usuario que crea el caso
    const [casos] = await Promise.all([
      Caso.findAll()
    ])
        
      return res.render('examenes/form-urianalisis', {
        pagina: 'Llena el formulario para crear un caso',
        barra: true,
        csrfToken: req.csrfToken(),
        errores: resultado.array(),
        datos: req.body
      });
    }

    //Crear registro
    const { id, paciente, ...names } = req.body;

    const {id: usuarioId} = req.usuario

    try {
        
      
        
        const urianalisisGuardado = await Urianalisis.create({
          
          ...names,
          
        });

        
        const {id} = urianalisisGuardado
        res.redirect(`examenes/form-parasitologia/${id}`);
      } catch (error) {
        console.log(error);
      }



}

const crearParasitologia = async(req, res) => {
     //Consultar usuario que crea el caso
  
     const [casos] = await Promise.all([
      Caso.findAll()
    ])
    res.render('examenes/form-parasitologia',{
        pagina: 'Llena el formulario de resultados',
        barra:true,
        csrfToken: req.csrfToken(),
        casos//De la base de datos
    })
}

const guardarParasitologia = async (req, res) => {
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
  //Consultar usuario que crea el caso
      
    return res.render('examenes/form-parasitologia', {
      pagina: 'Llena el formulario para crear un caso',
      barra: true,
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      datos: req.body
    });
  }

  //Crear registro
  const { id, paciente, ...names } = req.body;

  try {
      
    
      
      const parasitologiaGuardado = await Parasitologia.create({
        
        ...names,
        
      });

      
      const {id} = parasitologiaGuardado
      res.redirect(`/mis-examenes`);
    } catch (error) {
      console.log("-->", error);
    }

  
}



export{
        admin,
        crearCaso,
        crearHematologia,
        crearUrianalisis,
        crearParasitologia,
        guardarCaso,
        guardarHematologia,
        guardarUrianalisis,
        guardarParasitologia
}