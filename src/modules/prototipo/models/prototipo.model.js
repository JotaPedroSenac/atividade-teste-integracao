const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDB');
const expositor = require('../../expositor/models/expositor.model')

const PrototipoModel = sequelize.define('Prototipo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    titulo: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    descricao: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    expositorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: expositor,
            key: 'id'
        }
    }
},
    {
        tableName: 'prototipo',
        timestamps: true,
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
        indexes: [
            {
                unique: true,
                fields: ['titulo', 'expositorId']
            }
        ]
    }

);

module.exports = PrototipoModel;