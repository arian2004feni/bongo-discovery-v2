import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function AssignedToursPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const formattedDate = (d) => {
    const isoDate = d;
    const date = new Date(isoDate);
    const formatted = date.toLocaleDateString("en-GB"); // dd/mm/yyyy
    // console.log(formatted);
    return formatted;
  };

  const { data: assignedTours = [], refetch } = useQuery({
    queryKey: ["assigned-tours"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/guide?tourGuideEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleAccept = (booking) => {
    if (booking.status !== "in-review") return;

    axiosSecure
      .patch(`/bookings/${booking._id}/status`, {
        status: "accepted",
      })
      .then((res) => console.log(res));

    Swal.fire("Success", "Tour has been accepted!", "success");
    refetch();
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

    await axiosSecure.patch(`/bookings/${booking._id}/status`, {
      status: "rejected",
    });

    Swal.fire("Rejected", "Tour has been rejected", "info");
    refetch();
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
              <td>{formattedDate(booking.tourDate)}</td>
              <td>{booking.price}৳</td>
              <td className="capitalize">{booking.status}</td>
              <td className="flex gap-2 justify-center">
                {booking.status === "rejected" ? (
                  "Rejected"
                ) : (
                  <>
                    <button
                      disabled={booking.status !== "in-review"}
                      onClick={() => handleAccept(booking)}
                      className="btn btn-sm btn-success disabled:opacity-50"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(booking)}
                      className="btn btn-sm btn-error disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
