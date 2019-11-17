module.exports = {
    port: process.env.PORT || 8081,
    auth: {
        jwtSecret: process.env.JWT_SECRET || '@#$secretTokenIsSecret48326748'
    },
    db: {
        database: process.env.DB_NAME || 'myDatabase',
        user: process.env.DB_USER || 'myDatabase',
        password: process.env.DB_PASSWORD || 'myDatabase',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './myDatabase.sqlite'
        }
    }
}
