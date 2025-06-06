import mongoose from "mongoose";
import assert from "assert";
import User from "../src/dao/user.dao.js";

mongoose.connect(`mongodb+srv://nataliarubio:coderhouse@cluster0.ztm42.mongodb.net/ProyectoBackendII?retryWrites=true&w=majority&appName=Cluster0`);

describe("Testeamos el DAO de usuarios", function() {

    before(function() {
        this.userDao = new User();
    });

    /*
    beforeEach(async function() {
        await mongoose.connection.collections.users.drop(); 
        this.timeout(5000); 
    });
    */


    it("El get de usuarios retona un array", async function() {
        const result = await this.userDao.get();
        assert.strictEqual(Array.isArray(result), true);
    });

    it("El Dao debe agregar correctamente un elemento a la base de datos.", async function (){
        let user = {
            firstName: "Luis", 
            lastName: "Barrios", 
            email: "luis@barrios.com", 
            age: 52,
            password: "luis"
        }

        const result = await this.userDao.save(user)
        assert.ok(result._id);
    });

    after(async function () {
        await mongoose.disconnect();
    });
});



