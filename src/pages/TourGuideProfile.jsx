import axios from "axios";
import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router";
import Swal from "sweetalert2";

export default function TourGuideProfile() {
  const { email } = useParams();
  const [guide, setGuide] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Fetch tour guide info
    axios
      .get(`http://localhost:3000/users/${email}`)
      .then((res) => setGuide(res.data))
      .catch(() => {
        Swal.fire("Error", "Tour guide not found", "error");
      });

    // Fetch guide stories
    axios
      .get(`http://localhost:3000/user/stories?email=${email}`)
      .then((res) => setStories(res.data))
      .catch(() => {
        Swal.fire("Error", "Could not load stories", "error");
      });
  }, [email]);

  if (!guide) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-32">

      {/* Guide Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <img
          src={guide.photo || "https://placehold.co/150x150"}
          alt="Guide"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-3xl font-bold">
            {guide.firstName} {guide.lastName}
          </h2>
          <p className="flex items-center gap-2 text-gray-500">
            <FaEnvelope /> {guide.email}
          </p>
          <p className="flex items-center gap-2 text-gray-500">
            <FaMapMarkerAlt />
            {guide?.address?.city || "Unknown City"},{" "}
            {guide?.address?.country || "Unknown Country"}
          </p>
          <p className="badge badge-success mt-2">Role: {guide.role}</p>
        </div>
      </div>

      {/* Stories */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Stories by {guide.firstName}
        </h3>

        {stories.length === 0 ? (
          <p>No stories posted yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {stories.map((story) => (
              <div
                key={story._id}
                className="bg-base-100 p-4 rounded-xl shadow space-y-2"
              >
                <img
                  src={story.images?.[0] || "https://placehold.co/400x250"}
                  alt="Story"
                  className="w-full h-52 object-cover rounded"
                />
                <h4 className="text-lg font-bold">{story.title}</h4>
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
