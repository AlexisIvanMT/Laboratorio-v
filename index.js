import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import examenRoutes from './routes/examenRoutes.js';
import db from './config/db.js'
import bodyParser from 'body-parser'

// Crear la app
const app = express();



//Necesitamso habilitar la lectura de datos de forms
app.use(express.urlencoded({extended:true}));

//Habilitar cookie parser para una segunda validacion de formularios
app.use(cookieParser());

//Habilitar el CSRF
let csrfProtection = csrf({ cookie: true });
app.use("/auth", csrfProtection, usuarioRoutes )
app.use("/examenes", csrfProtection, examenRoutes)
//Conexion a la base de datos 
try {
    await db.authenticate();
    db.sync();
    console.log('Conexion Correcta a la Base de Datos');
} catch (error) {
    console.log(error)
}

//Habilitar pug
app.set('view engine', 'pug');
//Encuentra todas las vistas en viwes
app.set('views', './views');

//Carpeta publica, carpeta de stilos y recursos
app.use(express.static('public'));

//Ruting. Todas las rutas inician /auth
app.use('/auth',usuarioRoutes);
app.use('/',examenRoutes);


//Definir el puerto y arrancar el proyecto
//El puerto lo asigna el deployment
const port = process.env.PORT || 3000;//3000
app.listen(port,() => {
    console.log(`El servidor esta corriendo en el puerto ${port}`)
});