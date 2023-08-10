// models/Guess.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Guess extends Model {}

Guess.init(
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
        soundId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'sound',
                key: 'id'
            }
        },
        guess: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'guess',
    }
);

module.exports = Guess;
