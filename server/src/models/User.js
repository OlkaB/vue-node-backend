module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Inavlid email address'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isValid (password) {
                    const passwordString = password.toString()
                    if (password.length < 8) {
                        throw new Error('Password must contain at least 8 characters')
                    }
                    if (!password.match(/(?=(?:.*[A-Z]){1,})/)) {
                        throw new Error('Password must contain at least one uppercase')
                    }
                    if (!password.match(/(?=(?:.*[a-z]){1,})/)) {
                        throw new Error('Password must contain at least one lowercase')
                    }
                    if (!password.match(/(?=(?:.*[!@#\$%\^&\*]){1,})/)) {
                        throw new Error('Password must contain at least one special character !@#$%^&*')
                    }
                }
            }
        }
    })
}