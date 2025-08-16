import { createBrowserRouter } from "react-router";
import ForgotPass from "../components/Pages/Auth/ForgotPass";
import LoginPage from "../components/Pages/Auth/LoginPage";
import RegisterPage from "../components/Pages/Auth/RegisterPage";
import AddStory from "../components/Pages/DashboardPages/AddStory";
import AddPackage from "../components/Pages/DashboardPages/Admin/AddPackage";
import ManageCandidates from "../components/Pages/DashboardPages/Admin/ManageCandidates";
import ManageUsers from "../components/Pages/DashboardPages/Admin/ManageUsers";
import AssignedToursPage from "../components/Pages/DashboardPages/Guide/AssignedToursPage";
import ManageProfile from "../components/Pages/DashboardPages/ManageProfile";
import ManageStories from "../components/Pages/DashboardPages/ManageStories";
import JoinAsGuide from "../components/Pages/DashboardPages/Tourist/JoinAsGuide";
import MyBookings from "../components/Pages/DashboardPages/Tourist/MyBookings";
import UpdateStory from "../components/Pages/DashboardPages/UpdateStory";
import Dashboard from "../layout/Dashboard";
import Root from "../layout/Root";
import AboutPage from "../pages/AboutPage";
import AllTripsPage from "../pages/AllTripsPage";
import CommunityPage from "../pages/CommunityPage";
import HomePage from "../pages/HomePage";
import PackageDetails from "../pages/PackageDetails";
import TourGuideProfile from "../pages/TourGuideProfile";
import PrivateRoute from "../routes/PrivateRoute";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: 'about',
                Component: AboutPage
            },
            {
                path: 'community',
                Component: CommunityPage
            },
            {
                path: 'trips',
                Component: AllTripsPage
            },
            {
                path: '/login',
                Component: LoginPage
            },
            {
                path: '/register',
                Component: RegisterPage
            },
            {
                path: 'login/password-recovery',
                Component: ForgotPass
            },
            {
                path: '/tour-guide/:email',
                Component: TourGuideProfile
            },
            {
                path: 'packages/:slug',
                Component: PackageDetails
            }
        ]
    },
    {
        path: 'dashboard/:email',
        element: <Dashboard />,
        children: [
            {
                path: 'profile',
                element: <PrivateRoute><ManageProfile /></PrivateRoute>
            },
            {
                path: 'add-package',
                element: <PrivateRoute><AddPackage /></PrivateRoute>
            },
            {
                path: 'add-stories',
                element: <PrivateRoute><AddStory /></PrivateRoute>
            },
            {
                path: 'manage-stories',
                element: <PrivateRoute><ManageStories /></PrivateRoute>
            },
            {
                path: 'assigned-tours',
                element: <PrivateRoute><AssignedToursPage /></PrivateRoute>
            },
            {
                path: 'update-story/:id',
                element: <PrivateRoute><UpdateStory /></PrivateRoute>
            },
            {
                path: 'join-as-guide',
                element: <PrivateRoute><JoinAsGuide /></PrivateRoute>
            },
            {
                path: 'manage-candidates',
                element: <PrivateRoute><ManageCandidates /></PrivateRoute>
            },
            {
                path: 'manage-users',
                element: <PrivateRoute><ManageUsers /></PrivateRoute>
            },
            {
                path: 'my-bookings',
                element: <PrivateRoute><MyBookings /></PrivateRoute>
            }
        ]
    },
    {
        path: '*',
        Component: NotFound
    }
])