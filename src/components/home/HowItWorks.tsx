import React from 'react';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            number: '01',
            title: 'Create Your Profile',
            description: 'Sign up in minutes and tell us about your financial goals, risk tolerance, and investment timeline.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
        {
            number: '02',
            title: 'Get Personalized Advice',
            description: 'Our AI-powered platform analyzes your profile and recommends a customized investment strategy.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            number: '03',
            title: 'Start Investing',
            description: 'Review your portfolio, approve the strategy, and start investing with as little as ₹500.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
        },
        {
            number: '04',
            title: 'Track & Optimize',
            description: 'Monitor your portfolio performance in real-time and get alerts for rebalancing opportunities.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-neutral-900 mb-4">
                        How It
                        <span className="text-primary"> Works</span>
                    </h2>
                    <p className="text-lg text-neutral-600">
                        Start your investment journey in four simple steps
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connector Line (hidden on mobile, shown on lg+) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-neutral-200 -z-10" />
                            )}

                            <div className="text-center">
                                {/* Step Number */}
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full text-xl font-bold mb-6 relative z-10">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="flex justify-center text-primary mb-4">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-neutral-600">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
