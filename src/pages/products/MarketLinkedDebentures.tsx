import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import MLDImage from '../../assets/MLD.jpeg';
import MLD2Image from '../../assets/MLD2.webp';
import EdelweissLogo from '../../assets/Edelweiss.jpeg';
import IncredWealthLogo from '../../assets/IncredWealth.jpeg';
import { fetchFAQs, type FAQ } from '../../services/api';

const MarketLinkedDebentures: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
    const [openBenefits, setOpenBenefits] = useState<{ [key: number]: boolean }>({ 0: true }); // First one open by default
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
                // Filter FAQs by category "market-linked-debentures"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'market-linked-debentures' || 
                           category === 'market linked debentures' ||
                           category.includes('market-linked-debentures');
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
                        <span className="text-neutral-500">Market Linked Debentures</span>
                    </nav>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left Column - Content */}
                        <div className="relative z-10">
                            <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] mb-4 leading-tight">
                                Market Linked Debentures in India: High-Return, Tax-Efficient Investments for 2026
                            </h2>
                            <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-4 md:mb-4 leading-tight">
                                Market Linked Debentures in India: High-Return, Tax-Efficient Investments for 2026
                            </h1>
                            
                            <p className="text-base md:text-lg text-neutral-600 mb-8 leading-relaxed">
                                In 2026, Indian investors have shifted focus to Market Linked Debentures (MLDs) as sophisticated investment tools offering diversification and tax-efficient benefits. Unlike conventional fixed-income investments, MLDs provide participation in capital markets while offering principal protection. MLDs are gaining traction among High Net-Worth Individuals (HNIs) and family offices, with placements linked to Nifty, Sensex, or commodities (silver, gold, etc.).
                            </p>
                            
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#243062] hover:bg-[#1a2550] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                I am Interested
                            </Button>
                        </div>

                        {/* Right Column - Image */}
                        <div className="relative z-10">
                            <img
                                src={MLDImage}
                                alt="Market Linked Debentures"
                                className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* What are Market Linked Debentures Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Column - Visual Graphic */}
                        <div className="relative">
                            <div
                                className="relative rounded-xl overflow-hidden min-h-[220px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[400px]"
                                style={{
                                    background: 'linear-gradient(135deg, #8B4513 0%, #FF8C00 100%)',
                                }}
                            >
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                                    }}></div>
                                </div>
                                <div className="relative h-full min-h-[220px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[400px] flex items-center justify-center p-4 sm:p-6 md:p-8">
                                    <img
                                        src={MLD2Image}
                                        alt="Market Linked Debentures"
                                        className="w-full h-auto object-contain max-h-48 sm:max-h-64 md:max-h-80 lg:max-h-96"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Text Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] leading-tight">
                                What is Market Linked Debentures?
                            </h2>
                            <div className="space-y-4">
                                <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                    Market Linked Debentures (MLDs) are a form of non-convertible debentures (NCDs) where returns are linked to a market index (like Nifty, Sensex) or a commodity (like silver or gold).
                                </p>
                                <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                    MLDs do not offer periodic payouts; instead, their payout is conditional. For example, if Nifty 50 returns more than 0% in 3 years, investors get a 10% annualized return, but if returns are less than 0%, only the principal is returned.
                                </p>
                                <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                    MLDs combine the characteristics of bonds with the risk and reward of stocks and commodities. They are attractive due to capital protection at maturity, making them suitable for investors with a moderate risk profile.
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
                            Key Features of Market Linked Debentures in India
                        </h2>
                        <p className="text-base md:text-lg text-neutral-600 mt-4">
                            Here are the core characteristics that define Market-Linked Debentures:
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                title: 'Index-Linked Returns',
                                description: 'MLDs derive performance from market indices such as the Nifty 50 or MCX Gold. Popular Nifty Linked Debentures enable investors to benefit from the growth of the Indian equity market.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Capital Protection',
                                description: 'Even if the underlying index underperforms, the capital invested is returned at maturity. MLDs have inbuilt principal protection protocols that ensure that your capital doesn\'t take a significant hit, even if the market behaves irrationally.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Upside Participation',
                                description: 'Participation rates often exceed 100%. For instance, if the Nifty rises by 15% and the participation rate is 130%, the investor gains a 19.5% return.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Tailored Payouts',
                                description: 'From capped returns to uncapped structures, market-linked debentures in India offer customised options based on your financial goals.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Tax Efficiency',
                                description: 'With strategic planning, the market-linked debentures taxation landscape in India allows investors to optimise post-tax returns by leveraging lower-income family PANs.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-5m-6 5h6a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
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

            {/* Why MLDs are the Go-To Option Section */}
            <section className="py-12 md:py-20 relative overflow-hidden bg-[#243062]" >
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center leading-tight">
                            Why MLDs are the Go-To Option in 2026?
                        </h2>
                        <p className="text-base md:text-lg text-gray-200 mb-8 text-center leading-relaxed">
                            As regional inflationary pressures rise and global markets undergo persistent volatility, market-linked debentures in India offer a remarkable combination of safety, growth potential, and tax considerations.
                        </p>
                        <div className="space-y-4">
                            {[
                                {
                                    title: 'Increased Potential Returns',
                                    description: 'With MLDs gaining popularity, especially during bullish phases with Nifty Linked Debentures, their return projections significantly exceed the set yield from FDs and other traditional bonds. Market-linked debentures in India (MLDs) are known to outperform mutual funds and specific equities with the capital protection clause. MLDs that participate actively in the capital markets tend to offer much better results than most mutual funds or even some equities, with a lot of capital protection offered.',
                                },
                                {
                                    title: 'Customisation and Diversification',
                                    description: 'Gold-linked MLDs cater to conservative investors who are not looking to dabble in the dynamics of heavy commodities, while those bullish on Indian stocks would be more interested in Nifty-linked Debentures. The flexibility in structure makes MLDs a valuable tool for multi-faceted portfolio diversification.',
                                },
                                {
                                    title: 'Protection of Capital',
                                    description: 'In today\'s uncertain financial climate, these features are particularly relevant. Investors concerned about downside risks can remain active in the market with pacified downside anxiety. Most MLDs claim full or partial redemption of the principal amount at maturity.'
                                },
                                {
                                    title: 'Efficiency in Taxes',
                                    description: 'MLDs now fall under the jurisdiction of taxation, according to the investor\'s income bracket for headline income tax slabs, as deemed appropriate after the receipt of India\'s 2023 budget.'
                                },
                            ].map((benefit, index) => (
                                <div
                                    key={index}
                                    className={`rounded-xl overflow-hidden transition-all duration-300 ${
                                        openBenefits[index] 
                                            ? 'bg-primary shadow-lg' 
                                            : 'bg-primary/10 shadow-md'
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleBenefit(index)}
                                        className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-primary border-none outline-none cursor-pointer hover:bg-primary/10 transition-colors duration-200"
                                    >
                                        <h4 className="text-base font-bold text-white pr-4 md:hidden">
                                            {benefit.title}
                                        </h4>
                                        <h3 className="hidden md:block text-lg md:text-xl font-bold text-white pr-4">
                                            {benefit.title}
                                        </h3>
                                        <svg
                                            className={`w-5 h-5 text-white flex-shrink-0 transition-transform duration-300 ${
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
                                            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
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

            {/* Nifty Linked Debentures - A Case Study Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            Nifty Linked Debentures - A Case Study
                        </h2>
                        <div className="space-y-4 text-base md:text-lg text-neutral-700 leading-relaxed">
                            <p>
                                Let&apos;s examine Nifty Linked Debentures, arguably one of the most popular structures of market-linked debentures in India.
                            </p>
                            <p>
                                These MLDs are market instruments that are indexed to the Nifty 50, the leading benchmark index in India. To illustrate, an MLD that is expected to be issued in January 2025 might promise 135% participation on a 36-month term.
                            </p>
                            <p>
                                If the Nifty 50 improves by 25% by 2028, the market-linked debentures in India will give a return of 33.75% (25% × 1.35), and will not be subject to taxation. The built-in capital protection further enhances the appeal of Nifty Linked Debentures as an investment alternative to fixed deposits and equities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Taxation of Market Linked Debentures Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            Taxation of Market Linked Debentures in India
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
                                    Understanding the tax implications of market-linked debentures (MLDs) in India is crucial for optimizing net profits. As of 2023, all proceeds from MLDs will be taxed as short-term capital gains or business income under the slab rate, which eliminates the previous 10% Long Term Capital Gains (LTCG) tax benefit.
                                </p>
                                
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    How to Optimize Legally:
                                </h3>
                                <ul className="space-y-3 list-disc list-inside text-base md:text-lg text-neutral-700 mb-6">
                                    <li>Through lower-taxed family members.</li>
                                    <li>Use in conjunction with other tax-sheltered vehicles.</li>
                                    <li>Work with a tax specialist for tailored advice.</li>
                                </ul>
                                
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    Even with slab rate taxation, effective planning around MLD taxation in India may enhance post-tax yields compared to other debt instruments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Should Invest in Market Linked Debentures Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            Who Should Invest in Market Linked Debentures?
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 md:p-8 border border-neutral-200">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
                                    Market-linked debentures in India are best customized around specific types of investors.
                                </p>
                                
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    Target Investor Profiles:
                                </h3>
                                <ul className="space-y-3 list-disc list-inside text-base md:text-lg text-neutral-700">
                                    <li>High-Net-Worth Individuals (HNIs) and Non-Resident Indians (NRIs) as sophisticated wealth management clients.</li>
                                    <li>Family offices looking for access to hybrid debt with growth potential.</li>
                                    <li>Clients with a relevant knowledge of market-linked debentures who need capital preservation.</li>
                                    <li>Those looking for self-managed investment options rather than mutual funds or term deposits.</li>
                                    <li>Individuals seeking optimal tax planning with investments under the existing market-linked debentures taxation guidelines in India.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Thoughts Section */}
            <section className="py-12 md:py-20 bg-gradient-to-r from-[#243062] to-[#1a2550]">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Final Thoughts: Are MLDs the Smart Investment for 2025?
                        </h2>
                        <p className="text-base md:text-lg text-white leading-relaxed mb-8">
                            If you&apos;re wondering what market-linked debentures are and whether they fit your portfolio, the answer lies in your financial goals. For those looking to participate in market upside with capital protection and strategic tax planning, market-linked debentures in India are an elite option in 2025.
                        </p>
                        <p className="text-base md:text-lg text-white leading-relaxed">
                            Whether through Nifty Linked Debentures or commodity-based structures, MLDs offer flexibility, high returns, and customization that few other financial products can match. With proper planning around market-linked debentures taxation in India, they can deliver superior post-tax wealth growth.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Partners Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-12 md:mb-16 text-center leading-tight">
                            Our Partners
                        </h2>
                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                            <img
                                src={IncredWealthLogo}
                                alt="InCred Wealth"
                                className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                            />
                            <img
                                src={EdelweissLogo}
                                alt="Edelweiss"
                                className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                            />
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

            {/* Call to Action Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 md:p-12 border-2 border-primary/20 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 leading-tight">
                                Ready to Explore MLD Opportunities?
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                                Connect with our investment experts to learn more about Market Linked Debentures and how they can fit into your investment strategy.
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
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pageSource="Market Linked Debentures" />
        </div>
    );
};

export default MarketLinkedDebentures;

