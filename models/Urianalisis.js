import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// Definición del modelo Examen
const Urianalisis = db.define('Urianalisis', {
  anamnesis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tratamiento: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  metodoobtencion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apariencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  densidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  proteinas: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sangreHg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ph: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bilirrubina: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eritrocitos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leucocitos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  escamosas: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transitorias: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cilindros: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  renales: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cristales: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lipidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bacterias: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interpretacion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  tableName: 'Urianalisis',
});

// Exportar el modelo
export default Urianalisis;
