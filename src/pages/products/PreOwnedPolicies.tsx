import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import POPImage from '../../assets/POP.webp';

const PreOwnedPolicies: React.FC = () => {
    const [openBenefits, setOpenBenefits] = useState<{ [key: number]: boolean }>({ 0: true }); // First one open by default
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleBenefit = (index: number) => {
        setOpenBenefits((prev) => ({
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
                        <span className="text-neutral-500">Pre-Owned Policies</span>
                    </nav>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left Column - Content */}
                        <div className="relative z-10">
                            <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] mb-4 leading-tight">
                            Pre-owned Policies – Smart Investment with Tax Benefits
                            </h2>
                            <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-4 md:mb-4 leading-tight">
                            Pre-owned Policies – Smart Investment with Tax Benefits
                            </h1>
                            
                            <p className="text-base md:text-lg text-neutral-600 mb-8 leading-relaxed">
                            Looking for a unique investment avenue that combines stable returns, tax efficiency, and shorter holding periods? Pre-owned policies are fast emerging as a strategic choice for investors who want to diversify their portfolio with safe, tax-friendly instruments. Unlike traditional insurance, the focus here is not on life cover. What you, as the investor, gain is access to a ready-made policy that has already completed part of its term—bringing you closer to maturity payouts, bonuses, and tax exemptions.                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
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

                        {/* Right Column - POP Image */}
                        <div className="relative z-10">
                            <img
                                src={POPImage}
                                alt="Pre-Owned Policies"
                                className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Consider Pre-owned Policies - Carousel Section */}
            <section className="py-12 md:py-20 bg-primary/10 preowned-why-carousel">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#243062] text-center mb-8 md:mb-12 leading-tight">
                        Why Consider Pre-owned Policies as an Investment?
                    </h2>
                    <div className="max-w-5xl mx-auto">
                        <Slider
                            dots={true}
                            infinite={true}
                            speed={500}
                            slidesToShow={3}
                            slidesToScroll={1}
                            arrows={true}
                            responsive={[
                                { breakpoint: 1024, settings: { slidesToShow: 2 } },
                                { breakpoint: 640, settings: { slidesToShow: 1 } },
                            ]}
                        >
                            {[
                                { title: 'Discounted Entry Point', description: 'Acquire policies at a lower cost compared to the premiums already paid by the original policyholder.' },
                                { title: 'Shorter Time to Maturity', description: 'No need to commit for 15–20 years; benefit from policies that are already midway.' },
                                { title: 'Stable Returns', description: 'Endowment and money-back policies often carry guaranteed or bonus-linked returns.' },
                                { title: 'Tax Efficiency', description: 'Continue to enjoy exemptions under Section 80C and Section 10(10D).' },
                                { title: 'Portfolio Diversification', description: 'Add a low-risk, long-term instrument to balance equity or market-linked investments.' },
                            ].map((card, idx) => (
                                <div key={idx} className="px-2 md:px-3 focus:outline-none">
                                    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 min-h-[200px] flex flex-col">
                                        <h3 className="text-lg md:text-xl font-bold text-[#243062] mb-3">{card.title}</h3>
                                        <p className="text-sm md:text-base text-neutral-700 leading-relaxed">{card.description}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            {/* Key Benefits for Investors Section */}
            <section className="py-12 md:py-20 bg-[#243062]">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary text-center mb-8 md:mb-12 leading-tight">
                            Key Benefits for Investors
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    title: 'Reduced Lock-in',
                                    description: 'Since the policy has already run for a few years, you step in closer to its payout horizon.',
                                },
                                {
                                    title: 'Compounded Growth',
                                    description: 'Policies may already have accrued bonuses or loyalty additions, which become yours post-transfer.',
                                },
                                {
                                    title: 'Predictable Returns',
                                    description: 'Unlike market-linked products, most pre-owned policies come with clear benefit structures.',
                                },
                                {
                                    title: 'Tax-Shielded Income',
                                    description: 'Maturity and survival benefits (where conditions are met) are free from tax, maximizing net gains.',
                                },
                                {
                                    title: 'Secondary Market Advantage',
                                    description: 'Buy policies from individuals exiting due to financial needs, and capitalize on their earlier premiums.',
                                },
                            ].map((benefit, index) => (
                            <div
                                key={index}
                                    className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleBenefit(index)}
                                        className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-transparent border-none outline-none cursor-pointer hover:bg-neutral-50 transition-colors duration-200"
                                    >
                                        <h3 className="text-lg md:text-xl font-bold text-[#243062] pr-4">
                                            {benefit.title}
                                        </h3>
                                        <svg
                                            className={`w-5 h-5 text-black flex-shrink-0 transition-transform duration-300 ${
                                                openBenefits[index] ? 'rotate-180' : ''
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {openBenefits[index] && (
                                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Ideal for Investors Who Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            Ideal for Investors Who:
                        </h2>
                        <div className="space-y-4">
                            <ul className="space-y-4 text-base md:text-lg text-neutral-700">
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 font-bold">•</span>
                                    <span>Want safe, tax-efficient investment options with moderate but reliable returns.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 font-bold">•</span>
                                    <span>Prefer shorter tenures instead of locking funds for decades.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 font-bold">•</span>
                                    <span>Aim to diversify portfolios with guaranteed or bonus-based instruments.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 font-bold">•</span>
                                    <span>Look for low-risk alternatives to FDs, bonds, or savings schemes.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why It Works as a Tax-Efficient Investment Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Why It Works as a Tax-Efficient Investment
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <div className="bg-white rounded-xl p-6 md:p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300">
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    Section 80C Deduction
                                </h3>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    Premiums paid after transfer can qualify for deductions (subject to limits).
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 md:p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300">
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    Tax-Free Returns
                                </h3>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    Maturity and death benefits (conditions apply) may be exempt under Section 10(10D).
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 md:p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300">
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    Lower Effective Cost
                                </h3>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    Since you enter midway, your effective yield may be higher than starting a new policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            

            {/* Important Considerations Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            Important Considerations
                        </h2>
                        <div className="space-y-4">
                            <ul className="space-y-4 text-base md:text-lg text-neutral-700">
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 font-bold">•</span>
                                    <span>Always verify the premium schedule to ensure affordability.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 font-bold">•</span>
                                    <span>Check the remaining tenure—shorter tenures often provide quicker liquidity.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 font-bold">•</span>
                                    <span>Ensure proper endorsement and documentation for legal ownership.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 font-bold">•</span>
                                    <span>Tax benefits depend on compliance with current Income Tax laws—consult a tax advisor for clarity.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted by The Policy Exchange Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            Trusted by The Policy Exchange
                            </h2>
                        <div className="space-y-6">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                We bring you these opportunities in partnership with The Policy Exchange—a pioneer in facilitating transparent, verified, and investor-friendly pre-owned policy transfers. With their expertise, you get access to thoroughly vetted policies, making your investment journey safe and rewarding.
                            </p>
                        </div>
                    </div>
                            </div>
            </section>

            {/* Promotional Banner Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#243062] leading-tight">
                                Smarter Investment. Tax-efficient Growth. Pre-owned Policies by The Policy Exchange.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 md:p-12 border-2 border-primary/20 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 leading-tight">
                                Ready to Explore Pre-Owned Policies?
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                                Connect with our experts to learn about tax-efficient growth and secondary market policies. Get access to vetted pre-owned policies for smarter investment.
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Modal */}
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pageSource="Pre-Owned Policies" />
        </div>
    );
};

export default PreOwnedPolicies;

