import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import PFRImage from '../../../assets/PFR.png';
import { fetchFAQs, type FAQ } from '../../../services/api';

const PlanForRetirement: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFaqs(true);
                const allFaqs = await fetchFAQs();
                // Filter FAQs by category "plan-for-retirement"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'plan-for-retirement' || 
                           category === 'plan for retirement' ||
                           category.includes('plan-for-retirement');
                });
                setFaqs(filteredFaqs);
            } catch (error) {
                console.error('Error loading FAQs:', error);
                setFaqs([]);
            } finally {
                setLoadingFaqs(false);
            }
        };

        loadFAQs();
    }, []);

    const toggleFaq = (index: number) => {
        setOpenFaqs((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 overflow-hidden bg-white">
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Left Column - Content */}
                        <div className="relative z-10">
                            {/* Breadcrumbs */}
                            <div className="mb-6">
                                <nav className="flex items-center space-x-2 text-sm">
                                    <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                                        Home
                                    </Link>
                                    <span className="text-neutral-400">/</span>
                                    <span className="text-neutral-500">Retirement Plan</span>
                                </nav>
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-6 leading-tight">
                                Retirement Plan
                            </h1>
                            
                            <p className="text-base md:text-lg text-neutral-600 mb-8 leading-relaxed">
                                Retirement planning as the name implies requires a lot of planning and a multi-decade effort. While the corpus that you are targeting may seem daunting right now, it is well within the reach if you invest in a disciplined manner.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => window.open('https://app.nivesh.com', '_blank')}
                                    className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Invest Now
                                </Button>
                            </div>
                        </div>

                        {/* Right Column - PFR Image */}
                        <div className="relative z-10">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={PFRImage}
                                    alt="Retirement Plan"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Retirement Planning Introduction Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                Retirement planning as the name implies requires a lot of planning and a multi-decade effort. While the corpus that you are targeting may seem daunting right now, it is well within the reach if you invest in a disciplined manner. Starting early, choosing good products, avoiding debt, and regularly reviewing your retirement investment plan will help you achieve a worry-free and comfortable retirement. The goal is to build a sizable corpus that lasts at least 25-30 years. It's never too late to start. If you are young and have a higher risk appetite, you can consider equity-oriented schemes. If you are starting late, you should opt for safer options like fixed deposits, debt-oriented schemes. Inflation, lifestyle, and rising medical costs are crucial factors for calculating the retirement corpus.
                            </p>
                            
                            <p className="text-base md:text-lg font-bold text-[#243062] leading-relaxed">
                                Here are a few options you can consider to build your retirement corpus.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fixed Deposits Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                            Fixed Deposits
                        </h2>
                        <div className="space-y-4">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Fixed Deposits are a highly secured investment option that offers guaranteed returns. They can be useful for medical emergency or other emergencies. However, you should consider inflation-adjusted returns because the low rates offered on this instrument might not be able to cover even the inflation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mutual Funds Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                            Mutual Funds
                        </h2>
                        <div className="space-y-6">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Systematic Investment Plan (SIP) is an ideal way to start retirement planning. You don't need to time the market, and it lowers your investment requirements. It also helps you develop a disciplined habit of saving. The key advantages of SIP are rupee cost averaging and compounding effect. You should consider the amount of time you have till you retire and your risk tolerance. The longer your investment horizon, the lower the SIP amount you need to invest. Starting early and the power of compounding will help you build a substantial corpus. You can also gradually increase your monthly SIP amount.
                            </p>
                            
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Systematic Withdrawal Plan (SWP) is an option for providing income post-retirement. It allows you to withdraw a predetermined amount monthly.
                            </p>
                            
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                SWP is the opposite of a Systematic Investment Plan (SIP). In SIP, money moves from the bank to the mutual fund, while in SWP, it moves from the mutual fund to the bank. This makes it the best way to seek regular income for retired individuals.
                            </p>
                            
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Building a retirement kitty is simple and easy if you start early and invest in the right funds. We at Nivesh will guide you with the right advice to make informed decisions about your retirement and create a suitable retirement investment plan for you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Retirement Planning Strategies Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Retirement Planning Strategies
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {[
                                {
                                    title: 'Systematic Investment Plans (SIPs)',
                                    description: 'Invest regularly in mutual funds through SIPs to build wealth over time. SIPs offer the power of compounding and rupee cost averaging, making them ideal for long-term retirement planning.',
                                    icon: (
                                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: 'National Pension Scheme (NPS)',
                                    description: 'NPS offers tax benefits under Section 80C and 80CCD, with the flexibility to choose your investment mix. It provides a regular pension income after retirement.',
                                    icon: (
                                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: 'Provident Fund (PF) & PPF',
                                    description: 'Traditional retirement savings options like EPF and PPF offer guaranteed returns and tax benefits. These are low-risk options suitable for conservative investors.',
                                    icon: (
                                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: 'Equity Investments',
                                    description: 'Long-term equity investments through mutual funds or direct stocks can provide inflation-beating returns, helping your retirement corpus grow significantly over time.',
                                    icon: (
                                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: 'Fixed Deposits & Bonds',
                                    description: 'Fixed deposits and bonds provide stable, predictable returns for the conservative portion of your retirement portfolio, ensuring capital preservation.',
                                    icon: (
                                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    ),
                                },
                                {
                                    title: 'Annuity Plans',
                                    description: 'Annuity plans provide guaranteed regular income after retirement, ensuring you have a steady cash flow to meet your monthly expenses.',
                                    icon: (
                                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    ),
                                },
                            ].map((strategy, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="mb-4">
                                        {strategy.icon}
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-[#243062] mb-3">
                                        {strategy.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                        {strategy.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits of Retirement Planning Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Benefits of Retirement Planning
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {[
                                {
                                    title: 'Tax Benefits',
                                    description: 'Various retirement investment options offer tax deductions under Section 80C, 80CCD, and other sections, reducing your taxable income while building your retirement corpus.',
                                },
                                {
                                    title: 'Financial Security',
                                    description: 'A well-planned retirement ensures you have sufficient funds to maintain your lifestyle, cover healthcare expenses, and handle unexpected financial needs.',
                                },
                                {
                                    title: 'Peace of Mind',
                                    description: 'Knowing that your retirement is financially secure allows you to focus on enjoying your golden years without worrying about money matters.',
                                },
                                {
                                    title: 'Inflation Protection',
                                    description: 'Strategic retirement planning with equity exposure helps your corpus grow faster than inflation, preserving your purchasing power over time.',
                                },
                            ].map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

           

            {/* Frequently Asked Questions Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-12 md:mb-16 text-center leading-tight">
                            Frequently Asked Questions (FAQs)
                        </h2>
                        {loadingFaqs ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                <p className="mt-4 text-neutral-600">Loading FAQs...</p>
                            </div>
                        ) : faqs.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-neutral-600">No FAQs available at the moment.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 md:space-y-5">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={faq.id}
                                        className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-transparent border-none outline-none cursor-pointer hover:bg-neutral-50 transition-colors duration-200"
                                        >
                                            <h5 className="text-base md:text-lg font-bold text-[#243062] pr-4">
                                                {faq.question}
                                            </h5>
                                            <svg
                                                className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                                                    openFaqs[index] ? 'rotate-180' : ''
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {openFaqs[index] && (
                                            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                                                {faq.answer && (
                                                    <div className="text-sm md:text-base text-neutral-700 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

           
        </div>
    );
};

export default PlanForRetirement;

