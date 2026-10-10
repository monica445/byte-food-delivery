import { Router } from "express";

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";

import { authenticate, requireRole } from "../middleware/auth.middleware";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/prouduct.controller";

const router = Router();

router.use(authenticate);
router.use(requireRole("SELLER"));

// Categories
router.post("/categories", createCategory);

router.patch("/categories/:categoryId", updateCategory);

router.delete("/categories/:categoryId", deleteCategory);

// Products
router.post("/products", createProduct);

router.patch("/products/:productId", updateProduct);

router.delete("/products/:productId", deleteProduct);

export default router;
