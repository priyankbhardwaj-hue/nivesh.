import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const Features: React.FC = () => {
    const navigate = useNavigate();
    
    const features: Feature[] = [
        {
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: 'Digital Onboarding & KYC',
            description: 'Instant eKYC, UPI Autopay, and Cart for multiple transactions through a single OTP.',
        },
        {
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'AI-Driven Portfolio',
            description: 'Sell outcomes, not just products. Smart allocation based on client goals.',
        },
        {
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            title: 'Multi-Product Suite',
            description: 'MF, SIF, PMS, AIFs, Bonds, and Insurance...all in one place.',
        },
        {
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            title: 'Smart AI-based Insights',
            description: 'Track portfolios and send actionable alerts to your clients automatically.',
        },
        {
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Client App',
            description: 'Reduced servicing and better client experience. With your brand, your logo.',
        },
        {
            icon: (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
            ),
            title: 'Marketing Tools',
            description: 'Research content, calculators, and lead tracking built for MFDs.',
        },
    ];

    return (
        <section className="py-12 md:py-16 bg-neutral-50">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-5xl font-bold text-neutral-900 mb-6">
                        One Platform. <span className="text-primary">Infinite Possibilities.</span>
                    </h2>
                    <p className="text-base md:text-lg text-neutral-600">
                        Manage every client, product, and process...from onboarding to growth...with ease.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 group"
                        >
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <div className="w-6 h-6 md:w-8 md:h-8">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-2 md:mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button 
                        variant="primary" 
                        className="bg-primary text-white border-primary hover:bg-white hover:text-primary hover:border-primary"
                        onClick={() => navigate('/the-nivesh-platform')}
                    >
                        Explore Our Platform
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Features;
