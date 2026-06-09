import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import Hero2 from '../../assets/Hero2.jpeg';
import { fetchFAQs, type FAQ } from '../../services/api';

const SpecializedInvestmentFund: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFaqs(true);
                const allFaqs = await fetchFAQs();
                // Filter FAQs by category "specialized-investment-fund"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'specialized-investment-fund' || 
                           category === 'specialized investment fund' ||
                           category.includes('specialized-investment-fund');
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
            <section className="relative pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden bg-white">
                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-sm mb-6">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                            Home
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500">Specialized Investment Fund</span>
                    </nav>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left Column - Content */}
                        <div className="relative z-10">
                            <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] mb-4 leading-tight">
                                Specialized Investment Fund: Global Diversification Guide
                            </h2>
                            <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-4 md:mb-4 leading-tight">
                                Specialized Investment Fund: Global Diversification Guide
                            </h1>
                            
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
                                India's investment landscape is evolving, with a growing demand for sophisticated investment options. Specialized Investment Funds (SIFs) are SEBI-regulated investment vehicles that offer sophisticated investors access to alternative investment strategies. SIFs provide opportunities to access new markets and achieve global diversification, offering possibilities without boundaries to manage risk and optimize returns.
                            </p>
                            
                            <div className="flex justify-start">
                            <Button
                                variant="primary"
                                size="lg"
                                    onClick={() => setIsModalOpen(true)}
                                className="bg-[#243062] hover:bg-[#1a2550] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                I am Interested
                            </Button>
                            </div>
                        </div>

                        {/* Right Column - Hero2 Image */}
                        <div className="relative z-10">
                            <img
                                src={Hero2}
                                alt="Specialized Investment Fund"
                                className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* What is Specialized Investment Fund Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            What Are Specialized Investment Funds (SIFs)?
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-transparent">
                                <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                    SEBI Specialized Investment Funds (SIFs) are regulated investment vehicles designed specifically for high-net-worth and institutional investors who seek access to more sophisticated and flexible investment strategies. As opposed to standard mutual funds, which can cater to large numbers of investors with standardized schemes, and Portfolio Management Services (PMS), which are custom-designed discretionary management offerings, SIF Funds have bespoke mandates and minimum investments. SEBI's Specialized Investment Fund aims to fill the gap in advanced investment structures, promoting innovation and offering Indian traders access to a diverse range of domestic and international opportunities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Key Features of SIF
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                title: 'Minimum Investment Amounts',
                                description: 'SIF Funds should have at least ₹10 lakh as a good way to healthy, high-capital investors. Permitted buyers may, but have lower minimums to suggest their superior stage of economic information and threat-bearing potential.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Eligibility for Asset Management Companies (AMCs)',
                                description: 'SIF Fund may be launched and operated most effectively by SEBI-accredited AMCs having a sound document and robust working structures. This ensures investors\' confidence, integrity, and transparency, as well as compliance with conventions in fund management.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Investment Strategies',
                                description: 'SIF Fund enables AMCs to offer equity-focused, debt-targeted, or hybrid offerings. This allows finances to serve traders\' convergent risk horizons, in addition to their return expectations, from competitive boom to conservative profits.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Flexible Subscription and Redemption',
                                description: 'In comparison to most people using conventional funding schemes, SEBI Specialized Investment Fund allows for flexible subscription and redemption, aligning more closely with buyers\' liquidity constraints and timing options in the marketplace.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Risk Categorization and Disclosure',
                                description: 'Each SIF Funds should disclose its holdings by making public its risk profile, its investment policy, and any market risks of exposure. By making this disclosure, traders can make informed decisions based on their risk tolerance.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                ),
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-[#243062] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Investment Guidelines and Limitations Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Investment Guidelines and Limitations
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                    Investment guidelines prescribe funding Limits on Specialized Investment Funds (SIFs) for various portfolios and robust risk control. SEBI imposes stringent exposure limits on special classes of property, sectors, and unique businesses to prevent overexposure, thereby minimizing systemic risk to investors.
                                </p>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                    SIFs are permitted to employ derivatives for risk management and hedging, but SEBI imposes extraordinarily stringent controls on leverage and derivatives utilization in this manner, ensuring that the budget does not recover from risk exposure, thereby maintaining the overall portfolio's strength.
                                </p>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                    In addition, it must disclose appropriate benchmarks that are consistent with its investment approach, facilitating buyers' evaluation of fund performance against relevant market benchmarks.
                                </p>
                                    <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    Taxation preparations for SEBI Specialized Investment Fund vary and depend on the fund's structure and the asset classes comprising the fund. While SIFs can offer certain tax benefits, buyers are advised to seek expert advice to determine their tax liability and after-tax returns.
                                    </p>
                                </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Should Invest Section */}
            {/* <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Who Should Invest in SIF?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {[
                                {
                                    title: 'High-Net-Worth Individuals',
                                    description: 'Investors with substantial investable surplus seeking diversification beyond traditional asset classes.',
                                },
                                {
                                    title: 'Institutional Investors',
                                    description: 'Corporates, family offices, and institutions looking for sophisticated investment solutions.',
                                },
                                {
                                    title: 'Sophisticated Investors',
                                    description: 'Investors who understand alternative investment strategies and are comfortable with associated risks.',
                                },
                                {
                                    title: 'Portfolio Diversification',
                                    description: 'Investors seeking to diversify their portfolio with non-correlated investment strategies.',
                                },
                            ].map((investor, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <h3 className="text-lg md:text-xl font-bold text-[#243062] mb-3">
                                        {investor.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                        {investor.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Benefits Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Benefits of SIFs to Indian Investors
                        </h2>
                        <div className="space-y-6">
                            {[
                                {
                                    title: 'Availability of Sophisticated Investment Approaches',
                                    description: 'Indian buyers are exposed to state-of-the-art and professionally managed investment methods that surpass conventional alternatives, allowing them to access custom-designed exposure to specialized markets and asset classes.',
                                },
                                {
                                    title: 'Greater Portfolio Diversification',
                                    description: 'Investing in SEBI Specialized Investment Fund offers a proposition that allows traders to diversify across domestic and international investments, thereby reducing concentration risk and fostering a stable, long-term investment growth.',
                                },
                                {
                                    title: 'Ability to Create Better Return with Managed Risk',
                                    description: 'SIFs offer an actively managed approach to create additional returns versus risk, and the ability to generate better Risk Adjusted Return.',
                                },
                                {
                                    title: 'New Opportunities in New Fields Like REITs and InvITs',
                                    description: 'SIFs provide access to new investment alternatives, including areas such as real estate investment trusts (REITs) and infrastructure investment trusts (InvITs), investors can participate in these high-growth sectors with controlled established risk.',
                                },
                            ].map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200 shadow-sm"
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

            {/* SIF Investor Types Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            SIF Investor Types
                        </h2>
                        <ul className="space-y-3 list-disc list-inside text-base md:text-lg text-neutral-700 leading-relaxed">
                            <li>Resident Indian</li>
                            <li>NRIs/Foreign Nationals</li>
                            <li>Institutional Investors/FPIs</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Global Diversification With SIFs Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            Global Diversification With SIFs
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
                            Geographic diversification is essential for building a robust fund portfolio. Fund diversification across countries minimizes the threat posed by monetary declines in both markets and provides access to increased opportunities globally. SIF Funds offer a simple solution for Indian investors seeking to engage with international markets, allowing access to diversified asset classes and industries beyond national borders. Investors can gain access to both advanced economies and emerging economies through SIFs, balancing risk and reward.
                        </p>
                        <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                            Key Points:
                        </h3>
                        <ul className="space-y-3 list-disc list-inside text-base md:text-lg text-neutral-700 leading-relaxed">
                            <li>Geographic diversification decreases concentration risk and smooths portfolio volatility.</li>
                            <li>SIF Funds provide access to international equities, bonds, and alternative investments that may be difficult to find elsewhere.</li>
                            <li>Investors can benefit from exposure to developed US and European markets in addition to emerging Asian and Latin American economies.</li>
                            <li>It also unlocks opportunities in international sectors such as digitalization, healthcare, and infrastructure.</li>
                            <li>Professional management of SIF Funds mitigates the foreign investment and geopolitical risks associated with global investment.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Regulatory Supervision and Investor Protection Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            Regulatory Supervision and Investor Protection
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-neutral-700 leading-relaxed">
                            <p>
                                SEBI-regulated Specialized Investment Funds (SIFs) are required to adhere to strict operational, disclosure, and governance standards to ensure transparency, investor protection, and market integrity. Fund managers must implement robust risk management systems and maintain clear internal controls.
                            </p>
                            <p>
                                SIFs are required to make transparent disclosure of their fund strategies, risk profiles, expenses, and performance to investors. This enables investors to make informed decisions and holds fund managers accountable. Regulatory oversight helps maintain confidence in the specialized investment fund ecosystem and safeguards the interests of sophisticated investors.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA Section - Want to know more about SIF? */}
            <section className="py-12 md:py-20 bg-gradient-to-r from-[#243062] to-[#1a2550]">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center py-6 md:py-8">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                            Want to know more about SIF?
                        </h2>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                            Contact Our Experts Today!
                        </p>
                        
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

            {/* Call to Action Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 md:p-12 border-2 border-primary/20 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 leading-tight">
                                Ready to Explore SIF Opportunities?
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                                Connect with our investment experts to learn more about Specialized Investment Funds and how they can fit into your investment strategy.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold"
                                >
                                    Get Started
                                </Button>
                                {/* <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => window.open('https://nivesh.com/en/products', '_blank')}
                                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg text-lg font-semibold"
                                >
                                    Learn More
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Modal */}
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pageSource="Specialized Investment Fund" />
        </div>
    );
};

export default SpecializedInvestmentFund;

