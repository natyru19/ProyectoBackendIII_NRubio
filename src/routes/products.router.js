import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const productsRouter = Router();
const productController = new ProductController();

productsRouter.get("/", productController.getProd);
productsRouter.get("/:pid", productController.getProdById);
productsRouter.post("/", productController.createProd);
productsRouter.put("/:pid", productController.updateProd);
productsRouter.delete("/:pid", productController.deleteProd);

export default productsRouter;
