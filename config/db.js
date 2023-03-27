const {Sequelize} = require("sequelize");

const createDB = new Sequelize("url", "user", "pass", {
    dialect:"sqlite",
    host:"./config/db.sqlite"
})

module.exports = createDB;