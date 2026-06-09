import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import BuildLongTermImage from '../../../assets/build_long_term.png';
import BuildLongTermGraphImage from '../../../assets/build_long_term_graph.png';
import { fetchFAQs, type FAQ } from '../../../services/api';

const BuildLongTermWealth: React.FC = () => {
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
                // Filter FAQs by category "build-long-term-wealth"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'build-long-term-wealth' || 
                           category === 'build long term wealth' ||
                           category.includes('build-long-term-wealth');
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

    // Chart data for wealth build-up (used in data table)
    const chartData = [
        { year: 3, investment: 360000, wealth: 435076 },
        { year: 5, investment: 600000, wealth: 824864 },
        { year: 10, investment: 1200000, wealth: 2323391 },
        { year: 15, investment: 1800000, wealth: 5045760 },
        { year: 20, investment: 2400000, wealth: 9991479 },
    ];

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
                                <nav className="flex items-start space-x-2 text-sm">
                                    <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                                        Home
                                    </Link>
                                    <span className="text-neutral-400">/</span>
                                    <span className="text-neutral-500">Build Long Term Wealth</span>
                                </nav>
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                                Build Long Term Wealth
                            </h1>
                            
                            <p className="text-base md:text-lg text-neutral-600 mb-6 italic">
                                "Being rich is not equal to being wealthy." - Psychology of Money, Morgan Housel
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

                        {/* Right Column - Wealth Image */}
                        <div className="relative z-10">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={BuildLongTermImage}
                                    alt="Build Long Term Wealth"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Save Money Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                            Save Money
                        </h2>
                        <div className="space-y-4">
                            <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                            Saving money is the foundation of building long-term wealth. Many of us are not able to reach our savings goals and often our expenses exceed the budget. To start saving efficiently, write down basic accounting of how much money you make vs how much money you spend. Allocate your income for specific purposes like living expenses, savings, elimination of debt, and ‘fun’ money(you will feel motivated to make more money). After you start achieving your savings goals, take a step towards building your emergency fund to cover your expenses in case of an illness or injury or any other emergency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Invest Your Money Wisely Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                            Invest Your Money Wisely:
                        </h2>
                        <div className="space-y-6">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Building long-term wealth requires time, diversification, and asset allocation. You should invest at least 10% of your monthly income in long-term investments like stocks, mutual funds, ETFs, bonds, and insurance. Determine your investment horizon, financial goals (e.g., buying a house, car, education, retirement), and risk appetite.
                            </p>
                            
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Investing in mutual funds through a Systematic Investment Plan (SIP) helps you in disciplined investing without fearing market volatility. Asset allocation across different asset classes like equity, debt, and gold, which are available within mutual funds, is important for building long-term wealth.
                            </p>
                            
                            <p className="text-base md:text-lg font-semibold text-neutral-700 leading-relaxed">
                                The following chart depicts value of building wealth through systematic investments over a long period of time:
                            </p>

                            {/* Chart Section */}
                            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200 mt-8">
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-6 text-center">
                                    Wealth Build-Up with Consistent Investment
                                </h3>
                                
                                {/* Chart Image */}
                                <div className="mb-8">
                                    <div className="rounded-lg overflow-hidden bg-white border border-neutral-200">
                                        <img
                                            src={BuildLongTermGraphImage}
                                            alt="Wealth Build-Up with Consistent Investment"
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Data Table */}
                                <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-sm md:text-base font-semibold">Year</th>
                                                    <th className="px-4 py-3 text-left text-sm md:text-base font-semibold">Investment (Rs.)</th>
                                                    <th className="px-4 py-3 text-left text-sm md:text-base font-semibold">Wealth (Rs.)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-neutral-200">
                                                {chartData.map((row, index) => (
                                                    <tr key={index} className="hover:bg-neutral-50 transition-colors">
                                                        <td className="px-4 py-3 text-sm md:text-base font-medium text-[#243062]">
                                                            {row.year} Years
                                                        </td>
                                                        <td className="px-4 py-3 text-sm md:text-base text-neutral-700">
                                                            {row.investment.toLocaleString('en-IN')}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm md:text-base text-neutral-700">
                                                            {row.wealth.toLocaleString('en-IN')}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                A monthly investment of Rs. 10,000 over a 20 years period can yield about Rs. 1 crore at an assumed return of 12% pa, while the total investment will be Rs. 24 lakh.
                            </p>
                            
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Starting early with your investments is crucial. The power of compounding helps grow your wealth from small, consistent amounts over time, making it easier to achieve your long-term financial goals.
                            </p>
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

export default BuildLongTermWealth;

