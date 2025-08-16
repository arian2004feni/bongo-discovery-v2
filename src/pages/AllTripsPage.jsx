import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function AllTripsPage() {
  const axiosSecure = useAxiosSecure();

  const {
    data: packages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error loading data.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-32">
      <h2 className="text-3xl font-bold text-center mb-8">All Tour Packages</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="bg-base-100 rounded-lg shadow-md overflow-hidden">
            <img
              src={pkg.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
              alt={pkg.packageName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1 line-clamp-1">{pkg.packageName}</h3>
              <p className="text-gray-600 mb-2">Duration: {pkg.tourDurationDays} days</p>
              <p className="text-primary font-bold mb-4">Price: {pkg.pricePerPerson}৳</p>

              <Link
                to={`/packages/${pkg.slug}`}
                className="btn btn-sm btn-outline w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
