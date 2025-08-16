import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const formattedDate = (d) => {
    const isoDate = d;
    const date = new Date(isoDate);
    const formatted = date.toLocaleDateString("en-GB"); // dd/mm/yyyy
    // console.log(formatted);
    return formatted;
  };

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/tourist?touristEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Booking?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    });

    if (!confirm.isConfirmed) return;
    await axiosSecure.delete(`/bookings/${id}`);
    Swal.fire("Cancelled!", "Booking has been cancelled.", "success");
    refetch();
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
              <td>{formattedDate(booking.tourDate)}</td>
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
