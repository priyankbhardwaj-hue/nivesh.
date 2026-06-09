import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import SaveForChildImage from '../../../assets/Save_for_Child.png';
import { fetchFAQs, type FAQ } from '../../../services/api';

const SaveForChildren: React.FC = () => {
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
                // Filter FAQs by category "save-for-children"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'save-for-children' || 
                           category === 'save for children' ||
                           category.includes('save-for-children');
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
            <section className="relative py-16 md:py-24 overflow-hidden bg-neutral-50">
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
                                    <span className="text-neutral-500">Save For Children</span>
                                </nav>
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-6 leading-tight">
                                Save for Children
                            </h1>
                            
                            <p className="text-base md:text-lg text-neutral-600 mb-8 leading-relaxed">
                                Saving for a child's future is one of the most important aspects of financial planning for every parent. Children's education is one of the biggest goals and the biggest cash flow for parents.
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

                        {/* Right Column - Children Image */}
                        <div className="relative z-10">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={SaveForChildImage}
                                    alt="Save for Children"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Save for Children Content Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Every parent wants to provide their children with sound education, a decent lifestyle, and financial security. However, the cost of education in India is rising at an alarming rate. The cost of undergraduate courses in India ranges from Rs. 8-10 lakhs per annum, and it is even higher for foreign universities. Nivesh helps you build a financial plan that ensures your child's future is secure.
                            </p>
                            
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                The impact of inflation on future education and wedding expenses is significant. Therefore, it is essential to start investing early via SIP (Systematic Investment Plan) to benefit from compounding and beat inflation. The earlier you start, the more time your money has to grow, and the less you need to invest monthly.
                            </p>
                            
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                When choosing mutual funds for your child's future, consider the investment time horizon:
                            </p>
                            
                            <ul className="space-y-3 text-base md:text-lg text-neutral-700 ml-6">
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 font-bold">•</span>
                                    <span><strong>More than 10 years:</strong> You can have higher exposure to equities and less to debt.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 font-bold">•</span>
                                    <span><strong>5-10 years:</strong> You can opt for hybrid funds or blue-chip/large-cap equity mutual funds.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 font-bold">•</span>
                                    <span><strong>Less than 5 years:</strong> You should have higher exposure to debt-oriented mutual funds and less to equities.</span>
                                </li>
                            </ul>
                            
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                It is essential to regularly monitor and balance your portfolio. As your child's goal approaches, you should gradually transfer money from volatile equity funds to safer avenues via a Systematic Investment Plan (SIP). This will help safeguard your capital and ensure that you have the funds when you need them.
                            </p>
                            
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Mutual fund investments are a great tool for a financially secured future, making parenthood a more beautiful journey. With proper planning and disciplined investing, you can ensure that your child's dreams and aspirations are well-funded.
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

export default SaveForChildren;

