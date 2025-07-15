import React from "react";
import { FaRegEdit, FaSuitcase, FaUserCog } from "react-icons/fa";
import { MdAddCircleOutline, MdTravelExplore } from "react-icons/md";
import { PiUserCircleGear } from "react-icons/pi";
import { RiCalendarEventFill } from "react-icons/ri";
import { VscCommentDiscussion } from "react-icons/vsc";
import { Link } from "react-router";

const DashboardSideNav = () => {
  return (
    <>
      {/* Sidebar content here */}
      <li>
        <Link to="/manage-profile">
          <PiUserCircleGear className="mr-2"/>
          Manage Profile
        </Link>
      </li>
      <li>
        <Link to="/my-bookings">
          <RiCalendarEventFill className="mr-2"/>
          My Bookings
        </Link>
      </li>
      <li>
        <Link to="/manage-stories">
          <VscCommentDiscussion className="mr-2"/>
          Manage Stories
        </Link>
      </li>
      <li>
        <Link to="/add-stories">
          <MdAddCircleOutline className="mr-2"/>
          Add Stories
        </Link>
      </li>
      <li>
        <Link to="/join-as-tour-guide">
          <MdTravelExplore className="mr-2"/>
          Join as Tour Guide
        </Link>
      </li>
    </>
  );
};

export default DashboardSideNav;
