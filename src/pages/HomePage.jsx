import React from 'react';
import Hero from '../components/Home/Hero';
import OverviewSection from '../components/Home/OverViewSection';
import ServiceSection from '../components/Home/ServiceSection';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <ServiceSection />
            <OverviewSection />
        </div>
    );
};

export default HomePage;