import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import LASImage from '../../assets/LAS.png';
import MiraeAssetLogo from '../../assets/MiraeAsset.png';
import BajajFinservLogo from '../../assets/BajajFinserv.svg';
import StandardCharteredLogo from '../../assets/StandardChartered.png';
import { fetchFAQs, type FAQ } from '../../services/api';
import usePageStatistics from '../../hooks/usePageStatistics';

const LoanAgainstSecurities: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
    const [lasInfoTab, setLasInfoTab] = useState<'eligibility' | 'types-of-securities' | 'required-documents'>('eligibility');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calculatorData, setCalculatorData] = useState({
        investmentAmount: 5000000,
        rateOfInterest: 12,
        timeInYears: 5,
    });
    const [futureValue, setFutureValue] = useState(0);
    const fallbackStats = [
        { number: '9,134', description: 'Partners in 772 cities across India' },
        { number: '58,505', description: 'Customers spread over 3,000 pincodes' },
        { number: '48,54,650', description: 'Transactions Executed' },
        { number: 'Rs. 6,478', description: 'Crore- Transaction Value' },
    ];
    const { stats: displayStats, loading: statsLoading, error: statsError } = usePageStatistics(
        'loan-against-securities',
        fallbackStats
    );

    useEffect(() => {
        const { investmentAmount, rateOfInterest, timeInYears } = calculatorData;
        const r = rateOfInterest / 100;
        const fv = investmentAmount * Math.pow(1 + r, timeInYears);
        setFutureValue(Math.round(fv));
    }, [calculatorData]);

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFaqs(true);
                const allFaqs = await fetchFAQs();
                // Filter FAQs by category "loan-against-securities"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'loan-against-securities' || 
                           category === 'loan against securities' ||
                           category.includes('loan-against-securities');
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
            <section className="pt-20 md:pt-24 pb-12 md:pb-20 bg-gradient-to-br from-primary/10 via-white to-primary/5">
                <div className="container-custom">
                    <div className="max-w-7xl mx-auto">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center space-x-2 text-sm mb-6">
                            <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                                        Home
                                    </Link>
                            <span className="text-neutral-400">/</span>
                            <span className="text-neutral-500">Loan Against Securities</span>
                        </nav>

                        <div className="grid lg:grid-cols-[40%_60%] gap-6 md:gap-6 items-start">
                            <div className="lg:pr-6">
                                <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] mb-4 leading-tight">
                                Loan Against Securities- an Instant Overdraft Facility
                                </h2>
                                <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-4 md:mb-4 leading-tight">
                                Loan Against Securities- an Instant Overdraft Facility
                                </h1>
                                <p className="text-base md:text-lg text-neutral-700 mb-6 md:mb-8 leading-relaxed">
                                Loan Against Securities (LAS) allows you to borrow funds and retain portfolio/ investments and fulfill immediate/short-term requirements at the same time.In Loan Against Securities pledge your Equity Shares, Mutual Fund Holdings, etc. Nivesh Brings you a quick and secured financing Loan against securities from Rs. 25,000 onwards to Rs.100 Cr rates starting from 10.25 % per annum only on amount and duration utilised.                                </p>
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
                            <div className="relative z-10">
                                <img
                                    src={LASImage}
                                    alt="Loan Against Securities"
                                    className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Unlocking the Benefits of LAS */}
            <section className="py-12 md:py-20 bg-slate-100">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-10 md:mb-14 text-center leading-tight">
                            Unlocking the Benefits of LAS
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {[
                                { title: 'Full Ownership', description: 'Stay invested with full ownership while enjoying market gains.', icon: (<svg className="w-10 h-10 text-[#243062]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>) },
                                { title: 'Dividends and Interest', description: 'Keep earning dividends and interest even while availing the loan.', icon: (<svg className="w-10 h-10 text-[#243062]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>) },
                                { title: "Portfolio's Value", description: "Tap into your portfolio's value to seize new wealth-building opportunities.", icon: (<svg className="w-10 h-10 text-[#243062]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>) },
                                { title: 'No fixed EMIs', description: 'Pay interest only on what you use, when you use it.', icon: (<span className="text-2xl font-bold text-[#243062]">EMI</span>) },
                                { title: 'Competitive Rates', description: 'Enjoy competitive rates, charged solely on the drawn amount.', icon: (<svg className="w-10 h-10 text-[#243062]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" /></svg>) },
                                { title: 'Repay Anytime', description: 'Repay anytime, partially or fully, without penalties.', icon: (<svg className="w-10 h-10 text-[#243062]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>) },
                                { title: 'No Extra Cost', description: 'Close the loan whenever you like—no extra cost, no hassle.', icon: (<svg className="w-10 h-10 text-[#243062]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>) },
                                { title: 'No Lock-in Period', description: 'Walk out anytime (No Lock-in Period) —perfect for short-term or emergency needs.', icon: (<svg className="w-10 h-10 text-[#243062]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16" strokeWidth={2.5} /></svg>) },
                            ].map((item, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm flex flex-col items-center text-center">
                                    <div className="w-14 h-14 mb-4 flex items-center justify-center">{item.icon}</div>
                                    <h3 className="text-lg font-bold text-[#243062] mb-2">{item.title}</h3>
                                    <p className="text-sm md:text-base text-neutral-600 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10 md:mt-14">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#243062] hover:bg-[#1a2550] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                Apply Now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Partners */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-10 md:mb-14 text-center leading-tight">
                            Our Partners
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <div className="bg-white rounded-xl p-8 border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center min-h-[200px]">
                                <img src={MiraeAssetLogo} alt="Mirae Asset Financial Services" className="h-12 md:h-14 w-auto object-contain mb-4" />
                                <p className="font-bold text-neutral-900 text-base md:text-lg">Mirae Asset Financial Services</p>
                            </div>
                            <div className="bg-white rounded-xl p-8 border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center min-h-[200px]">
                                <img src={BajajFinservLogo} alt="Bajaj Finserv" className="h-12 md:h-14 w-auto object-contain mb-4" />
                                <p className="font-bold text-neutral-900 text-base md:text-lg">Bajaj Finserv</p>
                            </div>
                            <div className="bg-white rounded-xl p-8 border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center min-h-[200px]">
                                <img src={StandardCharteredLogo} alt="Standard Chartered" className="h-12 md:h-14 w-auto object-contain mb-4" />
                                <p className="font-bold text-neutral-900 text-base md:text-lg">Standard Chartered</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Eligibility / Types of Securities / Required Documents */}
            <section className="py-12 md:py-20 bg-slate-100">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-3 mb-6">
                            <button
                                type="button"
                                role="tab"
                                aria-selected={lasInfoTab === 'eligibility'}
                                onClick={() => setLasInfoTab('eligibility')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    lasInfoTab === 'eligibility'
                                        ? 'bg-[#243062] text-white shadow-md'
                                        : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                                }`}
                            >
                                Eligibility
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={lasInfoTab === 'types-of-securities'}
                                onClick={() => setLasInfoTab('types-of-securities')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    lasInfoTab === 'types-of-securities'
                                        ? 'bg-[#243062] text-white shadow-md'
                                        : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                                }`}
                            >
                                Types of Securities
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={lasInfoTab === 'required-documents'}
                                onClick={() => setLasInfoTab('required-documents')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    lasInfoTab === 'required-documents'
                                        ? 'bg-[#243062] text-white shadow-md'
                                        : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                                }`}
                            >
                                Required Documents
                            </button>
                        </div>
                        <div className="bg-white rounded-lg p-8 border border-neutral-200 shadow-sm">
                            {lasInfoTab === 'eligibility' && (
                                <div role="tabpanel" className="space-y-4">
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        Nivesh is facilitating loans against securities to the following categories that are Indian registered for a tenure of 12 months and renewable thereafter up to 3 years.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-base text-neutral-700 leading-relaxed">
                                        <li>Individuals</li>
                                        <li>Corporates</li>
                                        <li>HUF & Partnerships</li>
                                    </ul>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        Contact our relationship manager now to request a quick assessment of loan to value for your securities.
                                    </p>
                                </div>  
                            )}
                            {lasInfoTab === 'types-of-securities' && (
                                <div role="tabpanel" className="space-y-4">
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                    LAS can be availed against a multitude of securities as listed below:  
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-base text-neutral-700 leading-relaxed">
                                        <li>Loan against Equity Shares</li>
                                        <li>Loan against Mutual Funds</li>
                                        <li>Loan against Stocks</li>
                                    </ul>                                    
                                </div>
                            )}
                            {lasInfoTab === 'required-documents' && (
                                <div role="tabpanel" className="space-y-4">
                                    <ul className="list-disc list-inside space-y-2 text-base text-neutral-700 leading-relaxed">
                                        <li>Photo Identity Proof</li>
                                        <li>Address Proof</li>
                                        <li>Bank Statements</li>
                                        <li>Securities Proof</li>
                                        <li>Statement of Holding</li>
                                    </ul> 
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            
            {/* Statistics Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            {statsLoading && (
                                <div className="text-neutral-600">Loading statistics...</div>
                            )}
                            {statsError && (
                                <div className="text-red-600">{statsError}</div>
                            )}
                            {displayStats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-[#243062] mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm md:text-base text-neutral-700">{stat.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12 md:py-20 bg-slate-100">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Calculator
                        </h2>
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 shadow-sm">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Investment Amount
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="100000"
                                            max="100000000"
                                            step="100000"
                                            value={calculatorData.investmentAmount}
                                            onChange={(e) =>
                                                setCalculatorData({
                                                    ...calculatorData,
                                                    investmentAmount: parseInt(e.target.value, 10),
                                                })
                                            }
                                            className="flex-1 accent-primary cursor-pointer"
                                        />
                                        <span className="text-sm text-neutral-500 min-w-[100px] text-right">
                                            ₹ {formatCurrency(calculatorData.investmentAmount)}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Rate of Interest Annual (in %)
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="1"
                                            max="20"
                                            step="0.5"
                                            value={calculatorData.rateOfInterest}
                                            onChange={(e) =>
                                                setCalculatorData({
                                                    ...calculatorData,
                                                    rateOfInterest: parseFloat(e.target.value),
                                                })
                                            }
                                            className="flex-1 accent-primary cursor-pointer"
                                        />
                                        <span className="text-sm text-neutral-500 min-w-[60px] text-right">
                                            {calculatorData.rateOfInterest}%
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Time in Years
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={calculatorData.timeInYears}
                                            onChange={(e) =>
                                                setCalculatorData({
                                                    ...calculatorData,
                                                    timeInYears: parseInt(e.target.value, 10),
                                                })
                                            }
                                            className="flex-1 accent-primary cursor-pointer"
                                        />
                                        <span className="text-sm text-neutral-500 min-w-[70px] text-right">
                                            {calculatorData.timeInYears} Years
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 mt-6">
                                    <div className="text-sm text-neutral-600 mb-2">Details:</div>
                                    <div className="text-2xl font-bold text-primary">
                                        Future Value: ₹ {formatCurrency(futureValue)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* FAQs Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
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
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={faq.id} className="bg-neutral-50 rounded-lg border border-neutral-200 overflow-hidden">
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-neutral-100 transition-colors"
                                        >
                                            <span className="font-semibold text-[#243062] pr-4">{faq.question}</span>
                                            <span className={`text-primary transition-transform ${openFaqs[index] ? 'rotate-180' : ''}`}>
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                        {openFaqs[index] && (
                                            <div className="px-6 py-4 border-t border-neutral-200">
                                                {faq.answer && (
                                                    <div className="text-base text-neutral-700 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: faq.answer }} />
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
                                Ready to take next step?
                            </h2>
                          
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold"
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Modal */}
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pageSource="Loan Against Securities" />
        </div>
    );
};

export default LoanAgainstSecurities;

