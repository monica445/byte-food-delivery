import type { Request, Response } from "express";
import * as shopService from "../services/shop.service";

export async function getMyShop(req: Request, res: Response) {
  try {
    const shop = await shopService.getMyShop(req.user!.id);

    return res.status(200).json({
      shop,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "SHOP_NOT_FOUND") {
      return res.status(404).json({
        message: "Shop not found.",
      });
    }

    console.error("Get my shop error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function getMyShopProducts(req: Request, res: Response) {
  try {
    const products = await shopService.getShopProducts(req.user!.id);

    console.log(products);
    return res.status(200).json({
      products,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "SHOP_NOT_FOUND") {
      return res.status(404).json({
        message: "Shop not found.",
      });
    }

    console.error("Get my shop products error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}
