import axios from "axios";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { FacebookIcon, FacebookShareButton } from "react-share";
import useAuth from "../hooks/useAuth"; // adjust if your path differs

export default function CommunityPage() {
  const [stories, setStories] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState(null);

  const openModal = (story) => setSelectedStory(story);
  const closeModal = () => setSelectedStory(null);

  useEffect(() => {
    axios.get("https://bongo-discovery-server.vercel.app/stories/all")
      .then(res => setStories(res.data))
      .catch(err => console.error("Error fetching stories:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-32">
      <h2 className="text-3xl font-bold mb-6 text-center">Community Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <div key={story._id} className="overflow-hidden bg-base-100 shadow-lg rounded-xl p-4">
            <div className="flex gap-2 mb-3 rounded-xl overflow-hidden">
              {story.images?.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="story"
                  className="w-full flex-1 h-40 object-cover rounded-md"
                />
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-1">{story.title}</h3>
            <p className="text-sm text-gray-600 mb-2">by {story.name}</p>
            <p className="text-gray-700 mb-3">{story.description?.slice(0, 150)}...</p>

            <div className="flex justify-between items-center">
              <button
              onClick={() => openModal(story)}
              className="btn btn-outline btn-sm mt-2"
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

        {/* DaisyUI Modal */}
      {selectedStory && (
        <dialog id="story_modal" className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              <FaTimes />
            </button>

            <h3 className="text-2xl font-bold mb-2">{selectedStory.title}</h3>
            <p className="mb-4">{selectedStory.description}</p>

            {/* Multiple Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {selectedStory.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Story ${i}`}
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>

            <div className="mt-4 text-right">
              <p className="text-sm text-gray-500">
                Shared by: {selectedStory.email}
              </p>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>close</button>
          </form>
        </dialog>
      )}
      </div>
    </div>
  );
}
