const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");


const mongoDb = process.env.MONGO_DB;


const connect = async () => {

  try {

      const db = await mongoose.connect(mongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { name, host } = db.connection;
    console.log(`Conectado a la base de datos: ${name} en el host: ${host}`);
  } catch (error) {
    console.error(`No se ha podido conectar a la base de datos`, error);
  }
};

module.exports = { connect };
