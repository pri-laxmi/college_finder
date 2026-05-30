"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
}

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  async function fetchColleges() {
    const res = await fetch(
      `/api/colleges?search=${search}`
    );

    const data = await res.json();

    setColleges(data);
  }

  useEffect(() => {
    fetchColleges();
  }, []);
  function toggleCompare(name: string) {
  setSelected((prev) =>
    prev.includes(name)
      ? prev.filter((item) => item !== name)
      : [...prev, name]
  );
}
  function logout() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <main className="p-8">
      <div className="flex gap-4 mb-8">
        <a
          href="/saved"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Saved
        </a>

        <a
          href="/"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Home
        </a>

        <a
          href={
            selected.length > 0
              ? `/compare?names=${encodeURIComponent(selected.join(","))}`
              : "/compare"
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Compare
        </a>

  <a
    href="/login"
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Login
  </a>
   <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
</div>
      <h1 className="text-3xl font-bold mb-6">
        College Discovery Platform
      </h1>

      <input
        type="text"
        placeholder="Search colleges..."
        className="border p-2 rounded w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={fetchColleges}
        className="bg-black text-white px-4 py-2 rounded mb-6"
      >
        Search
      </button>
      <a
  href={`/compare?names=${selected.join(",")}`}
  className="bg-green-600 text-white px-4 py-2 rounded inline-block mb-6"
>
  Go To Compare
</a>

      <div className="grid gap-4">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="border p-4 rounded"
          >
            <h2 className="text-xl font-semibold">
              {college.name}
            </h2>

            <p>{college.location}</p>

            <p>Fees: ₹{college.fees}</p>

            <p>Rating: {college.rating}</p>

            <a
              href={`/college/${college.id}`}
              className="text-blue-600"
            >
              View Details
            </a>
            <button
  onClick={() => toggleCompare(college.name)}
  className="bg-blue-600 text-white px-3 py-1 rounded mt-3"
>
  {selected.includes(college.name)
    ? "Remove"
    : "Compare"}
</button>
          </div>
        ))}
      </div>
    </main>
  );
}