import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:3000/bookings/tourist?touristEmail=${user?.email}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Booking?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      Swal.fire("Cancelled!", "Booking has been cancelled.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to cancel booking", "error");
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Package</th>
            <th>Guide</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.packageName}</td>
              <td>{booking.tourGuideName}</td>
              <td>{booking.tourDate}</td>
              <td>{booking.price}৳</td>
              <td className="capitalize">{booking.status}</td>
              <td className="space-x-2">
                {booking.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/payment/${booking._id}`)
                      }
                      className="btn btn-sm btn-primary"
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {booking.status === "rejected" && (
                  <span className="text-error">Rejected</span>
                )}
                {booking.status === "accepted" && (
                  <span className="text-success">Accepted</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
