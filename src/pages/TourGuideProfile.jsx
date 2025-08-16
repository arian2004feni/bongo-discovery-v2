import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function TourGuideProfile() {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: guideProfile = {},
    isLoading: guideLoading,
    isError: guideError,
  } = useQuery({
    queryKey: ["tour-guide-info"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/guide?email=${email}`);
      return res.data;
    },
  });
  
  const {
    data: userData = {},
    isLoading: userDataLoading,
    isError: userDataError,
  } = useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
  });
  
  const { 
    data: guideStories = [],
    isLoading: guideStoriesLoading,
    isError: guideStoriesError,
   } = useQuery({
    queryKey: ["all-tour-guides"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/stories?email=${email}`);
      return res.data;
    },
  });

  if (guideLoading || userDataLoading || guideStoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (guideError && userDataError && guideStoriesError) {
    return <p className="text-red-500">Error loading data.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-32">
      {/* Guide Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <img
          src={guideProfile.photo || "https://placehold.co/150x150"}
          alt="Guide"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-3xl font-bold">{guideProfile.name}</h2>
          <p className="flex items-center gap-2 text-gray-500">
            <FaEnvelope /> {guideProfile.email}
          </p>
          <p className="flex items-center gap-2 text-gray-500">
            <FaMapMarkerAlt />
            {userData?.address?.city || "Unknown City"},{" "}
            {userData?.address?.country || "Unknown Country"}
          </p>
          <p className="badge badge-success mt-2">Role: {userData?.role}</p>
        </div>
      </div>

      {/* Stories */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Stories by {guideProfile.name}
        </h3>

        {guideStories.length === 0 ? (
          <p>No stories posted yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {guideStories.map((story) => (
              <div
                key={story._id}
                className="bg-base-100 p-4 rounded-xl shadow space-y-2"
              >
                <img
                  src={story.images?.[0] || "https://placehold.co/400x250"}
                  alt="Story"
                  className="w-full h-52 object-cover rounded"
                />
                <h4 className="text-lg font-bold line-clamp-2">{story.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {story.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
