import CartRepository from "../repositories/cart.repository.js";
import productRepository from "../repositories/product.repository.js";
import ticketService from "./ticket.service.js";

class CartService {
    async findCarts() {
        return await CartRepository.findCarts();
    }

    async findCartById(id) {
        return await CartRepository.findCartById(id);
    }

    async createCart() {
        return await CartRepository.createCart();
    }

    async addProductToCart(cartId, productId, quantity) {
        return await CartRepository.addProductToCart(cartId, productId, quantity);
    }

    async updateCart(cartId, updatedProducts) {
        return await CartRepository.updateCart(cartId, updatedProducts);
    }

    async updateProductQuantity(cartId, productId, newQuantity) {
        return await CartRepository.updateProductQuantity(cartId, productId, newQuantity);
    }

    async clearCart(cartId) {
        return await CartRepository.clearCart(cartId);
    }

    async deleteProductFromCart(cartId, productId) {
        return await CartRepository.deleteProductFromCart(cartId, productId);
    }

    async processPurchase(cartId, userEmail) {
        const cart = await CartRepository.findCartById(cartId);

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        let totalAmount = 0;
        const unavailableProducts = [];

        const purchasedProducts = [];

        for (const item of cart.products) {
            const product = await productRepository.getProductById(item.product._id);

            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await productRepository.updateProduct(product._id, product);
                totalAmount += product.price * item.quantity;
                purchasedProducts.push(item);
            } else {
                unavailableProducts.push(item.product._id);
            }
        }

        
        if (purchasedProducts.length > 0) {
            await ticketService.createTicket(totalAmount, userEmail);

            
            const remainingProducts = cart.products.filter(p =>
                unavailableProducts.includes(p.product._id.toString())
            );

            cart.products = remainingProducts;
            await CartRepository.updateCart(cartId, cart.products);
        }

        return { unavailableProducts, totalAmount };
    }

}

export default new CartService;