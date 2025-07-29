const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDB');

const ExpositorModel = sequelize.define('Expositor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Precisa ser um email válido'
            }
        }
    },
    instituicao: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
},
    {
        tableName: 'expositores',
        timestamps: true,
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
    }

);

module.exports = ExpositorModel;