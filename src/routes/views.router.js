import { Router } from 'express';
import ProductManager from '../dao/managers/product.manager.js';
import ProductsModel from '../dao/models/product.model.js';
import CartManager from '../dao/managers/cart.manager.js';
import { onlyAdmin, onlyUser } from "../middleware/auth.js";
import passport from 'passport';

const viewsRouter = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();


viewsRouter.get("/products", passport.authenticate("current", {session: false}), onlyUser, async (req, res) => {
    const { limit, page } = req.query;

    try {
        const paginatedProducts = await ProductsModel.paginate({}, {limit, page});
        const products = paginatedProducts.docs;

        const productsFinal = products.map(
            product => {
                const {_id, ...rest} = product.toObject();
                return rest;
            }
        )

        return res.render("home", {
            status: "success",
            products: productsFinal,
            totalPages: paginatedProducts.totalPages,
            prevPage: paginatedProducts.prevPage,
            nextPage: paginatedProducts.nextPage,
            page: paginatedProducts.page,
            hasPrevPage: paginatedProducts.hasPrevPage,
            hasNextPage: paginatedProducts.hasNextPage, 
        });

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
});

viewsRouter.get("/realtimeproducts", passport.authenticate("current", {session: false}), onlyAdmin, (req, res) => {
    return res.render("realTimeProducts");
});

viewsRouter.get("/carts/:cid", async (req, res) => {
    const  id = req.params.cid;

    try {
        const cart = await cartManager.findCartById(id);

        let products = cart.products
        products = products.map(item => ({
            product: item.product.toString(),
            quantity: item.quantity,
            _id: item._id.toString()
        }));
        
        return res.render("carts", {products});

    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
});

viewsRouter.get("/register", (req, res) => {
    return res.render("register");
});

viewsRouter.get("/login", (req, res) => {
    return res.render("login");
});

export default viewsRouter;