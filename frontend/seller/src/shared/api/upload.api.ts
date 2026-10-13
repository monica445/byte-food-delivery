const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

interface UploadImageResponse {
  success: boolean;
  imageUrl: string;
  publicId: string;
}

export async function uploadImage(file: File, token: string): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  let response: Response;

  try {
    response = await fetch(`${API_URL}/uploads/images`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  } catch {
    throw new Error("Cannot reach the server. Please try again.");
  }

  const data = (await response
    .json()
    .catch(() => ({}))) as Partial<UploadImageResponse> & { message?: string };

  if (!response.ok || !data.imageUrl) {
    throw new Error(data.message ?? "Image upload failed.");
  }

  return data.imageUrl;
}
