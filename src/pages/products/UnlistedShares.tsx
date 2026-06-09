import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import Hero2 from '../../assets/Unlisted_Share.jpeg';
import { fetchFAQs, type FAQ } from '../../services/api';

const UnlistedShares: React.FC = () => {
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
                // Filter FAQs by category "unlisted-shares"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'unlisted-shares' || 
                           category === 'unlisted shares' ||
                           category.includes('unlisted-shares');
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
                        <span className="text-neutral-500">Unlisted Shares</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left Column - Content */}
                        <div>
                            <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] mb-4 leading-tight">
                                How to Buy Unlisted Shares in India | Best Guide by Nivesh
                            </h2>
                            <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-4 md:mb-4 leading-tight">
                                How to Buy Unlisted Shares in India | Best Guide by Nivesh
                            </h1>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
                                Looking to tap into high-growth opportunities before companies hit the stock exchange? Discover how to buy unlisted shares in India smartly, safely, and profitably with this complete guide. Understanding the legal guidelines on the tax on unlisted shares in India, selecting the best platform to buy unlisted shares in India, and navigating a secure unlisted shares buying platform are all key steps in this process. On this website, we will provide you with a clear and straightforward understanding of unlisted stocks, without any complex terms, simply and concisely, to guide your decisions. Those stocks are available on the market from brokers, private income, or online platforms. However, medications must be approached with the correct information, challenge, and the appropriate equipment.
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
                                src={Hero2}
                                alt="Unlisted Shares"
                                className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* What Are Unlisted Shares Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            What Are Unlisted Shares and Why Are Investors Talking About Them?
                        </h2>
                        <div className="space-y-6">
                            <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                Unlisted stocks refer to the shares of companies that are not listed on any recognized stock exchange in India, such as the NSE or BSE. Despite being out of the limelight, those shares promise significant possibilities for individuals seeking to invest for long-term profits. Increasing numbers of retail investors have been seeking ways to buy unlisted shares in India, offering high returns, early funding in developing companies, and the opportunity to earn money before the companies are listed.
                            </p>
                            <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
                                <ul className="space-y-4 text-base text-neutral-700 leading-relaxed">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold mt-1">•</span>
                                        <span>Unlisted stocks are traded (OTC), now not on formal stock exchanges.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold mt-1">•</span>
                                        <span>Those stocks are usually bought via dealers, agents, or specialised structures.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold mt-1">•</span>
                                        <span>The technique may additionally seem complicated, however will become simple with over-the-counter proper understanding.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold mt-1">•</span>
                                        <span>Nivesh is one of the leading platform to buy unlisted stocks in India.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold mt-1">•</span>
                                        <span>Key steps encompass understanding the over-the-counter marketplace, locating a reliable supply, and judging growth capability.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold mt-1">•</span>
                                        <span>Unlisted stocks are gaining popularity due to the success stories of groups that started out unlisted and gave excessive IPO returns.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Buy Unlisted Shares Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            How to Buy Unlisted Shares in India Safely and Smartly
                        </h2>
                        <div className="space-y-6">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Many investors want to know how to buy unlisted stocks in India safely. Buying is legal when done through a SEBI-registered dealer or a trusted unlisted shares buying platform. Shares are credited to your demat account, but may take longer than listed stocks.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <h3 className="text-lg font-semibold text-[#243062] mb-3">Avoid Informal Channels</h3>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        Avoid informal channels. Choose a regulated unlisted shares buying platform or dealer for secure, transparent transactions. Always check reviews and platform credentials.
                                    </p>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <h3 className="text-lg font-semibold text-[#243062] mb-3">Fintech Apps</h3>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        Fintech apps are making access easier. The best app to buy unlisted shares in India offers a user-friendly interface, security, financial data, and seamless demat integration.
                                    </p>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 md:col-span-2">
                                    <h3 className="text-lg font-semibold text-[#243062] mb-3">Expert Guidance</h3>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        Learn how to buy unlisted shares in India through reliable platforms. Nivesh offers expert guidance, helping you invest smartly in unlisted shares.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Platforms and Apps Matter in the Unlisted Shares Market */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 leading-tight">
                            Why Platforms and Apps Matter in the Unlisted Shares Market
                        </h2>
                        <div className="space-y-6 text-left">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                As online investment grows, it&apos;s critical to have the best app to buy unlisted shares in India. These apps provide access to unique offers, investor know-how, and business performance data. A strong app notifies you when a sale has been executed. The best unlisted shares buying platform should offer full transparency on fees, tax impact, company history, and expected listing timelines. Knowing how to buy unlisted shares in India from such platforms builds confidence in making smart investments.
                            </p>
                            <ul className="list-disc list-inside space-y-3 text-base md:text-lg text-neutral-700 leading-relaxed">
                                <li>Staying updated via a reliable unlisted shares buying platform or app is very useful.</li>
                                <li>It is not enough to know how to buy unlisted shares in India — knowing where to buy them is key.</li>
                            </ul>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                So, each time you are asked how to buy unlisted shares in India, maintain it threefold: a right platform, proper tax information, and stable evaluation. With the best app to buy unlisted shares in India, you get access to early-stage companies and opportunities earlier than the masses. With Nivesh, discover real, unlisted investment opportunities and build your portfolio before corporations reach the IPO stage. Make clever picks with professional help.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-primary-dark/10">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-lg p-8 border-2 border-primary text-center">
                            <p className="text-xl md:text-2xl font-bold text-[#243062] mb-6">
                                Do you need to invest before the crowd? Join Nivesh today and gain exclusive access to trusted, unlisted percentage deals, tax guidance, and build your portfolio with truth.
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

            {/* Final CTA Section */}
            <section className="relative py-12 md:py-20 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Invest in Unlisted Shares?
                        </h2>
                        <p className="text-base md:text-lg text-white/90 mb-8">
                            Discover high-growth opportunities before companies hit the stock exchange.
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
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pageSource="Unlisted Shares" />
        </div>
    );
};

export default UnlistedShares;

