import CartDAO from "../dao/cart.dao.js";

class CartRepository {
    async findCarts() {
        return await CartDAO.findCarts();
    }

    async findCartById(id) {
        return await CartDAO.findCartById(id);
    }

    async createCart() {
        return await CartDAO.createCart();
    }

    async addProductToCart(cartId, productId, quantity) {
        return await CartDAO.addProductToCart(cartId, productId, quantity);
    }

    async updateCart(cartId, updatedProducts) {
        return await CartDAO.updateCart(cartId, updatedProducts);
    }

    async updateProductQuantity(cartId, productId, newQuantity) {
        return await CartDAO.updateProductQuantity(cartId, productId, newQuantity);
    }

    async clearCart(cartId) {
        return await CartDAO.clearCart(cartId);
    }

    async deleteProductFromCart(cartId, productId) {
        return await CartDAO.deleteProductFromCart(cartId, productId);
    }
}

export default new CartRepository();