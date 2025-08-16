import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function TourismAndGuideTabs() {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

   // Fetch random packages
  const {
    data: randomPackages = [],
    isLoading: isLoadingPackages,
    error: packageError,
  } = useQuery({
    queryKey: ["random-packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages/random");
      return res.data;
    },
  });

  // Fetch random tour guides
  const {
    data: randomGuides = [],
    isLoading: isLoadingGuides,
    error: guideError,
  } = useQuery({
    queryKey: ["random-tour-guides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tour-guides/random");
      return res.data;
    },
  });


  // if (isLoadingPackages || isLoadingGuides) return <div>Loading homepage data...</div>;
  if (isLoadingPackages || isLoadingGuides) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (packageError && guideError) {
    return <p className="text-red-500">Error loading data.</p>;
  }


  return (
    <div className="bg-base-200">
        <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Explore & Connect</h2>

      <Tabs>
        <TabList className="tabs tabs-boxed mb-6 flex justify-center">
          <Tab className="tab">Our Packages</Tab>
          <Tab className="tab">Meet Our Tour Guides</Tab>
        </TabList>

        {/* === Packages === */}
        <TabPanel>
          <div className="grid md:grid-cols-3 gap-6">
            {randomPackages.map((pkg) => (
              <div key={pkg._id} className="card bg-base-100 shadow-md">
                <figure>
                  <img
                    src={pkg.images?.[0]}
                    alt={pkg.packageName}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{pkg.packageName}</h3>
                  <p className="text-sm text-gray-500">
                    Tour Type: {pkg.slug?.split("-")[0]}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    Price: {pkg.pricePerPerson}৳
                  </p>
                  <div className="card-actions justify-end mt-2">
                    <button
                      onClick={() => navigate(`/packages/${pkg.slug}`)}
                      className="btn btn-outline btn-primary btn-sm"
                    >
                      View Package
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* === Tour Guides === */}
        <TabPanel>
          <div className="grid md:grid-cols-3 gap-6">
            {randomGuides.map((guide) => (
              <div key={guide._id} className="card bg-base-300 pt-6 shadow-md">
                <figure>
                  <img
                    src={
                      guide.photo ||
                      "https://placehold.co/400x300?text=Tour+Guide"
                    }
                    alt={guide.name}
                    className="h-48 w-48 rounded-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{guide.name}</h3>
                  <p className="text-sm text-gray-500">
                    Specialty: {guide.applicationTitle}
                  </p>
                  <div className="card-actions justify-end mt-2">
                    <button
                      onClick={() => navigate(`/tour-guide/${guide.email}`)}
                      className="btn btn-outline btn-secondary btn-sm"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
    </div>
  );
}
