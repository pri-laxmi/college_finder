"use client";

import { useEffect, useState } from "react";

interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  averagePackage: number;
  roi: number;
}

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [bestCollege, setBestCollege] =
    useState("");

  useEffect(() => {
    async function fetchComparison() {
      const params =
        new URLSearchParams(window.location.search);

      const names =
        params.get("names");

      if (!names) return;

      const res = await fetch(
        `/api/compare?names=${names}`
      );

      const data = await res.json();

      setColleges(data.colleges || []);
      setBestCollege(
        data.bestCollegeByROI || ""
      );
    }

    fetchComparison();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Compare Colleges
      </h1>

      {bestCollege && (
        <div className="mb-6 p-4 border rounded bg-green-100">
          Best ROI College: {bestCollege}
        </div>
      )}

      <div className="grid gap-4">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="border p-4 rounded"
          >
            <h2 className="text-xl font-semibold">
              {college.name}
            </h2>

            <p>
              Location: {college.location}
            </p>

            <p>
              Fees: ₹{college.fees}
            </p>

            <p>
              Rating: {college.rating}
            </p>

            <p>
              Average Package: ₹
              {college.averagePackage}
            </p>

            <p>ROI: {college.roi}</p>
          </div>
        ))}
      </div>
    </main>
  );
}