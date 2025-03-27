import { getItems, getItem } from "../../../../server/src/controllers/items";
const API_URL = "<http://localhost:5500/api>"; //server url

const fetchData = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "a error occurred while fetching");
  }
  return response.json();
};

export const getItems = () => fetchData(`${API_URL}/items`);
export const getItem = (id: string) => fetchData(`${API_URL}/items/${id}`);
const;
