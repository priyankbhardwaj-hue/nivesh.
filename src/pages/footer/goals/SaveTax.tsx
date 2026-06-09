import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import SaveTaxImage from '../../../assets/Save_Tax.png';
import { fetchFAQs, type FAQ } from '../../../services/api';

const SaveTax: React.FC = () => {
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
                // Filter FAQs by category "save-tax"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'save-tax' || 
                           category === 'save tax' ||
                           category.includes('save-tax');
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Column - Content */}
                        <div className="relative z-10">
                            {/* Breadcrumbs */}
                            <div className="mb-6">
                                <nav className="flex items-center space-x-2 text-sm">
                                    <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                                        Home
                                    </Link>
                                    <span className="text-neutral-400">/</span>
                                    <span className="text-neutral-500">Save Tax</span>
                                </nav>
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                                Save Tax
                            </h1>
                            
                            <p className="text-base md:text-lg text-primary font-semibold mb-6 italic">
                                "Money saved is money earned."
                            </p>
                            
                            <p className="text-base md:text-lg text-neutral-600 mb-8 leading-relaxed">
                                Intelligent investors seek tax-saving options with high returns. Nivesh is a tool to plan your finances and reduce your tax liability through appropriate investments.
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

                        {/* Right Column - TAX Image */}
                        <div className="relative z-10">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={SaveTaxImage}
                                    alt="Save Tax"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ELSS Explanation Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                Equity Linked Savings Scheme (ELSS), as the name suggests, are the mutual fund schemes that invest in equities. This investment option has the least lock-in period of 3 years amongst all tax-saving options. ELSS offers tax benefits to the investors as the investments made under this scheme are eligible for a tax deduction under Section 80C of the Income Tax Act up to a maximum amount of Rs. 1.5 lakhs. An investor should choose an ELSS fund according to his/her financial goals and risk appetite. As these funds invest in equities, it gives an experience of equities to the investors who have lately started investing and encourages them to invest in other equity-oriented mutual funds. ELSS funds are available in two options.
                            </p>
                            
                            <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                Many investors make the mistake of investing in ELSS late in the financial year. Investing early in the year will help earn a higher return on the entire amount throughout the year. A good tax-saving investment is an investment first and a saving solution later. After completion of the 3 year lock-in period, if the fund has underperformed, an investor can continue to stay invested in the fund. An investor can exit the scheme as and when the market rises and the NAV of the scheme increases.
                            </p>
                            
                            <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                An investor can invest in this tax saving instrument via both lump sum and monthly Systematic Investment Plan (SIP). If an investor invests via the SIP route, there are better chances of beating the market volatility and averaging the cost of investment. Investments through SIP are flexible, convenient, and also inculcates financial discipline. However, if an investor invests a lump sum amount in ELSS, there is a fair chance that he can enter the market at the wrong time.
                            </p>
                            
                            <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                Therefore investors should keep a tab of their taxes just as they keep a tab of their health and ELSS is a smart way to save taxes and earn yields.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Frequently Asked Questions Section */}
            <section className="py-12 md:py-20 bg-white">
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
                                        className="bg-neutral-50 rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-transparent border-none outline-none cursor-pointer hover:bg-neutral-100 transition-colors duration-200"
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

            {/* Comparison Table Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Comparison of Tax-Saving Investment Options
                        </h2>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">Investment</th>
                                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">Returns</th>
                                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">Lock-in</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200">
                                        {[
                                            { investment: 'ELSS', returns: '12 - 14%', lockIn: '3 Year' },
                                            { investment: 'NPS (National Pension System)', returns: '10 - 11%', lockIn: 'Till the age of retirement' },
                                            { investment: 'ULIP (Unit Linked Insurance Plan)', returns: 'Vary from plan to plan', lockIn: '5 Year' },
                                            { investment: 'PPF (Public Provident Fund)', returns: '7 - 8%', lockIn: '15 Year' },
                                            { investment: 'NSC (National Savings Certificate)', returns: '7 - 8%', lockIn: '5 Year' },
                                            { investment: 'Senior Citizen Saving Scheme', returns: '8%', lockIn: '5 Year' },
                                            { investment: 'Bank FD Five Year (Fixed Deposit)', returns: '6 - 7%', lockIn: '5 Year' },
                                            { investment: 'Insurance', returns: 'Vary from plan to plan', lockIn: '5 - 10 Year' },
                                        ].map((row, index) => (
                                            <tr key={index} className="hover:bg-neutral-50 transition-colors">
                                                <td className="px-6 py-4 text-sm md:text-base font-medium text-[#243062]">
                                                    {row.investment}
                                                </td>
                                                <td className="px-6 py-4 text-sm md:text-base text-neutral-700">
                                                    {row.returns}
                                                </td>
                                                <td className="px-6 py-4 text-sm md:text-base text-neutral-700">
                                                    {row.lockIn}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SaveTax;

