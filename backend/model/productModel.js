import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    price: {
        type: Number,
        min: 0,
        required: [true, "Please provide your price"],
    },
    description: {
        type: String,
        required: [true, "Please provide your description"],
    },
    image: {
        type: String,
        required: [true, "Please provide your imageUrl"],
    },
    category: {
        type: String,
        required: [true, "Please provide your category"],
    },
    isFeatured: {
        type: Boolean,
        default: false,
    }  

},    {timestamps: true})

const Product = mongoose.model("Product", productSchema);
export default Product;
