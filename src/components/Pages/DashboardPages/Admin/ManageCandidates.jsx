import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import Swal from "sweetalert2";

export default function ManageCandidates() {
  const [applications, setApplications] = useState([]);
  const userInfo = useOutletContext();

  const fetchApplications = () => {
    axios
      .get("https://bongo-discovery-server.vercel.app/tour-guide/applications?status=pending")
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

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
      await axios.patch(`https://bongo-discovery-server.vercel.app/users/${app.email}/role`, {
        role: "guide",
      });

      // 2. Update application status
      await axios.patch(
        `https://bongo-discovery-server.vercel.app/tour-guide/applications/${app._id}/approve`
      );

      // 3. Create tour guide record in separate collection
      const guideInfo = {
        applicationTitle: app.applicationTitle,
        reason: app.reason,
        cvLink: app.cvLink,
        email: app.email,
        name: app.name,
        photo: userInfo?.photo || "", // from useOutletContext
        address: userInfo?.address || {
          country: "",
          city: "",
          postCode: "",
        },
        addedAt: new Date().toISOString(),
      };

      await axios.post("https://bongo-discovery-server.vercel.app/tour-guides", guideInfo);

      // 4. Refresh list
      fetchApplications();

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
      await axios.patch(
        `https://bongo-discovery-server.vercel.app/tour-guide/applications/${app._id}/reject`
      );

      // 2. Refresh list
      fetchApplications();

      Swal.fire("Rejected!", `Application has been rejected.`, "success");
    } catch (error) {
      console.error("Reject error:", error);
      Swal.fire("Error", "Could not reject application", "error");
    }
  };

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
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Application Title</th>
              <th>Reason</th>
              <th>CV Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>tourist</td>
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
