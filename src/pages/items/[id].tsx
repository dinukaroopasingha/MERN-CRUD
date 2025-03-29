"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { itemsApi } from "@/app/utils/api";
import { Item } from "@/types/items";

export default function EditItem() {
  const { getItem, updateItem } = itemsApi;
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // take item data
  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const data = await getItem(id as string);
        setFormData(data);
        setError("");
      } catch (err) {
        setError("Error in take item");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  // when a change of form inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  //display form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      await updateItem(formData._id, {
        name: formData.name,
        description: formData.description,
        price: formData.price,
      });
      router.push("/"); //redirect to homepage
    } catch (err) {
      setError("Error in updating items");
      console.error(err);
    }
  };
  if (loading) return <div>Completing</div>;
  if (!formData) return <div>Item not founded</div>;

  return (
    <div>
      <h1>Edit Item</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
