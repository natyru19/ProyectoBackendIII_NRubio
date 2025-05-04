import productRepository from "../repositories/product.repository.js";

class ProductService {
    async getPaginatedProducts({ limit, page, sort, query }) {
        return await productRepository.getPaginatedProducts({ limit, page, sort, query });
    }

    async getProductById(id) {
        return await productRepository.getProductById(id);
    }

    async createProduct(productData) {
        return await productRepository.createProduct(productData);
    }

    async updateProduct(id, updatedData) {
        return await productRepository.updateProduct(id, updatedData);
    }

    async deleteProduct(id) {
        return await productRepository.deleteProduct(id);
    }
}

export default new ProductService;
