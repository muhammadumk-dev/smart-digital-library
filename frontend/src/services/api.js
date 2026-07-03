const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:5000/api";

export async function apiRequest(
  path,
  method = "GET",
  data = null,
  auth = true
) {
  try {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    const headers = {};

    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    if (auth && token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: data
        ? data instanceof FormData
          ? data
          : JSON.stringify(data)
        : null,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Request failed"
      );
    }

    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}