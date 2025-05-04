import CartService from "../services/cart.service.js";

class CartController {
    async getCarts(req, res) {
        try {
            const carts = await CartService.findCarts();
            if (carts && carts.length > 0) {
                return res.status(200).json({ status: "success", message: "Carritos encontrados", data: carts });
            }
            return res.status(404).json({ status: "error", message: "No se encontraron carritos", data: null });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    async getCartById(req, res) {
        const cartId = req.params.cid;
        try {
            const cart = await CartService.findCartById(cartId);
            if (cart) {
                return res.status(200).json({ status: "success", message: `Carrito con id: ${cartId} encontrado`, data: cart.products });
            }
            return res.status(404).json({ status: "error", message: "No se encontró el carrito", data: null });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    async createCart(req, res) {
        try {
            const newCart = await CartService.createCart();
            return res.status(201).json({ status: "success", message: "Carrito creado correctamente", data: newCart });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    async addProductToCart(req, res) {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body;
        try {
            const updatedCart = await CartService.addProductToCart(cid, pid, quantity);
            return res.status(200).json({ status: "success", message: "Producto agregado al carrito", data: updatedCart.products });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    async updateCart(req, res) {
        const cartId = req.params.cid;
        const updatedProducts = req.body;
        try {
            const updatedCart = await CartService.updateCart(cartId, updatedProducts);
            return res.status(200).json({ status: "success", message: "Carrito actualizado", data: updatedCart });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    async updateProductQuantity(req, res) {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        try {
            const updatedCart = await CartService.updateProductQuantity(cid, pid, quantity);
            return res.status(200).json({ status: "success", message: "Cantidad de producto actualizada", data: updatedCart });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    async clearCart(req, res) {
        const cartId = req.params.cid;
        try {
            const clearedCart = await CartService.clearCart(cartId);
            return res.status(200).json({ status: "success", message: "Carrito vaciado", data: clearedCart });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    async deleteProductFromCart(req, res) {
        const { cid, pid } = req.params;
        try {
            const updatedCart = await CartService.deleteProductFromCart(cid, pid);
            return res.status(200).json({ status: "success", message: "Producto eliminado del carrito", data: updatedCart });
        } catch (error) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    }

    async processPurchase(req, res) {
        const cartId = req.params.cid;
        const userEmail = req.user?.email;

    if (!userEmail) {
        return res.status(400).json({ status: "error", message: "No autorizado" });
    }

    try {

        const { unavailableProducts, totalAmount } = await CartService.processPurchase(cartId, userEmail);

        if (unavailableProducts.length > 0) {
            return res.status(400).json({status: "error", message: "Algunos productos no pudieron ser procesados por falta de stock", data: unavailableProducts});
        }

        req.session.ticketData = { ticket, remainingProducts };
        return res.redirect("/ticket");

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
    };

}


export default new CartController();