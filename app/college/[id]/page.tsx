
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  averagePackage: number;
  overview: string;
  placements: string;
}

export default function CollegeDetailPage() {
  const [college, setCollege] = useState<College | null>(null);

  const params = useParams();
  async function fetchCollege() {
    const res = await fetch(`/api/colleges/${params.id}`);
    const data = await res.json();
    setCollege(data);
  }

  async function saveCollege() {
    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const res = await fetch(
      "/api/saved",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          collegeId: college?.id,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("College saved");
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    fetchCollege();
  }, []);

  if (!college) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        {college.name}
      </h1>

      <p className="mb-2">
        Location: {college.location}
      </p>

      <p className="mb-2">
        Fees: ₹{college.fees}
      </p>

      <p className="mb-2">
        Rating: {college.rating}
      </p>

      <p className="mb-2">
        Average Package: ₹
        {college.averagePackage}
      </p>

      <p className="mb-4">
        {college.overview}
      </p>

      <button
        onClick={saveCollege}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Save College
      </button>

      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">
          Placements
        </h2>

        <p>{college.placements}</p>
      </div>
    </main>
  );
}