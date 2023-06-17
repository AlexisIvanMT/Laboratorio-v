import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Hematologia = db.define('Hematologia', {
  anamnesis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tratamiento: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  hematocitos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hemoglobina: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eritrocitos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vgm: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cgmh: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reticulocitos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plaquetas: {
    type: DataTypes.STRING,
    allowNull: false
  },
  solidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  leucocitos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  neutrofilos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bandas: {
    type: DataTypes.STRING,
    allowNull: false
  },
  linfocitos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  monocitos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eosinofilos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  basofilos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artefactos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  anisocitosis: {
    type: DataTypes.STRING,
    allowNull: false
  },
  policomasia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  basofilico: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hipocromia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rouleaux: {
    type: DataTypes.STRING,
    allowNull: false
  },
  metarrubricitos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poiquilocitosis: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  neutrofilos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  linfocitosR: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mielo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  microfilarias: {
    type: DataTypes.STRING,
    allowNull: false
  },
  macroplaquetas: {
    type: DataTypes.STRING,
    allowNull: false
  },
  interpretacion: {
    type: DataTypes.TEXT,
    allowNull: false
  },

});

export default Hematologia;
