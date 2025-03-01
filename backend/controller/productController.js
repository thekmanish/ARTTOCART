import Product from "../model/productModel.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        products,
        });
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Internal server error",
        });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, image } = req.body;

        let cloudinaryResponse = null;
        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {
                folder: "products",
            });
        }
        
        const product = await Product.create({
            name,
            price,
            description,
            image: cloudinaryResponse ?.secure_url ? cloudinaryResponse.secure_url : "",
            category,
           // isFeatured,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.log("error in createproductcontroller", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.image) {
            const imageId = product.image.split("/").pop().split(".")[0];

            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("Image deleted from Cloudinary");
            } catch (error) {
                console.log("Error deleting image from Cloudinary", error);
            }
        }

        await product.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.log("error in deleteProductController", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        
    }
}

export const getProductByCategory = async (req, res) => {
    const {category} = req.params;
    try {
        const products = await Product.find({category});
        res.json(products)
    } catch (error) {
        console.log("error in getProductByCategory", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}