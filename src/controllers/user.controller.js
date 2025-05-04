import userService from "../services/user.service.js";
import cartService from "../services/cart.service.js";
import jwt from "jsonwebtoken";
import UserManager from "../dao/managers/user.manager.js";
import { isValidPassword } from "../utils/util.js";
import UserDTO from "../dto/user.dto.js";
import config from "../config/config.js";

const userManager = new UserManager();

class UserController {
    async register (req, res) {
        const { firstName, lastName, email, age, password, role } = req.body;
        
    
        try {
            
            const newUser = await userService.registerUser({firstName, lastName, email, age, password, role});
            const newCart = await cartService.createCart();

            newUser.cart = newCart._id;
            await newUser.save();

            return res.status(201).json({status: "success", message: "Se creó el usuario correctamente", data: newUser});
    
        } catch (error) {
            return res.status(500).json({status: "error", message: error.message});
        }
    };
    
    async login (req, res) {
        const { email, password } = req.body;
        
        try {
            const user = await userService.loginUser(email, password);

            const token = jwt.sign({user: user.email, role: user.role}, config.jwtSecret, {expiresIn: 1000 * 60 * 60});
            res.cookie(config.cookieSecret, token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
            return res.status(200).json({status: "success", message: `Usuario loggeado correctamente`, data: user});

        } catch (error) {
            return res.status(500).json({status: "error", message: error.message});
        }
    };
    
    async logout (req, res) {
        res.clearCookie(config.cookieSecret, {httpOnly: true});
        res.redirect("/login");
    };
    
    async current (req, res) {
        
        if(req.user){        
            const userBD = await userManager.getByEmail(req.user.user);
            const userDTO = new UserDTO(userBD);
            return res.render("profile", {user: userDTO});
        }
        
        return res.status(400).json({status: "error", message: `No autorizado`, data: null});
    };
}

export default UserController;