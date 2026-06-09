import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import GiftCityImage from '../../assets/gift_city.jpeg';
import { fetchFAQs, type FAQ } from '../../services/api';

const GiftCity: React.FC = () => {
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
                // Filter FAQs by category "gift-city"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'gift-city' || 
                           category === 'gift city' ||
                           category.includes('gift-city');
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
                        <span className="text-neutral-500">Gift City</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left Column - Content */}
                        <div>
                            <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] mb-4 leading-tight">
                                Gujarat International Finance Tec-City: Invest Smartly
                            </h2>
                            <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-4 md:mb-4 leading-tight">
                                Gujarat International Finance Tec-City: Invest Smartly
                            </h1>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
                                The rise of the Indian economic scenario offers unique opportunities to international investors. For Non-resident Indians (NRIs), foreign nationals, and institutional players seeking streamlined access to this vibrant market, Gujarat International Finance Tec-City (GIFT City) emerges as the premier International Financial Services Center (IFSC). This meticulously planned financial hub within India offers a unique blend of regulatory efficiency, cost advantages, and world-class infrastructure, making it the ideal platform for investment in GIFT City, a rising International Financial Service Center.
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

                        {/* Right Column - Image */}
                        <div className="relative z-10">
                            <img
                                src={GiftCityImage}
                                alt="GIFT City"
                                className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* What is GIFT City Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            What is GIFT City? India's Global Financial Gateway
                        </h2>
                        <div className="space-y-6">
                            <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                Gujarat International Finance Tec-City isn't just another urban development; it's India's ambitious vision materialized. GIFT city is a 886-acres area developed between Ahmedabad and Gandhinagar, supported by the Government of Gujarat and the Government of India. It is expected to compete with other global financial hubs such as Singapore and Dubai.
                            </p>
                            <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                Key pillars cement its status as a leading International Financial Service Center:
                            </p>
                            <div className="space-y-4 mt-6">
                                <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
                                    <h3 className="text-xl font-semibold text-[#243062] mb-3">Unified Regulator:</h3>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        These powers awarded to the IFSC Authority (IFSCA) are a combination of the RBI, SEBI, IRDAI, and PFRDA of India, thus providing a streamlined control and approval process.
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
                                    <h3 className="text-xl font-semibold text-[#243062] mb-3">Competitive Tax and Cost Regime:</h3>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        Wages, tax regime, and other operating expenses are benchmarked competitively against other large IFSCs worldwide. This cost advantage makes it even more attractive for investment in GIFT City by global investors
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
                                    <h3 className="text-xl font-semibold text-[#243062] mb-3">State-of-the-Art Infrastructure:</h3>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        Next-generation urban planning, cutting-edge ICT infrastructure, and a "walk-to-work" concept foster a world-class business environment.
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
                                    <h3 className="text-xl font-semibold text-[#243062] mb-3">Robust Ecosystem:</h3>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        Ranked #1 for future significance among emerging IFSCs (Global Financial Centres Index, 2021), it hosts over 128 licensed Financial Market Entities (FMEs) and has facilitated ~USD 5.58 Billion in funds raised (as of Sep 30, 2024).
                                    </p>
                                </div>
                            </div>
                            <p className="text-base md:text-lg text-[#243062] leading-relaxed mt-6">
                                Essentially, GIFT International Financial Services Centre acts as a seamless conduit, This makes it one of the most competitive International Financial Service Center destinations in Asia bringing India-centric financial transactions back to Indian shores while operating under globally compatible regulations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Invest Through GIFT City Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            Why Invest Through GIFT City? Compelling Advantages for Global Investors
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
                            Choosing the GIFT International Financial Services Center for accessing Indian markets offers distinct for accessing Indian markets offers distinct, regulated advantages:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                <h3 className="text-lg font-semibold text-[#243062] mb-3">Access for Global Investors</h3>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    NRIs, foreign nationals, and Foreign Institutional Investors (FIIs) can efficiently invest in India-focused solutions.
                                </p>
                            </div>
                            <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                <h3 className="text-lg font-semibold text-[#243062] mb-3">USD Denomination</h3>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    Investments are made and redeemed in US Dollars, eliminating complex currency conversions for international investors.
                                </p>
                            </div>
                            <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                <h3 className="text-lg font-semibold text-[#243062] mb-3">Regulatory Simplicity</h3>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    Foreign investors typically avoid the need for a separate Foreign Portfolio Investor (FPI) license from SEBI when investing via GIFT City structures.
                                </p>
                            </div>
                            <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                <h3 className="text-lg font-semibold text-[#243062] mb-3">Tax Efficiency</h3>
                                <ul className="text-base text-neutral-700 leading-relaxed space-y-2 list-disc list-inside">
                                    <li>There is no requirement for Non-resident investors (including NRIs, foreign nationals, and FIIs) to obtain an Indian PAN card if their only Indian income is from the GIFT City fund.</li>
                                    <li>There is no requirement to file an Indian Income Tax Return for the same category of investors.</li>
                                </ul>
                            </div>
                            <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                <h3 className="text-lg font-semibold text-[#243062] mb-3">Operational Ease</h3>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    Investors can remit funds. This seamless process enhances the appeal of investment in GIFT City for global investor, directly from their foreign bank accounts to the fund's GIFT City account; no local Indian bank account is needed.
                                </p>
                            </div>
                            <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                <h3 className="text-lg font-semibold text-[#243062] mb-3">Established Fund Ecosystem</h3>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    A deepening pool of asset managers, custodians, and professional services ensures operational maturity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AMC International Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            AMC International (IFSC): Your Trusted Partner in GIFT City
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
                            AMC International (IFSC) Limited, a wholly-owned subsidiary of one of India's largest asset management companies (with USD 89.54 Bn AUM as of Jan 2025), is a registered FME (Retail) within Gujarat International Finance Tec-City. It provides global investors with a convenient and credible route, helping them leverage the advantages of the GIFT International Financial Services Center ecosystem through feeder funds domiciled in the GIFT International Financial Services Center.
                        </p>
                        <div className="bg-white rounded-lg p-8 border border-neutral-200">
                            <h3 className="text-2xl font-semibold text-[#243062] mb-6">Structure Simplified:</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-[#243062] mb-2">GIFT IFSC Fund:</h4>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            Investors subscribe to a fund domiciled within GIFT City.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-[#243062] mb-2">Investment into Master Fund:</h4>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            The GIFT City fund allocates substantially all its assets (typically ~100% minus expenses) into units of the corresponding SEBI-registered "Master Fund" in India.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-[#243062] mb-2">Portfolio Management:</h4>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            The underlying portfolio of Indian securities is managed by the asset management company in line with the Master Fund's objective.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Investment Opportunities Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            Investment Opportunities: GIFT City Fund Offerings
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
                            AMC in IFSC offers a suite of Category III Alternative Investment Funds (AIFs) within Gujarat International Finance Tec-City, acting as feeders into well-established domestic schemes
                        </p>
                        <div className="bg-primary/5 rounded-lg p-8 border border-primary/20">
                            <h3 className="text-2xl font-semibold text-[#243062] mb-4">Feeder into Domestic Mutual Fund Schemes:</h3>
                            <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                GIFT IFSC enables international investors to access India's growth story through feeder funds that invest in domestic mutual fund schemes. These structures allow NRIs and FIIs to participate in diverse Indian market segments while operating within IFSC regulatory and tax framework.
                            </p>
                            <p className="text-base text-neutral-700 leading-relaxed">
                                These feeder structures leverage IFSC's tax benefits (e.g., 10-year corporate tax exemption) and simplified compliance to strengthen India's position as an investment destination for global capital.
                            </p>
                        </div>
                        <div className="mt-8 bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                            <h3 className="text-2xl font-semibold text-[#243062] mb-6">Key Terms Common to GIFT City Funds:</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Minimum Investment:</h4>
                                    <p className="text-base text-neutral-700">USD 150,000 (to be maintained).</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Structure:</h4>
                                    <p className="text-base text-neutral-700">Open-ended (Restricted, Non-Retail).</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Valuation:</h4>
                                    <p className="text-base text-neutral-700">Daily (Every Business Day).</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Investor Eligibility:</h4>
                                    <p className="text-base text-neutral-700">NRIs, Foreign Nationals, FIIs. Explicitly excludes Resident Indians and investors from FATF (Financial Action Task Force) "Black List" nations. These funds are regulated under the robust framework of the GIFT International Financial Services Center.</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Service Providers:</h4>
                                    <p className="text-base text-neutral-700">Reputable names like Vistra ITCL (Trustee), Standard Chartered Bank (Custodian), and CAMS (RTA).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Future is Bright Section */}
            <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-primary-dark/10">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            The Future is Bright: GIFT City's Strategic Role
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
                            Gujarat International Finance Tec-City is strategically positioned to become an even more significant global financial hub. Its combination of a unified regulator, favorable operating environment, and deepening ecosystem makes it indispensable for facilitating both inbound and outbound financial flows related to India, cementing its role as a major International Financial Service Center.. For the vast Indian diaspora (over 30 million) and global investors seeking calibrated exposure to India's growth story, investment in GIFT City, particularly through established players in IFSC, offers a compelling, regulated, and efficient pathway. As the GIFT international financial services center continues to evolve and attract global capital, its role as India's financial gateway is set to expand exponentially.
                        </p>
                        <div className="bg-white rounded-lg p-8 border-2 border-primary text-center">
                            <p className="text-2xl md:text-3xl font-bold text-[#243062]">
                                Unlock India's Potential. Invest smartly in the international financial service center ecosystem of GIFT City.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Frequently Asked Questions Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#243062] mb-10 md:mb-12 text-center leading-tight">
                            Frequently Asked Questions
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
                                        className="bg-white rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-300 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-transparent border-none outline-none cursor-pointer hover:bg-neutral-50 transition-colors duration-200"
                                        >
                                            <h5 className="text-base md:text-lg font-bold text-[#243062] pr-4">
                                                {faq.question}
                                            </h5>
                                            <svg
                                                className={`w-5 h-5 text-[#243062] flex-shrink-0 transition-transform duration-300 ${
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

            {/* CTA Section */}
            <section className="relative py-12 md:py-20 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Invest in GIFT City?
                        </h2>
                        <p className="text-base md:text-lg text-white/90 mb-8">
                            Explore investment opportunities in India's premier International Financial Services Center.
                        </p>
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white hover:bg-neutral-100 text-primary px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            I am Interested
                        </Button>
                    </div>
                </div>
            </section>

            {/* Contact Modal */}
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pageSource="Gift City" />
        </div>
    );
};

export default GiftCity;

