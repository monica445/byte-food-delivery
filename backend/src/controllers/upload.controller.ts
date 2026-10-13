import type { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";

export async function uploadImageController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Please select an image.",
      });
      return;
    }

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "byteme",
          resource_type: "image",
        },
        (error, uploadedImage) => {
          if (error) {
            reject(error);
            return;
          }

          if (!uploadedImage) {
            reject(new Error("Cloudinary returned no image."));
            return;
          }

          resolve({
            secure_url: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
          });
        },
      );

      stream.end(req.file!.buffer);
    });

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully.",
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    next(error);
  }
}
