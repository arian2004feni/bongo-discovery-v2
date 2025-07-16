import axios from "axios";
import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import {
  MdAddCircleOutline,
  MdOutlineNoteAdd,
  MdTravelExplore,
} from "react-icons/md";
import {
  RiCalendarEventFill,
  RiGroupLine,
  RiRoadMapLine,
} from "react-icons/ri";
import { VscCommentDiscussion } from "react-icons/vsc";
import { NavLink } from "react-router";

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
          <NavLink to="my-bookings">
            <RiCalendarEventFill className="mr-2" />
            My Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to="manage-stories">
            <VscCommentDiscussion className="mr-2" />
            Manage Stories
          </NavLink>
        </li>
        <li>
          <NavLink to="add-stories">
            <MdAddCircleOutline className="mr-2" />
            Add Stories
          </NavLink>
        </li>
        <li>
          <NavLink to="join-as-guide">
            <MdTravelExplore className="mr-2" />
            Join as Tour Guide
          </NavLink>
        </li>
      </>
    );
  }

  if (userRole?.role === "guide") {
    return (
      <>
        <li>
          <NavLink to="assigned-tours">
            <RiRoadMapLine className="mr-2" />
            My Assigned Tours
          </NavLink>
        </li>
        <li>
          <NavLink to="add-stories">
            <MdAddCircleOutline className="mr-2" />
            Add Stories
          </NavLink>
        </li>
        <li>
          <NavLink to="manage-stories">
            <VscCommentDiscussion className="mr-2" />
            Manage Stories
          </NavLink>
        </li>
      </>
    );
  }
  if (userRole?.role === "admin") {
    return (
      <>
        <li>
          <NavLink to="add-package">
            <MdOutlineNoteAdd className="mr-2" />
            Add Package
          </NavLink>
        </li>
        <li>
          <NavLink to="manage-users">
            <RiGroupLine className="mr-2" />
            Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to="manage-candidates">
            <BiUserCircle className="mr-2" />
            Manage Candidates
          </NavLink>
        </li>
      </>
    );
  }
};

export default DashboardSideNav;
