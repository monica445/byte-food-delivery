import { Router } from "express";
import { getShopCategories } from "../controllers/category.controller";
import {
  getCategoryProducts,
  getProductById,
  getShopProducts,
} from "../controllers/prouduct.controller";

const router = Router();

// Categories of a shop
router.get("/shops/:shopId/categories", getShopCategories);

// All available products in a shop
router.get("/shops/:shopId/products", getShopProducts);

// Products inside one menu category
router.get("/categories/:categoryId/products", getCategoryProducts);

// Product details
router.get("/products/:productId", getProductById);

export default router;
