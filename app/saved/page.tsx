"use client";

import { useEffect, useState } from "react";

export default function SavedPage() {
  const [saved, setSaved] = useState([]);

  async function fetchSaved() {
    const token =
      localStorage.getItem("token");

    const res = await fetch(
      "/api/saved",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setSaved(data);
  }

  useEffect(() => {
    fetchSaved();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Saved Colleges
      </h1>

      <div className="grid gap-4">
        {saved.map((item: any) => (
          <div
            key={item.id}
            className="border p-4 rounded"
          >
            <h2 className="text-xl font-semibold">
              {item.college.name}
            </h2>

            <p>
              {item.college.location}
            </p>

            <p>
              Fees: ₹
              {item.college.fees}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}