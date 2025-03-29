// client/src/utils/api.ts
const API_URL = "http://localhost:5500/api"; // සර්වර් URL එක

// සාමාන්‍ය fetch ඉල්ලීමක් සඳහා helper function
const fetchData = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorMessage = "Error";
      const contentType = response.headers.get("content-type");

      // Check if response is JSON before parsing
      if (contentType?.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        errorMessage = (await response.text()) || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Handle 204 No Content responses (common for DELETE)
    if (response.status === 204) return null;

    return response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
};

// අයිතම සඳහා API ක්‍රම - එක් object එකක් ලෙස export කරමු
export const itemsApi = {
  getItems: () => fetchData(`${API_URL}/items`),
  getItem: (id: string) => fetchData(`${API_URL}/items/${id}`),
  createItem: (itemData: {
    name: string;
    description: string;
    price: number;
  }) =>
    fetchData(`${API_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
    }),
  updateItem: (
    id: string,
    itemData: { name: string; description: string; price: number }
  ) =>
    fetchData(`${API_URL}/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
    }),
  deleteItem: (id: string) =>
    fetchData(`${API_URL}/items/${id}`, { method: "DELETE" }),
};
