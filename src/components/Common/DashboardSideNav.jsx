import axios from "axios";
import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import {
  MdAddCircleOutline,
  MdOutlineNoteAdd,
  MdTravelExplore,
} from "react-icons/md";
import { PiUserCircleGear } from "react-icons/pi";
import {
  RiCalendarEventFill,
  RiGroupLine,
  RiRoadMapLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import { VscCommentDiscussion } from "react-icons/vsc";
import { Link } from "react-router";

const DashboardSideNav = ({ emailId }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${emailId.email}/role`)
      .then((res) => setUserRole(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (userRole?.role === "tourist") {
    return (
      <>
        {/* Sidebar content here */}

        <li>
          <Link to="/my-bookings">
            <RiCalendarEventFill className="mr-2" />
            My Bookings
          </Link>
        </li>
        <li>
          <Link to="/manage-stories">
            <VscCommentDiscussion className="mr-2" />
            Manage Stories
          </Link>
        </li>
        <li>
          <Link to="/add-stories">
            <MdAddCircleOutline className="mr-2" />
            Add Stories
          </Link>
        </li>
        <li>
          <Link to="/join-as-tour-guide">
            <MdTravelExplore className="mr-2" />
            Join as Tour Guide
          </Link>
        </li>
      </>
    );
  }

  if (userRole?.role === "guide") {
    return (
      <>
        <li>
          <Link to="/my-bookings">
            <RiRoadMapLine className="mr-2" />
            My Assigned Tours
          </Link>
        </li>
        <li>
          <Link to="/add-stories">
            <MdAddCircleOutline className="mr-2" />
            Add Stories
          </Link>
        </li>
        <li>
          <Link to="/manage-stories">
            <VscCommentDiscussion className="mr-2" />
            Manage Stories
          </Link>
        </li>
      </>
    );
  }
  if (userRole?.role === "admin") {
    return (
      <>
        <li>
          <Link to="/my-bookings">
            <MdOutlineNoteAdd className="mr-2" />
            Add Package
          </Link>
        </li>
        <li>
          <Link to="/add-stories">
            <RiGroupLine className="mr-2" />
            Manage Users
          </Link>
        </li>
        <li>
          <Link to="/add-stories">
            <BiUserCircle className="mr-2" />
            Manage Candidates
          </Link>
        </li>
      </>
    );
  }
};

export default DashboardSideNav;
