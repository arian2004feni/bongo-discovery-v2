import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaImage, FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

export default function AddStory() {
  const { register, handleSubmit, reset } = useForm();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      Swal.fire({
        title: "Uploading...",
        text: "Please wait while your story is being submitted.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      // Upload images to imgbb
      const uploadedUrls = [];
      for (const file of images) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          formData
        );
        uploadedUrls.push(res.data.data.url);
      }

      // Build final story data
      const story = {
        title: data.title,
        description: data.description,
        images: uploadedUrls,
        name: user?.displayName,
        email: user?.email,
        createdAt: new Date().toISOString(),
      };

      // POST to your backend
      const result = await axios.post("http://localhost:3000/stories", story);

      Swal.close();

      if (result.data.insertedId || result.status === 200) {
        Swal.fire("Success", "Your story has been posted!", "success");
        reset();
        setImages([]);
        setImagePreviews([]);
        navigate("../manage-stories"); // Redirect after success
      }
    } catch (error) {
      console.error(error);
      Swal.close();
      Swal.fire("Error", "Failed to post your story.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Share Your Travel Story</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Story Title"
          className="input input-bordered w-full"
        />

        <textarea
          {...register("description", { required: true })}
          placeholder="Write your story..."
          rows={6}
          className="textarea textarea-bordered w-full"
        />

        <div>
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2">
              <FaImage /> Upload Images
            </span>
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {imagePreviews.map((img, idx) => (
              <div key={idx} className="relative w-20 h-20">
                <img
                  src={img.url}
                  alt="preview"
                  className="rounded border object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 text-xs"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          <FaPlus /> Post Story
        </button>
      </form>
    </div>
  );
}
