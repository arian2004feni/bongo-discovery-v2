import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

// Reusable retry fetch function
const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

export default function TourismAndGuideTabs() {
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pkgData, guideData] = await Promise.all([
          fetchWithRetry("https://bongo-discovery-server.vercel.app/packages/random"),
          fetchWithRetry("https://bongo-discovery-server.vercel.app/tour-guides/random"),
        ]);
        setPackages(pkgData);
        setGuides(guideData);
      } catch (err) {
        console.error("❌ Failed to load homepage data:", err.message);
      } finally {
        setLoading(false); // Optional
      }
    };

    loadData();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://bongo-discovery-server.vercel.app/packages/random")
  //     .then((res) => setPackages(res.data));
  //   axios
  //     .get("https://bongo-discovery-server.vercel.app/tour-guides/random")
  //     .then((res) => setGuides(res.data));
  // }, []);

  if (loading) return <div>Loading homepage data...</div>;


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
            {packages.map((pkg) => (
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
            {guides.map((guide) => (
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
                    {guide.address?.city}, {guide.address?.country}
                  </p>
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
