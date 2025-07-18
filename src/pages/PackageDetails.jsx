import axios from "axios";
import "flatpickr/dist/themes/material_green.css";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import PackageImageCarousel from "../components/ImagesGallery";
import useAuth from "../hooks/useAuth";

export default function PackageDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pkg, setPkg] = useState(null);
  const [guides, setGuides] = useState([]);
  const [role, setRole] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    axios.get(`http://localhost:3000/packages/${slug}`).then((res) => {
      setPkg(res.data);
      setValue("packageName", res.data.packageName);
      setValue("price", res.data.pricePerPerson);
    });

    axios.get("http://localhost:3000/tour-guides").then((res) => {
      setGuides(res.data);
    });

    axios.get(`http://localhost:3000/users/${user?.email}/role`).then((res) => {
      setRole(res.data.role);
    });
  }, [slug, setValue, setRole, user]);

  // console.log(role);
  const onSubmit = async (data) => {
    if (!user) return navigate("/login");

    if (role !== "tourist")
      return Swal.fire("Error", "Only Tourist can book a tour", "error");

    // Find the guide by name
    const selectedGuide = guides.find((g) => g.name === data.tourGuideName);
    if (!selectedGuide) {
      return Swal.fire("Error", "Selected tour guide not found", "error");
    }

    const bookingData = {
      packageName: pkg.packageName,
      packageSlug: pkg.slug,
      touristName: user.displayName || "Not found",
      touristEmail: user.email || "Not found",
      touristImage: user.photoURL || "Not found",
      price: pkg.pricePerPerson,
      tourDate: data.tourDate,
      tourGuideName: data.tourGuideName,
      tourGuideEmail: selectedGuide.email,
      status: "pending",
    };

    try {
      await axios.post(
        "http://localhost:3000/bookings",
        bookingData
      );
      Swal.fire({
        icon: "success",
        title: "Confirm your Booking",
        text: "Your booking is submitted and pending approval.",
        confirmButtonText: "Go to My Bookings",
      }).then((res) => {
        if (res.isConfirmed) navigate(`/dashboard/${user.email}/my-bookings`);
      });
    } catch (error) {
      Swal.fire("Error", "Booking failed", "error");
    }
  };

  if (!pkg) return <div className="text-center mt-10 pt-32">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24">
      {/* Gallery */}
      <PackageImageCarousel images={pkg.images} />

      {/* About Tour */}
      <h2 className="text-center text-2xl font-bold my-2">About the Tour</h2>
      <p className="mb-6 text-center">{pkg.overview}</p>

      {/* Tour Plan */}
      <div className="my-12">
        <h2 className="text-center text-3xl font-bold mb-8">Tour Plans</h2>
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          {pkg.tourPlan.map((plan, i) => (
            <li key={i}>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                className={`${
                  i % 2 === 0
                    ? "timeline-start mb-10 md:text-end"
                    : "timeline-end md:mb-10"
                }`}
              >
                <time className="font-mono italic">Day {i + 1}</time>
                <div className="text-lg font-black">{plan.day}</div>
                {plan.info}
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>

      {/* Tour Guide List */}
      <h2 className="text-2xl font-bold mb-2 text-center">
        Select a Tour Guide
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {guides.map((guide) => (
          <div
            key={guide._id}
            className="p-4 rounded shadow bg-base-200 hover:bg-base-100 transition cursor-pointer flex flex-col items-center"
            onClick={() => navigate(`/tour-guide/${guide.email}`)}
          >
            <img
              src={guide.photo}
              alt={guide.name}
              className="size-32 object-cover mask mask-squircle mb-2"
            />
            <p className="text-center font-semibold">{guide.name}</p>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      <div className="bg-base-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4 text-center">
          Book This Package
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Package Name */}
          <input
            type="text"
            readOnly
            {...register("packageName")}
            defaultValue={pkg.packageName}
            placeholder="Title"
            className="input input-bordered w-full"
          />

          {/* Tourist Name */}
          <input
            type="text"
            readOnly
            {...register("touristName")}
            placeholder="Your Name"
            defaultValue={user?.displayName || ""}
            className="input input-bordered w-full"
          />

          {/* Tourist Email */}
          <input
            type="email"
            readOnly
            placeholder="Email Address"
            {...register("touristEmail")}
            defaultValue={user?.email || ""}
            className="input input-bordered w-full"
          />

          {/* Tourist Image */}
          <input
            type="text"
            readOnly
            placeholder="Photo URL"
            {...register("touristImage")}
            defaultValue={user?.photoURL || ""}
            className="input input-bordered w-full"
          />

          {/* Price */}
          <input
            type="text"
            readOnly
            {...register("price")}
            defaultValue={pkg?.pricePerPerson}
            className="input input-bordered w-full"
          />

          {/* Tour Date (Flatpickr) */}
          <Controller
            control={control}
            name="tourDate"
            rules={{ required: "Tour date is required" }}
            render={({ field }) => (
              <Flatpickr
                className="input input-bordered w-full"
                options={{ minDate: "today" }}
                placeholder="Select Tour Date"
                {...field}
              />
            )}
          />
          {errors.tourDate && (
            <span className="text-red-500 text-sm">
              {errors.tourDate.message}
            </span>
          )}

          {/* Tour Guide Name */}
          <select
            defaultValue=""
            {...register("tourGuideName", {
              required: "Please select a tour guide",
            })}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select a Guide
            </option>
            {guides.map((guide) => (
              <option key={guide._id} value={guide.name}>
                {guide.name}
              </option>
            ))}
          </select>
          {errors.tourGuideName && (
            <span className="text-red-500 text-sm">
              {errors.tourGuideName.message}
            </span>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}
