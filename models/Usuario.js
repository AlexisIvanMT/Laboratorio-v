//import Sequelize from 'sequelize'// es una forma diferente de importar sequlize
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const Usuario = db.define('Usuarios',{
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    //Un solo dato se omite type y los corchetes
    token:DataTypes.STRING,
    //Mecanismo para confirmar a los usuarios
    confirmado:DataTypes.BOOLEAN
},{
    hooks:{
        //Al crear pasa primero por esta funcion
        //El req.body se le pasa en automatico, se nombra usuario en la fucion
        //genSalt se utiliza comúnmente para almacenar contraseñas de forma segura
        beforeCreate: async function(usuario){
            //Icrementa el numero para una contr mas segura
            const salt = await bcrypt.genSalt(10)
            //Rescribimos el paswword antes de guardarlo en la base de datos
            usuario.password = await bcrypt.hash(usuario.password, salt)
        }
    }
})

export default Usuario;