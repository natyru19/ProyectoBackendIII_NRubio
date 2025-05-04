import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const cartsRouter = Router();

cartsRouter.get("/", CartController.getCarts);
cartsRouter.get("/:cid", CartController.getCartById);
cartsRouter.post("/", CartController.createCart);
cartsRouter.post("/:cid/product/:pid", CartController.addProductToCart);
cartsRouter.put("/:cid", CartController.updateCart);
cartsRouter.put("/:cid/product/:pid", CartController.updateProductQuantity);
cartsRouter.delete("/:cid", CartController.clearCart);
cartsRouter.delete("/:cid/product/:pid", CartController.deleteProductFromCart);
cartsRouter.post("/:cid/purchase", CartController.processPurchase);

export default cartsRouter;