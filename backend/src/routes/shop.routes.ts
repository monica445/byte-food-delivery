import { getMyShop, getMyShopProducts } from "../controllers/shop.controller";
import { Router } from "express";
import { authenticate, requireRole } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);
router.use(requireRole("SELLER"));

router.get("/me", getMyShop);
router.get("/me/products", getMyShopProducts);

export default router;
