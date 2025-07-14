import React from 'react';
import AboutHero from '../components/Pages/AboutPage.jsx/AboutHero';
import AboutUsSection from '../components/Pages/AboutPage.jsx/AboutUsSection';
import MyServiceSection from '../components/Pages/AboutPage.jsx/MyServiceSection';
import MyTestimonialSection from '../components/Pages/AboutPage.jsx/MyTestimonialSection';
import MyPortfolioSection from '../components/Pages/AboutPage.jsx/MyPortfolioSection';

const AboutPage = () => {
    return (
        <div>
            <AboutHero />
            <AboutUsSection />
            <MyServiceSection />
            <MyPortfolioSection />
            <MyTestimonialSection />
        </div>
    );
};

export default AboutPage;