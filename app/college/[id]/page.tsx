async function getCollege(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/colleges/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const college = await getCollege(id);

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

      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">
          Placements
        </h2>

        <p>{college.placements}</p>
      </div>
    </main>
  );
}