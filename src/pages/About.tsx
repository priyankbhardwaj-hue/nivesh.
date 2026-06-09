import React from 'react';
import HeroSection from '../components/about/HeroSection';
import OurStory from '../components/about/OurStory';
import OurTeam from '../components/about/OurTeam';
import Investors from '../components/about/Investors';
import OurPartners from '../components/about/OurPartners';
import Statistics from '../components/about/Statistics';
import Testimonials from '../components/home/Testimonials';

const About: React.FC = () => {
    return (
        <>
            <HeroSection />
            <OurStory />
            <OurTeam />
            <Investors />
            <OurPartners />
            <Statistics />
            <Testimonials variant="default" />
        </>
    );
};

export default About;



