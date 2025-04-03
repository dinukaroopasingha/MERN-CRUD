// client/src/utils/api.ts
const API_URL = "http://localhost:5500/api"; // සර්වර් URL එක

// සාමාන්‍ය fetch ඉල්ලීමක් සඳහා helper function
const fetchData = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.message || "යම් දෝෂයක් ඇතිවිය");
    } catch (err) {
      throw new Error(response.statusText || "යම් දෝෂයක් ඇතිවිය");
      console.log(err);
    }
  }

  if (response.status === 204) return null; // Handle empty response

  try {
    return await response.json();
  } catch (err) {
    throw new Error("Invalid JSON response");
    console.log(err);
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
