//import Sequelize from 'sequelize'// es una forma diferente de importar sequlize
import { DataTypes } from 'sequelize';
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
    

})

export default Usuario;