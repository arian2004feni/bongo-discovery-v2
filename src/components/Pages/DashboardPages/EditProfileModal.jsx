import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase-init";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function EditProfileModal({ userData, onClose, refetch }) {
  const axiosSecure = useAxiosSecure();
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
      await axiosSecure.patch(`/users/${userData.email}`, data);
      await updateProfile(auth.currentUser, {
        displayName: `${data.firstName} ${data.lastName}`,
        photoURL: data.photo,
      });
      Swal.fire("Updated!", "Your profile has been updated.", "success");
      refetch();
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update profile.", "error");
    }
  };

  {
    /* Open the modal using document.getElementById('ID').showModal() method */
  }
  {
    /* <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button> */
  }
  return (
    <dialog id="my_modal_2" className="modal modal-open">
      <div className="modal-box p-0 mt-6">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="bg-base-100 p-6 rounded-lg shadow-xl w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
            <input
              className="input input-bordered w-full"
              required
              placeholder="First Name"
              {...register("firstName")}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Last Name"
              {...register("lastName")}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Photo"
              {...register("photo")}
            />
            <input
              className="input input-bordered w-full"
              type="date"
              {...register("dateOfBirth")}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Phone Number"
              {...register("phoneNumber")}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Country"
              {...register("address.country")}
            />
            <input
              className="input input-bordered w-full"
              placeholder="City"
              {...register("address.city")}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Post Code"
              {...register("address.postCode")}
            />
            <button className="btn btn-primary mt-2">Save Changes</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
