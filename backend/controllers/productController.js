const User = require("../models/User");
const Product = require("../models/Products");
const jwtSecret = process.env.JWT_SECRET;

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error("Error getting products:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const getAllProductsWithPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // default to page 1 if not specified
        const perPage = parseInt(req.query.perPage) || 10; // default to 10 items per page if not specified

        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;

        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / perPage);

        const products = await Product.find().skip(startIndex).limit(perPage);

        const paginationInfo = {
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts
        };

        res.status(200).json({ products, paginationInfo });
    } catch (error) {
        console.error("Error getting products:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

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
        const { name, description, price, stocks } = req.body;
        console.log(req.body)
        req.body.image = req.file;
        let imageObj = req.body.image;
        if (!name || !description || !price || !stocks) {
            return res
                .status(400)
                .json({ error: "Please provide all required fields." });
        }
        
        const newProduct = new Product({
            name,
            description,
            price,
            image:process.env.DOMAIN+"/"+imageObj.filename,
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
        const { name, description, price, stocks,id } = req.body;
        req.body.image = req.file;
        let imageObj = req.body.image;
        console.log(req.body);
  //if exist then update

  const product = await Product.findById(id);
    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = imageObj.filename || product.image;
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
    deleteProduct,
    getAllProductsWithPagination
}