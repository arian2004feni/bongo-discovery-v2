import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function ManageCandidates() {
  const axiosSecure = useAxiosSecure();

  const {data: applications=[], isLoading, isError, refetch} = useQuery({
    queryKey: ['candidates'],
    queryFn: async() => {
      const res = await axiosSecure.get('/tour-guide/applications?status=pending');
      return res.data
    }
  })
  
  const handleAccept = async (app) => {
    const confirm = await Swal.fire({
      title: "Accept this application?",
      text: `Promote ${app.name} to Tour Guide?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Accept",
    });

    if (!confirm.isConfirmed) return;

    try {
      // 1. Update user role
      await axiosSecure.patch(`/users/${app.email}/role`, {
        role: "guide",
      });

      // 2. Update application status
      await axiosSecure.patch(
        `/tour-guide/applications/${app._id}/approve`
      );

      // 3. Create tour guide record in separate collection
      const guideInfo = {
        applicationTitle: app.applicationTitle,
        reason: app.reason,
        cvLink: app.cvLink,
        name: app.name,
        email: app.email,
        photo: app.photo,
        addedAt: new Date().toISOString(),
      };

      await axiosSecure.post("/tour-guides", guideInfo);

      // 4. Refresh list
      refetch();

      Swal.fire("Accepted!", `${app.name} is now a Tour Guide.`, "success");
    } catch (error) {
      console.error("Accept error:", error);
      Swal.fire("Error", "Could not approve application", "error");
    }
  };

  const handleReject = async (app) => {
    const confirm = await Swal.fire({
      title: "Reject this application?",
      text: `This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (!confirm.isConfirmed) return;

    try {
      // 1. Update status to rejected
      await axiosSecure.patch(
        `/tour-guide/applications/${app._id}/reject`
      );

      // 2. Refresh list
      refetch();

      Swal.fire("Rejected!", `Application has been rejected.`, "success");
    } catch (error) {
      console.error("Reject error:", error);
      Swal.fire("Error", "Could not reject application", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Error loading data.</p>;
  }


  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Pending Tour Guide Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">No pending applications.</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Application Title</th>
              <th>Reason</th>
              <th>CV Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => (
              <tr key={app._id}>
                <td>{i+1}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.applicationTitle}</td>
                <td className="max-w-xs truncate" title={app.reason}>
                  {app.reason}
                </td>
                <td>
                  <a
                    href={app.cvLink}
                    className="link link-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View CV
                  </a>
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleAccept(app)}
                    className="btn btn-sm btn-success"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(app)}
                    className="btn btn-sm btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
