const API_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function post<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      "Can't reach the server. Check your connection and try again.",
      0,
    );
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new ApiError(data.message ?? "Something went wrong.", res.status);
  return data as T;
}
