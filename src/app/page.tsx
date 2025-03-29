"use client";
import { useEffect, useState } from "react";
import { itemsApi } from "./utils/api";
import { Item } from "@/types/items";
import Link from "next/link";
export default function Home() {
  const { getItems, deleteItem } = itemsApi;

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //get Item
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
      setError("");
    } catch (err) {
      setError("Error in getting Items");
      console.error(err);
    }
  };

  //Delete Item
  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      fetchItems();
    } catch (err) {
      setError("Error in deleting Items");
      console.error(err);
    }
  };

  // take items when mount the component
  useEffect(() => {
    fetchItems();
  }, []);

  // if (loading) return <div>fetching...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white">
      <h1>Items</h1>
      <Link href="/items/new">
        <button>create new item</button>
      </Link>

      {items.length === 0 ? (
        <p>items not found</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>මිල: Rs.{item.price.toFixed(2)}</p>

              <Link href={`/items/${item._id}`}>
                <button>Edit</button>
              </Link>

              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
