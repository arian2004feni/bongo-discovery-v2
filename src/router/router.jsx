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
            }
        ]
    }
])