import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../components/Pages/Auth/LoginPage";
import RegisterPage from "../components/Pages/Auth/RegisterPage";
import ForgotPass from "../components/Pages/Auth/ForgotPass";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "../routes/PrivateRoute"
import ManageProfile from "../components/Pages/DashboardPages/ManageProfile";
import AddPackage from "../components/Pages/DashboardPages/Admin/AddPackage";
import AddStory from "../components/Pages/DashboardPages/AddStory";
import ManageStories from "../components/Pages/DashboardPages/ManageStories";
import UpdateStory from "../components/Pages/DashboardPages/UpdateStory";
import JoinAsGuide from "../components/Pages/DashboardPages/Tourist/JoinAsGuide";

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
            }
        ]
    },
    {
        path: 'dashboard/:email',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:3000/users/${params.email}`),
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
                path: 'update-story/:id',
                element: <PrivateRoute><UpdateStory /></PrivateRoute>
            },
            {
                path: 'join-as-guide',
                element: <PrivateRoute><JoinAsGuide /></PrivateRoute>
            }
        ]
    }
])