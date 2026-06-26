require("dotenv").config

const express = require("express")
const cors = require("cors")

const logger = require ("./middlewares/logger");
const productRoutes = require("./routes/productosRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger);

app.use((err, req, res, next) => {
    console.error(err);
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});