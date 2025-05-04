import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/util.js";
import cartService from "../services/cart.service.js";

class UserService {
    async registerUser(userData) {
        const existsUser = await userRepository.getByEmail(userData.email);
        if(existsUser){
            throw new Error("El usuario ya existe");
        }

        const newCart = await cartService.createCart();
        
        userData.password = createHash(userData.password);
        userData.cart = newCart._id;

        return await userRepository.createUser(userData);
    }

    async loginUser(email, password){
        const user = await userRepository.getByEmail(email);
        if(!user || !isValidPassword(password, user)){
            throw new Error("Credenciales incorrectas");
        }
        return user;
    }
}

export default new UserService;