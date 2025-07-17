import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { useOutletContext } from "react-router";
import useAuth from "../../../hooks/useAuth";
import EditProfileModal from "./EditProfileModal";

export default function ManageProfile() {
  const { user } = useAuth(); // Firebase user
  const data = useOutletContext();
  const [userData, setUserData] = useState(data);
  const [adminStats, setAdminStats] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // console.log(userData);

  // useEffect(() => {
  //   if (userData?.role === "admin") {
  //     axios
  //       .get("https://bongo-discovery-server.vercel.app/admin/stats")
  //       .then((res) => setAdminStats(res.data))
  //       .catch((err) => console.error(err));
  //   }
  // }, [userData]);

  useEffect(() => {
  if (userData?.role === "admin") {
    setTimeout(() => {
      setAdminStats({
        totalPayment: 152500,
        totalGuides: 12,
        totalPackages: 36,
        totalClients: 85,
        totalStories: 29,
      });
    }, 500);
  }
}, [userData]);

  if (!userData) return <div className="text-center py-8">Loading...</div>;

  const {
    firstName,
    lastName,
    email,
    photo,
    phoneNumber,
    dateOfBirth,
    role,
  } = userData;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-base-200 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {firstName || "User"}!</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-outline btn-sm flex items-center gap-2"
        >
          <FaUserEdit /> Edit Profile
        </button>
      </div>

      {role === "admin" && adminStats && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Payment", value: adminStats.totalPayment + "৳" },
            { label: "Tour Guides", value: adminStats.totalGuides },
            { label: "Packages", value: adminStats.totalPackages },
            { label: "Clients", value: adminStats.totalClients },
            { label: "Stories", value: adminStats.totalStories },
          ].map((stat, idx) => (
            <div key={idx} className="bg-base-100 p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-4">
        <img src={photo} alt={firstName} className="w-20 rounded-full border"/>
        <p>
          <span className="font-semibold">Name:</span> {firstName} {lastName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {phoneNumber || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Date of Birth:</span>{" "}
          {dateOfBirth || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Role:</span>{" "}
          <span className="badge badge-accent">{`${
            (role === "tourist" && "Tourist") ||
            (role === "guide" && "Tour Guide") ||
            (role === "admin" && "Admin") ||
            "N/A"
          }`}</span>
        </p>
      </div>

      {isOpen && (
        <EditProfileModal
          userData={userData}
          onClose={() => setIsOpen(false)}
          refetch={() => {
            axios
              .get(`https://bongo-discovery-server.vercel.app/users/${user.email}`)
              .then((res) => setUserData(res.data));
          }}
        />
      )}
    </div>
  );
}
