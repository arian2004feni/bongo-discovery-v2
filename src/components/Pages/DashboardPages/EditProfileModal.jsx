import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export default function EditProfileModal({ userData, onClose, refetch }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      photo: userData.photo,
      dateOfBirth: userData.dateOfBirth,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
    },
  });

  

  const onSubmit = async (data) => {
    try {
      await axios.patch(`http://localhost:3000/users/${userData.email}`, data);
      Swal.fire("Updated!", "Your profile has been updated.", "success");
      refetch();
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update profile.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <input
            className="input input-bordered"
            placeholder="First Name"
            {...register("firstName")}
          />
          <input
            className="input input-bordered"
            placeholder="Last Name"
            {...register("lastName")}
          />
          <input
            className="input input-bordered"
            placeholder="Photo"
            {...register("photo")}
          />
          <input
            className="input input-bordered"
            type="date"
            {...register("dateOfBirth")}
          />
          <input
            className="input input-bordered"
            placeholder="Phone Number"
            {...register("phoneNumber")}
          />
          <input
            className="input input-bordered"
            placeholder="Country"
            {...register("address.country")}
          />
          <input
            className="input input-bordered"
            placeholder="City"
            {...register("address.city")}
          />
          <input
            className="input input-bordered"
            placeholder="Post Code"
            {...register("address.postCode")}
          />
          <button className="btn btn-primary mt-2">Save Changes</button>
        </form>
        <button onClick={onClose} className="btn btn-sm mt-4">
          Cancel
        </button>
      </div>
    </div>
  );
}
