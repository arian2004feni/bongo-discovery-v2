import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";

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
            }
        ]
    }
])