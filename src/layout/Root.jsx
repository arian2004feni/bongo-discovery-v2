import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';

const Root = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;