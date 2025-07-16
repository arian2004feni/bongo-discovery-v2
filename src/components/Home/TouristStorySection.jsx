import { useEffect, useState } from "react";
import axios from "axios";
import { FacebookShareButton } from "react-share";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function TouristStorySection() {
  const [stories, setStories] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/stories/random")
      .then((res) => setStories(res.data))
      .catch((err) => console.error("Failed to load stories:", err));
  }, []);

  const handleShare = () => {
    if (!user) {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Tourist Stories</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-base-100 rounded-xl shadow-md overflow-hidden flex flex-col">
            <img
              src={story.images?.[0] || "https://placehold.co/400x250?text=Story+Image"}
              alt="Story"
              className="h-40 object-cover w-full"
            />
            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="font-bold text-lg mb-2">{story.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{story.description}</p>
              <div className="mt-4 flex items-center justify-between">
                {user ? (
                  <FacebookShareButton url={window.location.href} quote={story.title}>
                    <div className="btn btn-sm btn-outline btn-info flex items-center gap-2">
                      <FaFacebookF /> Share
                    </div>
                  </FacebookShareButton>
                ) : (
                  <button
                    className="btn btn-sm btn-outline btn-info"
                    onClick={() => handleShare()}
                  >
                    <FaFacebookF /> Share
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/community")}
          className="btn btn-primary"
        >
          View All Stories
        </button>
      </div>
    </div>
  );
}
