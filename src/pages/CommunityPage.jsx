import { useEffect, useState } from "react";
import axios from "axios";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth"; // adjust if your path differs

export default function CommunityPage() {
  const [stories, setStories] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/stories/all")
      .then(res => setStories(res.data))
      .catch(err => console.error("Error fetching stories:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-32">
      <h2 className="text-3xl font-bold mb-6 text-center">Community Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <div key={story._id} className="bg-base-100 shadow-lg rounded-xl p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {story.images?.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="story"
                  className="w-full h-40 object-cover rounded-md"
                />
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-1">{story.title}</h3>
            <p className="text-sm text-gray-600 mb-2">by {story.name}</p>
            <p className="text-gray-700 mb-3">{story.description?.slice(0, 150)}...</p>

            <div className="flex justify-between items-center">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => navigate(`/stories/${story._id}`)}
              >
                View Story
              </button>

              <FacebookShareButton
                url={`${window.location.origin}/stories/${story._id}`}
                quote={story.title}
                hashtag="#TourStory"
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  }
                }}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
