import { Router } from "express";
import { uploadImageController } from "../controllers/upload.controller";
import { uploadImage } from "../middleware/upload.middleware";

const router = Router();

router.post("/images", uploadImage.single("image"), uploadImageController);

export default router;
