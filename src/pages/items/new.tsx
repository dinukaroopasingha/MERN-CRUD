"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import { itemsApi } from "@/app/utils/api";
import { Item } from "../../types/items";

const { createItem } = itemsApi;

// const [items, setItems] = useState<Item[]>([]);

export default function NewItem() {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<Item, "_id">>({
    name: "",
    description: "",
    price: 0,
  });
  const [error, setError] = useState("");

  // when a changing inputs of form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  //  display form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createItem(formData);
      router.push("/"); //redirect to homepage
    } catch (err) {
      setError("Error in item create");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>New Item</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
