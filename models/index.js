import Caso from './Caso.js';
import Hematologia from './Hematologia.js';
import Urianalisis from './Urianalisis.js';
import Parasitologia from './Parasitologia.js';
import Usuario from './Usuario.js';

Usuario.hasMany(Caso, { foreignKey: 'usuarioId' });

Hematologia.belongsTo(Caso, { foreignKey: 'casoId' });
Urianalisis.belongsTo(Caso, { foreignKey: 'casoId' });
Parasitologia.belongsTo(Caso, { foreignKey: 'casoId' });

Caso.hasOne(Hematologia, { foreignKey: 'casoId' });
Caso.hasOne(Urianalisis, { foreignKey: 'casoId' });
Caso.hasOne(Parasitologia, { foreignKey: 'casoId' });

export {
  Caso,
  Hematologia,
  Urianalisis,
  Parasitologia,
  Usuario
};
