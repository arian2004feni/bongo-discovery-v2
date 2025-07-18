import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

export default function JoinAsGuide() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const applicationData = {
      ...data,
      email: user?.email,
      name: user?.displayName,
      status: "pending", // for admin review
      appliedAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post("http://localhost:3000/tour-guide/applications", applicationData);

      if (res.data.insertedId || res.status === 200) {
        Swal.fire({
          title: "Application Submitted!",
          text: "Your request to become a Tour Guide has been received.",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit your application.", "error");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Join as a Tour Guide
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <input
          type="text"
          {...register("applicationTitle", { required: true })}
          placeholder="Application Title"
          className="input input-bordered w-full"
        />

        <textarea
          {...register("reason", { required: true })}
          placeholder="Why do you want to be a Tour Guide?"
          className="textarea textarea-bordered w-full"
          rows={4}
        />

        <input
          type="url"
          {...register("cvLink", { required: true })}
          placeholder="CV/Resume Link"
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full mt-2" type="submit">
          Submit Application
        </button>
      </form>
    </div>
  );
}
