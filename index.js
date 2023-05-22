import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js'

// Crear la app
const app = express();

//Necesitamso habilitar la lectura de datos de forms
app.use(express.urlencoded({extended:true}));


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



//Definir el puerto y arrancar el proyecto
const port = 3000;
app.listen(port,() => {
    console.log(`El servidor esta corriendo en el puerto ${port}`)
});