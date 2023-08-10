// models/Sound.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sound extends Model {}

Sound.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        soundFilePath: {
            type: DataTypes.STRING,
            allowNull: false
        },
        wordOrPhrase: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'sound',
    }
);

module.exports = Sound;
