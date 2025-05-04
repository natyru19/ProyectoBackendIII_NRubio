import mongoose from "mongoose";
import config from "./config/config.js";

class DataBase {
    static #instance;

    constructor() {
        mongoose.connect(config.mongoUrl)
        .then(() => console.log("Se conectó a la BD exitosamente"))
        .catch((error) => console.log("Tenemos un error: " + error))
    }

    static getInstance() {
        if(this.#instance) {
            return this.#instance;
        }
        this.#instance = new DataBase();
        return this.#instance;
    }
}

export default DataBase;