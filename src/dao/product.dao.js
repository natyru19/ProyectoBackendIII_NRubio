import ProductsModel from "./models/product.model.js";

class ProductDAO {
    async getPaginatedProducts({ limit, page, sort, query }) {
        const options = {
            limit,
            page,
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
        };

        const filter = query ? { category: query } : {};

        return await ProductsModel.paginate(filter, options);
    }

    async getProductById(id) {
        return await ProductsModel.findById(id);
    }

    async createProduct(productData) {
        return await ProductsModel.create(productData);
    }

    async updateProduct(id, updatedData) {
        return await ProductsModel.findByIdAndUpdate(id, updatedData, { new: true });
    }

    async deleteProduct(id) {
        return await ProductsModel.findByIdAndDelete(id);
    }
}

export default new ProductDAO();
