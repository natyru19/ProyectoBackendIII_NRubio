import CartModel from "./models/cart.model.js";

class CartDAO {
    async findCarts() {
        return await CartModel.find();
    }

    async findCartById(id) {
        return await CartModel.findById(id);
    }

    async createCart() {
        return await CartModel.create({ products: [] });
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await CartModel.findById(cartId);
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return await cart.save();
    }

    async updateCart(cartId, updatedProducts) {
        return await CartModel.findByIdAndUpdate(cartId, { products: updatedProducts }, { new: true });
    }

    async updateProductQuantity(cartId, productId, newQuantity) {
        const cart = await CartModel.findById(cartId);
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity = newQuantity;
        }

        return await cart.save();
    }

    async clearCart(cartId) {
        return await CartModel.findByIdAndUpdate(cartId, { products: [] }, { new: true });
    }

    async deleteProductFromCart(cartId, productId) {
        const cart = await CartModel.findById(cartId);
        const newProducts = cart.products.filter(p => p.product.toString() !== productId);
        
        return await CartModel.findByIdAndUpdate(cartId, { products: newProducts }, { new: true });
    }
}

export default new CartDAO();