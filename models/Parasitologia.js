import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// Definición del modelo Caso
const Parasitologia = db.define('Parasitologia', {
  anamnesis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tratamiento: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tecnica: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resultados: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Exportar el modelo
export default Parasitologia;