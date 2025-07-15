import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

export default function ManageStories() {
  const [stories, setStories] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/stories?email=${user?.email}`)
      .then((res) => setStories(res.data))
      .catch((err) => console.error(err));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This story will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/stories/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your story has been deleted.", "success");
              setStories((prev) => prev.filter((story) => story._id !== id));
            }
          })
          .catch((err) => {
            Swal.fire("Error", "Failed to delete story.", "error");
            console.error(err);
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Your Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-base-200 rounded-lg p-4 shadow">
            <h3 className="text-xl font-bold">{story.title}</h3>
            <p className="text-gray-600 mb-2">{story.description?.slice(0, 100)}...</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {story.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="story"
                  className="w-16 h-16 rounded border object-cover"
                />
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => navigate(`../update-story/${story._id}`)}
                className="btn btn-sm btn-outline btn-primary"
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                onClick={() => handleDelete(story._id)}
                className="btn btn-sm btn-outline btn-error"
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
