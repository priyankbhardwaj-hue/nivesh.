import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Partner3Logo from '../../components/about/images/partner3.svg';
import Button from '../../components/ui/Button';
import InterestRatesComparison from '../../components/partners/InterestRatesComparison';
import type { InterestRate } from '../../components/partners/InterestRatesComparison';

const ICICIHomeFinance: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // Interest rates data - Easy to update dynamically
    const interestRatesData: InterestRate[] = [
        {
            institution: 'BAJAJ FINANCE FIXED DEPOSIT SCHEME',
            rates: {
                '1 Year': 0,
                '2 Year': 6.95,
                '3 Year': 0,
                '5 Year': 0,
            },
            investLink: 'https://app.nivesh.com',
        },
        {
            institution: 'BAJAJ FINANCE LIMITED',
            rates: {
                '1 Year': 6.6,
                '2 Year': 0,
                '3 Year': 6.95,
                '5 Year': 6.95,
            },
            investLink: 'https://app.nivesh.com',
        },
        {
            institution: 'HDFC BANK LTD',
            rates: {
                '1 Year': 6.25,
                '2 Year': 6.45,
                '3 Year': 6.4,
                '5 Year': 6.4,
            },
            investLink: 'https://app.nivesh.com',
        },
        {
            institution: 'ICICI HOME FINANCE',
            rates: {
                '1 Year': 6.75,
                '2 Year': 6.85,
                '3 Year': 6.9,
                '5 Year': 7,
            },
            investLink: 'https://app.nivesh.com',
        },
        {
            institution: 'LIC HOUSING FINANCE LIMITED',
            rates: {
                '1 Year': 6.7,
                '2 Year': 6.8,
                '3 Year': 6.85,
                '5 Year': 6.9,
            },
            investLink: 'https://app.nivesh.com',
        },
        {
            institution: 'MAHINDRA FINANCE LTD',
            rates: {
                '1 Year': 6.6,
                '2 Year': 7,
                '3 Year': 7,
                '5 Year': 7,
            },
            investLink: 'https://app.nivesh.com',
        },
        {
            institution: 'PNB HOUSING FINANCE LIMITED',
            rates: {
                '1 Year': 0,
                '2 Year': 7,
                '3 Year': 7.1,
                '5 Year': 7.1,
            },
            investLink: 'https://app.nivesh.com',
        },
        {
            institution: 'SHRIRAM FINANCE FIXED DEPOSIT SCHEME',
            rates: {
                '1 Year': 0,
                '2 Year': 0,
                '3 Year': 7.6,
                '5 Year': 7.6,
            },
            investLink: 'https://app.nivesh.com',
        },
        {
            institution: 'SHRIRAM FINANCE FIXED DEPOSIT SCHEME',
            rates: {
                '1 Year': 7,
                '2 Year': 7.25,
                '3 Year': 0,
                '5 Year': 0,
            },
            investLink: 'https://app.nivesh.com',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-12 md:py-20 bg-gradient-to-br from-neutral-50 to-white">
                <div className="container-custom">
                    <nav className="flex items-center space-x-2 text-sm mb-6">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">Home</Link>
                        <span className="text-neutral-400">/</span>
                        <Link to="/fixed-deposit" className="text-primary hover:text-primary-dark transition-colors">Fixed Deposit</Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500">ICICI Home Finance Co. Ltd.</span>
                    </nav>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
                        {/* Left Content */}
                        <div>
                            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm md:text-base font-semibold mb-6">
                                Fixed Deposit Partner
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 leading-tight">
                                ICICI Home Finance Company Ltd
                            </h1>
                            <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-8">
                                ICICI Home Finance Company Ltd is a leading housing finance company in India, offering secure Fixed Deposit schemes with competitive interest rates. Backed by the ICICI Group's strong financial foundation, the company provides reliable investment opportunities with flexible tenure options and attractive returns.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => window.open('https://app.nivesh.com', '_blank')}
                                >
                                    Invest Now
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => window.open('https://nivesh.com/en/fixed-deposit/icici-home-finance-co-ltd', '_blank')}
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>

                        {/* Right Logo */}
                        <div className="flex items-center justify-center">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100 max-w-md w-full">
                                <img
                                    src={Partner3Logo}
                                    alt="ICICI Home Finance Company Ltd"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#243062] mb-12 text-center">
                        Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
                        {[
                            {
                                title: 'Safety Assurance',
                                description: 'ICICI Home Finance Fixed Deposits are backed by the strong financial foundation of the ICICI Group. The company maintains high credit ratings, ensuring the safety and security of your investments. Your deposits are protected and managed with the highest standards of financial prudence.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Attractive Interest Rates',
                                description: 'ICICI Home Finance offers competitive interest rates on Fixed Deposits that are aligned with market standards. Senior citizens benefit from additional interest rate benefits, making it an attractive investment option for all age groups seeking secure returns.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Premature Withdrawal',
                                description: 'ICICI Home Finance provides flexibility with premature withdrawal options. Investors can withdraw their Fixed Deposits before maturity if needed, subject to terms and conditions. This feature ensures liquidity while maintaining the security of your investment.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 bg-[#243062] rounded-full flex items-center justify-center text-white mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => window.open('https://app.nivesh.com', '_blank')}
                            className="bg-[#243062] hover:bg-[#1a2347]"
                        >
                            Invest Now
                        </Button>
                    </div>
                </div>
            </section>

            {/* Why ICICI Home Finance FD is the Right Choice? */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#243062] mb-12 text-center">
                        Why ICICI Home Finance FD is the Right Choice?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                title: 'Higher Returns',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Strong Financials',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Flexible Payout Options',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg border border-neutral-100 transition-all duration-300 text-center"
                            >
                                <div className="w-20 h-20 bg-[#243062] rounded-full flex items-center justify-center text-white mx-auto mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-neutral-900">
                                    {item.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interest Rates Comparison Section */}
            <InterestRatesComparison
                title="Corporate Fixed Deposit Interest Rates Comparison"
                rates={interestRatesData}
                onInvestClick={(_institution, link) => {
                    if (link) {
                        window.open(link, '_blank', 'noopener,noreferrer');
                    } else {
                        window.open('https://app.nivesh.com', '_blank', 'noopener,noreferrer');
                    }
                }}
            />

            {/* Who Can Invest Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#243062] mb-12 text-center">
                        Who Can Invest in ICICI Home Finance FD?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                        {[
                            {
                                title: 'Individual Investor',
                            },
                            {
                                title: 'Non-Individual Investors',
                            },
                            {
                                title: 'Non Resident Indians (NRI)',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 md:p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center"
                            >
                                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-neutral-900">
                                    {item.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => window.open('https://app.nivesh.com', '_blank')}
                            className="bg-[#243062] hover:bg-[#1a2347]"
                        >
                            Invest Now
                        </Button>
                    </div>
                </div>
            </section>

            {/* About ICICI Home Finance Section */}
            <section className="py-12 md:py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800">
                <div className="container-custom">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 text-center">
                        About ICICI Home Finance Company Ltd
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-base md:text-lg text-white leading-relaxed text-center">
                            ICICI Home Finance Company Ltd is a leading housing finance company in India, part of the ICICI Group. The company specializes in providing housing finance solutions and Fixed Deposit products to individuals and institutions. With a strong focus on customer service and financial security, ICICI Home Finance offers reliable investment opportunities backed by the ICICI Group's extensive experience and financial strength in the Indian financial services sector.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ICICIHomeFinance;

