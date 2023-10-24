const { DataTypes } = require('sequelize')
const DB = require('../db.config')

const Place = DB.define('Place', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    user_email: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
    },
    game: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    section: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    place:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false 
    }
}, {paranoid: true})

module.exports = Place