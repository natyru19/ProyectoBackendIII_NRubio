import productDAO from "../dao/product.dao.js";

class ProductRepository {
    async getPaginatedProducts({ limit, page, sort, query }) {
        return await productDAO.getPaginatedProducts({ limit, page, sort, query });
    }

    async getProductById(id) {
        return await productDAO.getProductById(id);
    }

    async createProduct(productData) {
        return await productDAO.createProduct(productData);
    }

    async updateProduct(id, updatedData) {
        return await productDAO.updateProduct(id, updatedData);
    }

    async deleteProduct(id) {
        return await productDAO.deleteProduct(id);
    }
}

export default new ProductRepository;
