import type { Request, Response } from "express";
import * as productService from "../services/product.service";

export async function getShopProducts(req: Request, res: Response) {
  try {
    const products = await productService.getShopProducts(
      req.params.shopId as string,
    );

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Get shop products error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function getCategoryProducts(req: Request, res: Response) {
  try {
    const products = await productService.getCategoryProducts(
      req.params.categoryId as string,
    );

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Get category products error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const product = await productService.getProductById(
      req.params.productId as string,
    );

    return res.status(200).json({
      product,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    console.error("Get product error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await productService.createProduct(req.user!.id, req.body);

    return res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "SHOP_NOT_FOUND") {
        return res.status(404).json({
          message: "Shop not found.",
        });
      }

      if (error.message === "CATEGORY_NOT_FOUND") {
        return res.status(404).json({
          message: "Category not found.",
        });
      }

      if (error.message === "INVALID_PRODUCT_NAME") {
        return res.status(400).json({
          message: "Product name is required.",
        });
      }

      if (error.message === "INVALID_PRODUCT_PRICE") {
        return res.status(400).json({
          message: "Product price must be a positive integer or zero.",
        });
      }
    }

    console.error("Create product error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const product = await productService.updateProduct(
      req.user!.id,
      req.params.productId as string,
      req.body,
    );

    return res.status(200).json({
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "PRODUCT_NOT_FOUND") {
        return res.status(404).json({
          message: "Product not found.",
        });
      }

      if (error.message === "CATEGORY_NOT_FOUND") {
        return res.status(404).json({
          message: "Category not found.",
        });
      }

      if (error.message === "INVALID_PRODUCT_NAME") {
        return res.status(400).json({
          message: "Product name is required.",
        });
      }

      if (error.message === "INVALID_PRODUCT_PRICE") {
        return res.status(400).json({
          message: "Product price must be a positive integer or zero.",
        });
      }
    }

    console.error("Update product error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const result = await productService.deleteProduct(
      req.user!.id,
      req.params.productId as string,
    );

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    console.error("Delete product error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}
