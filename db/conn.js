const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("thoughts", "root", "", {
    host: "localhost",
    dialect: "mysql"
});


try {
    sequelize.authenticate();
    console.log("conectamos com sucesso!");
} catch (error) {
    console.log(error);
}


module.exports = sequelize