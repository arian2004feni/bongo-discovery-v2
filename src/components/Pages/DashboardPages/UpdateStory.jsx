import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function UpdateStory() {
  const { id } = useParams();
  const [newImages, setNewImages] = useState([]);
  const [previewNew, setPreviewNew] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const { data: story = {}, refetch } = useQuery({
    queryKey: ["update-story"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories/${id}`);
      reset({
        title: res.data.title,
        description: res.data.description,
      });
      return res.data;
    },
  });

  const removeOldImage = (imgUrl) => {
    Swal.fire({
      title: "Remove this image?",
      showCancelButton: true,
      confirmButtonText: "Remove",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosSecure
          .patch(`/stories/${id}/remove-image`, {
            url: imgUrl,
          })
          .then(() => {
            Swal.fire("Removed!", "Image removed successfully.", "success");
          });
      }
    });
  };

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
    setNewImages((prev) => [...prev, ...files]);
    setPreviewNew((prev) => [...prev, ...previews]);
  };

  const removeNewPreview = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewNew((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      Swal.fire({
        title: "Updating...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      // 1. Upload new images to imgbb
      const uploadedUrls = [];
      for (let file of newImages) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );
        uploadedUrls.push(res.data.data.url);
      }

      // 2. Update title/description
      await axiosSecure.patch(`/stories/${id}`, {
        title: data.title,
        description: data.description,
      });

      // 3. Add new images with $push
      if (uploadedUrls.length) {
        await axiosSecure.patch(`/stories/${id}/add-images`, {
          urls: uploadedUrls,
        });
      }

      Swal.close();
      refetch();
      Swal.fire("Success!", "Story updated successfully.", "success");
      navigate("../manage-stories");
    } catch (err) {
      Swal.close();
      Swal.fire("Error", "Failed to update story.", "error");
      console.log(err);
    }
  };

  if (!story) return <p className="text-center">Loading story...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Your Story</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <input
          type="text"
          {...register("title", { required: true })}
          className="input input-bordered w-full"
          placeholder="Story Title"
        />
        <textarea
          rows={6}
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full"
          placeholder="Story Description"
        />

        {/* OLD IMAGES */}
        <div>
          <p className="font-medium mb-2">Existing Images:</p>
          <div className="flex flex-wrap gap-2">
            {story.images?.map((url, i) => (
              <div key={i} className="relative w-20 h-20">
                <img
                  src={url}
                  alt="story"
                  className="w-full h-full rounded border object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeOldImage(url)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 text-xs"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* NEW IMAGE UPLOAD */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Add New Images:</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleNewImageChange}
            className="file-input file-input-bordered w-full"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {previewNew.map((img, i) => (
              <div key={i} className="relative w-20 h-20">
                <img
                  src={img.url}
                  alt="new preview"
                  className="w-full h-full object-cover border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeNewPreview(i)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 text-xs"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          <FaPlus /> Update Story
        </button>
      </form>
    </div>
  );
}
