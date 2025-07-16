import React from 'react';
import Hero from '../components/Home/Hero';
import OverviewSection from '../components/Home/OverViewSection';
import ServiceSection from '../components/Home/ServiceSection';
import TourismAndGuideTabs from '../components/Home/TourismAndGuideTabs';
import TouristStorySection from '../components/Home/TouristStorySection';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <ServiceSection />
            <OverviewSection />
            <TourismAndGuideTabs />
            <TouristStorySection />
        </div>
    );
};

export default HomePage;