import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function AllTripsPage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get("https://bongo-discovery-server.vercel.app/packages")
      .then((res) => setPackages(res.data))
      .catch((err) => console.error("Error fetching packages:", err));
  }, []);

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
              <h3 className="text-xl font-semibold mb-1">{pkg.packageName}</h3>
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
