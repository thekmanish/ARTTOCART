import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductByCategory,
  deleteProduct,
} from "../controller/productController.js";

import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protectRoute, adminRoute, getAllProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/category/:category", getProductByCategory);
//router.get("/featured", getFeaturedProducts);

export default router;
