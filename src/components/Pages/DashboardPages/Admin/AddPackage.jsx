import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaImages, FaTimes, FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddPackage() {
  const { register, handleSubmit, watch, reset } = useForm();
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
//   const [tags, setTags] = useState({
//     tourHighlights: [],
//     inclusions: [],
//     exclusions: [],
//   });
  const tourDuration = watch("tourDurationDays");

  // Handle tag splitting
  //   const handleTagChange = (e, type) => {
  //     const input = e.target.value;
  //     if (input.includes(",,,")) {
  //       const split = input
  //         .split(",,,")
  //         .map((s) => s.trim())
  //         .filter(Boolean);
  //       setTags((prev) => ({
  //         ...prev,
  //         [type]: [...prev[type], ...split],
  //       }));
  //       setValue(type, ""); // clear textarea
  //     }
  //   };

  //   const removeTag = (type, index) => {
  //     setTags((prev) => ({
  //       ...prev,
  //       [type]: prev[type].filter((_, i) => i !== index),
  //     }));
  //   };

  // Handle multiple images incrementally
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

//   const onSubmit = async (data) => {
//     try {
//       const imageUrls = [];
//       for (let file of imageFiles) {
//         const formData = new FormData();
//         formData.append("image", file);

//         const res = await axios.post(
//           `https://api.imgbb.com/1/upload?key=${
//             import.meta.env.VITE_IMGBB_API_KEY
//           }`,
//           formData
//         );
//         imageUrls.push(res.data.data.url);
//       }

//       const tourPlan = [];
//       for (let i = 0; i < parseInt(tourDuration); i++) {
//         const day = data[`day${i}`];
//         const info = data[`info${i}`];
//         if (day && info) {
//           tourPlan.push({ day, info });
//         }
//       }

//       const payload = {
//         packageName: data.packageName,
//         slug: data.packageName.toLowerCase().replace(/\s+/g, "-"),
//         images: imageUrls,
//         tourDurationDays: parseInt(tourDuration),
//         groupSize: {
//           min: parseInt(data.groupMin),
//           max: parseInt(data.groupMax),
//         },
//         overview: data.overview,
//         tourHighlights: tags.tourHighlights,
//         tourPlan,
//         pricePerPerson: data.pricePerPerson,
//         inclusions: tags.inclusions,
//         exclusions: tags.exclusions,
//       };

//       const res = await axios.post("https://bongo-discovery-server.vercel.app/packages", payload);
//       if (res.data.insertedId || res.status === 200) {
//         Swal.fire("Success!", "Package added successfully.", "success");
//         reset();
//         setImageFiles([]);
//         setImagePreviews([]);
//         setTags({ tourHighlights: [], inclusions: [], exclusions: [] });
//       }
//     } catch (error) {
//       console.error("Upload failed:", error);
//       Swal.fire("Error", "Failed to upload package.", "error");
//     }
//   };
  const onSubmit = async (data) => {
    try {
      // 🔵 Show loading alert
      Swal.fire({
        title: "Uploading...",
        text: "Please wait while we upload your package.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Upload images
      const imageUrls = [];
      for (let file of imageFiles) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );
        imageUrls.push(res.data.data.url);
      }

      // Prepare tourPlan
      const tourPlan = [];
      for (let i = 0; i < parseInt(tourDuration); i++) {
        const day = data[`day${i}`];
        const info = data[`info${i}`];
        if (day && info) {
          tourPlan.push({ day, info });
        }
      }

      const payload = {
        packageName: data.packageName,
        slug: data.packageName.toLowerCase().replace(/\s+/g, "-"),
        images: imageUrls,
        tourDurationDays: parseInt(tourDuration),
        overview: data.overview,
        tourPlan,
        pricePerPerson: data.pricePerPerson,
      };

      const res = await axios.post("https://bongo-discovery-server.vercel.app/packages", payload);

      // 🔵 Close loading
      Swal.close();

      // ✅ Show success
      if (res.data.insertedId || res.status === 200) {
        Swal.fire("Success!", "Package added successfully.", "success");
        reset();
        setImageFiles([]);
        setImagePreviews([]);
        // setTags({ tourHighlights: [], inclusions: [], exclusions: [] });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      // 🔴 Show error
      Swal.close();
      Swal.fire("Error", "Failed to upload package.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Travel Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <input
          type="text"
          {...register("packageName", { required: true })}
          placeholder="Package Name"
          className="input input-bordered w-full"
        />

        <div className="flex gap-4">
          <input
            type="number"
            {...register("tourDurationDays", {
              required: true,
              max: 14,
            })}
            placeholder="Duration (Max 14 days)"
            className="input input-bordered w-full"
          />
          {/* <input
            type="number"
            {...register("groupMin", { required: true })}
            placeholder="Group Size Min"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            {...register("groupMax", { required: true })}
            placeholder="Group Size Max"
            className="input input-bordered w-full"
          /> */}
        </div>

        <textarea
          {...register("overview", { required: true })}
          placeholder="Overview"
          className="textarea textarea-bordered w-full"
        />

        {/* Highlights */}
        {/* <div>
          <label className="label">Tour Highlights</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.tourHighlights.map((tag, i) => (
              <span key={i} className="badge badge-primary gap-1 items-center">
                {tag}{" "}
                <button
                  type="button"
                  onClick={() => removeTag("tourHighlights", i)}
                >
                  <FaTimes className="text-xs" />
                </button>
              </span>
            ))}
          </div>
          <textarea
            {...register("tourHighlights")}
            placeholder="Enter highlight and type ,,, to split"
            onChange={(e) => handleTagChange(e, "tourHighlights")}
            className="textarea textarea-bordered w-full"
          />
        </div> */}

        {/* Tour Plan Inputs based on Duration */}
        {Array.from({ length: parseInt(tourDuration) || 0 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <input
              {...register(`day${i}`)}
              placeholder={`Day ${i + 1} Title`}
              className="input input-bordered w-full"
              required
            />
            <textarea
              {...register(`info${i}`)}
              placeholder={`Day ${i + 1} Info`}
              className="textarea textarea-bordered w-full"
              required
            />
          </div>
        ))}

        <input
          type="text"
          {...register("pricePerPerson", { required: true })}
          placeholder="Price Per Person"
          className="input input-bordered w-full"
        />

        {/* Inclusions */}
        {/* <div>
          <label className="label">Inclusions</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.inclusions.map((tag, i) => (
              <span key={i} className="badge badge-success gap-1 items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag("inclusions", i)}
                >
                  <FaTimes className="text-xs" />
                </button>
              </span>
            ))}
          </div>
          <textarea
            {...register("inclusions")}
            placeholder="Type and split with ,,,"
            onChange={(e) => handleTagChange(e, "inclusions")}
            className="textarea textarea-bordered w-full"
          />
        </div> */}

        {/* Exclusions */}
        {/* <div>
          <label className="label">Exclusions</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.exclusions.map((tag, i) => (
              <span key={i} className="badge badge-error gap-1 items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag("exclusions", i)}
                >
                  <FaTimes className="text-xs" />
                </button>
              </span>
            ))}
          </div>
          <textarea
            {...register("exclusions")}
            placeholder="Type and split with ,,,"
            onChange={(e) => handleTagChange(e, "exclusions")}
            className="textarea textarea-bordered w-full"
          />
        </div> */}

        {/* Image Upload */}
        <div>
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2">
              <FaImages /> Upload Images
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {imagePreviews.map((img, idx) => (
              <div key={idx} className="relative w-16 h-16">
                <img
                  src={img.url}
                  alt="preview"
                  className="rounded object-cover border w-full h-full"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 text-xs"
                  onClick={() => removeImage(idx)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          <FaUpload /> Submit Package
        </button>
      </form>
    </div>
  );
}
