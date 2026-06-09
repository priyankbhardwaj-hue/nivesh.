import React from 'react';
import Hero from '../components/home/Hero';
import MFDRevolution from '../components/home/MFDRevolution';
import Features from '../components/home/Features';
import ExistingMFDSection from '../components/home/ExistingMFDSection';
import AspiringMFDSection from '../components/home/AspiringMFDSection';
import GrowthStatistics from '../components/home/GrowthStatistics';
import Testimonials from '../components/home/Testimonials';
import BenefitsSection from '../components/home/BenefitsSection';
import CallToAction from '../components/home/CallToAction';
import FAQSection from '../components/home/FAQSection';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <MFDRevolution />
            <Features />
            <ExistingMFDSection />
            <AspiringMFDSection />
            <GrowthStatistics />
            <Testimonials />
            <BenefitsSection />
            <CallToAction />
            <FAQSection />
        </>
    );
};

export default Home;
