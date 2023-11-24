const User = require("../models/User");
const Product = require("../models/Products");
const jwtSecret = process.env.JWT_SECRET;

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error getting products:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error getting product:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, image,stocks } = req.body;
        if (!name || !description || !price || !image || !stocks) {
            return res
                .status(400)
                .json({ error: "Please provide all required fields." });
        }
        const newProduct = new Product({
            name,
            description,
            price,
            image,
            stocks
        });
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, image,stocks } = req.body;
  //if exist then update
  const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;
        product.stocks = stocks || product.stocks;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }

    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}