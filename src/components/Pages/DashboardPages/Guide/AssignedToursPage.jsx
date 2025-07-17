import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

export default function AssignedToursPage() {
  const { user } = useAuth();
  const [assignedTours, setAssignedTours] = useState([]);

  const fetchAssignedTours = async () => {
    try {
      const res = await axios.get(
        `https://bongo-discovery-server.vercel.app/bookings/guide?tourGuideEmail=${user?.email}`
      );
      setAssignedTours(res.data);
    } catch (error) {
      console.error("Error fetching tours", error);
    }
  };

  useEffect(() => {
    if (user?.email) fetchAssignedTours();
  }, [user]);

  const handleAccept = async (booking) => {
    if (booking.status !== "in-review") return;

    try {
      await axios.patch(`https://bongo-discovery-server.vercel.app/bookings/${booking._id}/status`, {
        status: "accepted",
      });

      Swal.fire("Success", "Tour has been accepted!", "success");
      fetchAssignedTours();
    } catch (err) {
      Swal.fire("Error", "Failed to accept tour", "error");
    }
  };

  const handleReject = async (booking) => {
    if (booking.status !== "in-review") return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will reject the booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.patch(`https://bongo-discovery-server.vercel.app/bookings/${booking._id}/status`, {
        status: "rejected",
      });

      Swal.fire("Rejected", "Tour has been rejected", "info");
      fetchAssignedTours();
    } catch (err) {
      Swal.fire("Error", "Failed to reject tour", "error");
    }
  };

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Assigned Tours</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Package</th>
            <th>Tourist</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedTours.map((booking, idx) => (
            <tr key={booking._id}>
              <td>{idx + 1}</td>
              <td>{booking.packageName}</td>
              <td>{booking.touristName}</td>
              <td>{booking.tourDate}</td>
              <td>{booking.price}৳</td>
              <td className="capitalize">{booking.status}</td>
              <td className="flex gap-2 justify-center">
                <button
                  disabled={booking.status !== "in-review"}
                  onClick={() => handleAccept(booking)}
                  className="btn btn-sm btn-success disabled:opacity-50"
                >
                  Accept
                </button>
                <button
                  disabled={booking.status !== "in-review"}
                  onClick={() => handleReject(booking)}
                  className="btn btn-sm btn-error disabled:opacity-50"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
