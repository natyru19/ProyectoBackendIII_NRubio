import { Router } from 'express';
import {generateUser, generateProduct} from '../utils/util.js';
import productService from '../services/product.service.js';
import userService from '../services/user.service.js';

const mocksRouter = Router();

mocksRouter.get("/mockingProducts", (req, res) => {
    const q = req.query.q || 50;
    const products = [];

    if(q){
        if(isNaN(q)){
            return res.status(400).json({message: "El parámetro q debe ser numérico"});
        }
    }
    for(let i=0; i<q; i++){
        products.push(generateProduct());
    }

    return res.status(200).json({status: "success", data: products});
});

mocksRouter.get("/mockingUsers", (req, res) => {
    const q = req.query.q || 50;
    const users = [];
    if(q){
        if(isNaN(q)){
            return res.status(400).json({message: "El parámetro q debe ser numérico"});
        }
    }
    
    for(let i=0; i<q; i++){        
        users.push(generateUser());
    }

    return res.status(200).json({status: "success", data: users});
});

mocksRouter.post("/generateData", async (req, res) => {
    const {users, products} = req.query;
    if(!users || !products){
        return res.status(400).json({message: "Faltan parámetros"});
    }
    const usrs = [];
    const prods = [];

    for(let i=0; i<users; i++){
        let newUsr = generateUser();
        let newUserDB = {
            firstName: newUsr.firstName,
            lastName: newUsr.lastName,
            email: newUsr.email,
            age: newUsr.age,
            password: newUsr.password,
            role: newUsr.role
        }
        let process = await userService.registerUser(newUserDB);
        usrs.push(process);
    }

    for(let i=0; i<products; i++){
        let newProd = generateProduct();
        let newProdDB = {
            title: newProd.title,
            description: newProd.description,
            code: newProd.code,
            price: newProd.price,
            status: newProd.status,
            stock: newProd.stock,
            category: newProd.category,
            thumbnails: newProd.thumbnails
        }
        let process = await productService.createProduct(newProdDB);
        prods.push(process);
    }

    return res.status(200).json({status: "success", data: [{users:usrs, products:prods}]});

});

export default mocksRouter;