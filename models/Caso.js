import { DataTypes } from 'sequelize';
import db from '../config/db.js';


const Caso = db.define('Caso', {
  caso: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  medicoVeterinario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  propietario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paciente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  raza: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  castrado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publicado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

export default Caso;
