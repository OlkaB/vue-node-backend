module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    })
}