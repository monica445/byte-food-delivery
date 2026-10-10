import type { Request, Response } from "express";
import * as categoryService from "../services/category.service";

export async function getShopCategories(req: Request, res: Response) {
  try {
    const categories = await categoryService.getShopCategories(
      req.params.shopId as string,
    );

    return res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error("Get shop categories error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const category = await categoryService.createCategory(
      req.user!.id,
      req.body,
    );

    return res.status(201).json({
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "SHOP_NOT_FOUND") {
        return res.status(404).json({
          message: "Shop not found.",
        });
      }

      if (error.message === "INVALID_CATEGORY_NAME") {
        return res.status(400).json({
          message: "Category name is required.",
        });
      }
    }

    console.error("Create category error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const category = await categoryService.updateCategory(
      req.user!.id,
      req.params.categoryId as string,
      req.body,
    );

    return res.status(200).json({
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "CATEGORY_NOT_FOUND") {
        return res.status(404).json({
          message: "Category not found.",
        });
      }

      if (error.message === "INVALID_CATEGORY_NAME") {
        return res.status(400).json({
          message: "Category name is required.",
        });
      }
    }

    console.error("Update category error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const result = await categoryService.deleteCategory(
      req.user!.id,
      req.params.categoryId as string,
    );

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "CATEGORY_NOT_FOUND") {
        return res.status(404).json({
          message: "Category not found.",
        });
      }

      if (error.message === "CATEGORY_HAS_PRODUCTS") {
        return res.status(400).json({
          message: "Cannot delete a category that contains products.",
        });
      }
    }

    console.error("Delete category error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}
