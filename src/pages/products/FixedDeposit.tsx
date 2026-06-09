import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import Testimonials from '../../components/home/Testimonials';
import Hero2 from '../../assets/FD.jpeg';
import CrisilLogo from '../../assets/Crisil.svg';
import OurPartners from '../../components/about/OurPartners';
import { fetchFAQs, type FAQ } from '../../services/api';
import usePageStatistics from '../../hooks/usePageStatistics';

const FixedDeposit: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
    const [activeTab, setActiveTab] = useState<'features' | 'suitability' | 'taxation'>('features');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calculatorData, setCalculatorData] = useState({
        investmentAmount: 100000,
        rateOfInterest: 7,
        timeInYears: 5,
        compoundingPeriod: 1,
    });
    const [maturityValue, setMaturityValue] = useState(0);
    const fallbackStats = [
        { number: '9,134', description: 'Partners in 772 cities across India' },
        { number: '58,505', description: 'Customers spread over 3,000 pincodes' },
        { number: '48,54,650', description: 'Transactions Executed' },
        { number: 'Rs. 6,478', description: 'Crore- Transaction Value' },
    ];
    const { stats: displayStats, loading: statsLoading, error: statsError } = usePageStatistics(
        'fixed-deposit',
        fallbackStats
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        calculateMaturity();
    }, [calculatorData]);

    // Fetch FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFaqs(true);
                const allFaqs = await fetchFAQs();
                // Filter FAQs by category "fixed-deposit"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'fixed-deposit' || 
                           category === 'fixed deposit' ||
                           category.includes('fixed-deposit');
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

    const calculateMaturity = () => {
        const { investmentAmount, rateOfInterest, timeInYears, compoundingPeriod } = calculatorData;
        const r = rateOfInterest / 100;
        const n = compoundingPeriod;
        const t = timeInYears;
        const maturity = investmentAmount * Math.pow(1 + (r / n), n * t);
        setMaturityValue(Math.round(maturity));
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
        }).format(amount);
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
                            <span className="text-neutral-500">Fixed Deposit</span>
                        </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left Column - Content */}
                        <div className='mt-6'>
                            <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] mb-4 leading-tight">
                                Invest in the Best Corporate Fixed Deposit Online with Nivesh
                            </h2>
                            <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-4 md:mb-4 leading-tight">
                                Invest in the Best Corporate Fixed Deposit Online with Nivesh
                            </h1>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8">
                                Corporate Fixed Deposits are a good alternative to Bank Fixed Deposits as they offer better returns. Corporate Fixed Deposits are just like Bank Fixed Deposits. These companies' Fixed Deposits are known as 'Corporate Fixed Deposits' or 'Company Fixed Deposits'. The investor gets the interest on the basis of the Corporate Fixed Deposits plan that they choose.
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
                                alt="Fixed Deposit"
                                className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Nivesh Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Why Nivesh
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 mb-4 flex items-center justify-center relative">
                                    {/* Unlocked padlock with radiating lines */}
                                    <svg className="w-16 h-16 text-[#243062]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                    {/* Radiating lines */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 border-2 border-[#243062] rounded-full opacity-20"></div>
                                        <div className="absolute w-24 h-24 border border-[#243062] rounded-full opacity-10"></div>
                                    </div>
                                </div>
                                <p className="text-base text-neutral-600 leading-relaxed">
                                    Provides easy access to an array of Fixed Deposit options
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                    {/* Money bag with Rupee symbol */}
                                    <svg className="w-16 h-16 text-[#243062]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        <path d="M8 10h8M8 14h8" strokeWidth={1.5} />
                                    </svg>
                                </div>
                                <p className="text-base text-neutral-600 leading-relaxed">
                                    Perfect opportunity to earn higher returns
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                    <img src={CrisilLogo} alt="CRISIL" className="w-16 h-16 object-contain" />
                                </div>
                                <p className="text-base text-neutral-600 leading-relaxed">
                                    FAAA rating from CRISIL
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center md:col-start-1">
                                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                    {/* Hand holding Rupee coin */}
                                    <svg className="w-16 h-16 text-[#243062]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        <path d="M9 12l2 2 4-4" strokeWidth={1.5} />
                                    </svg>
                                </div>
                                <p className="text-base text-neutral-600 leading-relaxed">
                                    High rate of interest
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                    {/* Dashboard/grid icon */}
                                    <svg className="w-16 h-16 text-[#243062]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                    </svg>
                                </div>
                                <p className="text-base text-neutral-600 leading-relaxed">
                                    Smart interface and dashboard that enables easy tracking of investments
                                </p>
                            </div>
                        </div>
                        {/* Invest Now Button */}
                        <div className="text-center mt-10">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#243062] hover:bg-[#1a2550] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                Invest Now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* How does Fixed Deposits Work Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            How does Fixed Deposits Work
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    step: 'Step 1:',
                                    description: 'As per the recognition of RBI Banks, NBFCs such as Bajaj Finance, Mahindra & Mahindra Finance , HDFC, PNB Housing Finance can issue Fixed Deposits for a fixed tenor at a fixed interest rate.',
                                },
                                {
                                    step: 'Step 2:',
                                    description: 'An investor can make a selection of Fixed Deposits taking into consideration various parameters such as interest rate, returns, maturity, ratings and much more.',
                                },
                                {
                                    step: 'Step 3:',
                                    description: 'Investors can choose to invest in multiple interest options namely cumulative interest or non-cumulative fixed deposit scheme.',
                                },
                                {
                                    step: 'Step 4:',
                                    description: 'The individuals with an income below the tax slab rate can submit a 15G or 15H form with the bank or NBFC for requesting no-TDS deduction on the interest earned.',
                                },
                            ].map((item, index) => (
                                <div key={index} className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <h3 className="text-lg font-semibold text-[#243062] mb-3">{item.step}</h3>
                                    <p className="text-base text-neutral-700 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#243062] hover:bg-[#1a2550] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                Start Now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Partners Section */}
            <OurPartners />

            {/* Aspects of Fixed Deposits Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Aspects of Fixed Deposits
                        </h2>
                        
                        {/* Tab Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <button
                                onClick={() => setActiveTab('features')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'features'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Features
                            </button>
                            <button
                                onClick={() => setActiveTab('suitability')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'suitability'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Suitability
                            </button>
                            <button
                                onClick={() => setActiveTab('taxation')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'taxation'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Taxation
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                            {activeTab === 'features' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#243062] mb-3">High rate of interest:</h3>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            What makes a Corporate Fixed Deposits plan a profitable venture is the higher rate of interest. Corporate fixed schemes always have higher interest rates than bank FDs.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#243062] mb-3">Period of penalty:</h3>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            The penalty period in case of early withdrawal in Corporate Fixed Deposits is lower. According to the RBI rules if one withdraws a Corporate Fixed Deposits within a minimum tenure of three months then, the individual is liable to bear the penalty. The charges for penalty and tenure vary depending upon the Corporate Fixed Deposits schemes.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#243062] mb-3">Fixed rate of interest:</h3>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            Under the Corporate Fixed Deposits, an individual gets an interest amount based on the rate of interest decided. The inflation or situation of the market does not have any effect on the interest rates or interest payouts.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'suitability' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#243062] mb-3">Investors wanting to achieve short-term goals:</h3>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            An investor can utilize Corporate Fixed Deposits to meet short-term important goals like travelling, buying a new car, buying valuables for your spouse, and much more.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#243062] mb-3">Emergency purposes:</h3>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            For emergency purposes also Corporate Fixed Deposits are one of the most advantageous investment alternatives as the funds are not only invested in a relatively safe avenue but also earning till the time they need to be used.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#243062] mb-3">Senior Citizen Advantage:</h3>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            If you are a senior citizen then, you may also get an additional 0.25 to 0.40% on your Fixed Deposits depending on which Corporate FD plan and tenure is chosen.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'taxation' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#243062] mb-3">Taxable Income:</h3>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            The interest income from the Corporate Fixed Deposits is taxable as per the taxable slab rates; if the income from Fixed Deposits in a financial year is more than Rs. 5,000.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#243062] mb-3">TDS Deduction:</h3>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                        A TDS at the rate of 10% will be deducted on the interest earned from the Corporate Fixed Deposits. An additional 30% TDS is surcharged for NRI investors.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#243062] mb-3">TDS Waiver:</h3>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            One can claim a TDS waiver on interest earned on a Corporate Fixed Deposit by submitting 15G or 15H (in the case of senior citizens). The form is applicable only for Indian citizens with an income below the taxation limit.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-12 md:py-20 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            {statsLoading && (
                                <div className="text-white/80">Loading statistics...</div>
                            )}
                            {statsError && (
                                <div className="text-red-200">{statsError}</div>
                            )}
                            {displayStats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                                        {stat.number}
                                    </div>
                                    <p className="text-base md:text-lg text-white/90">{stat.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <Testimonials variant="default" />

            {/* Fixed Deposit Calculator Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Use Our Fixed Deposit Calculator to Figure Out the Maturity Amount on Fixed Deposits
                        </h2>
                        <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className="block text-base font-semibold text-[#243062] mb-3">
                                        Investment Amount
                                    </label>
                                    <input
                                        type="number"
                                        value={calculatorData.investmentAmount}
                                        onChange={(e) => setCalculatorData({ ...calculatorData, investmentAmount: Number(e.target.value) })}
                                        className="w-full px-4 py-3 border-2 border-primary/30 rounded-lg focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-semibold text-[#243062] mb-3">
                                        Rate of Interest Annual (in %)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={calculatorData.rateOfInterest}
                                        onChange={(e) => setCalculatorData({ ...calculatorData, rateOfInterest: Number(e.target.value) })}
                                        className="w-full px-4 py-3 border-2 border-primary/30 rounded-lg focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-semibold text-[#243062] mb-3">
                                        Time in Years
                                    </label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={calculatorData.timeInYears}
                                        onChange={(e) => setCalculatorData({ ...calculatorData, timeInYears: Number(e.target.value) })}
                                        className="w-full px-4 py-3 border-2 border-primary/30 rounded-lg focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-semibold text-[#243062] mb-3">
                                        Compounding Period in Years
                                    </label>
                                    <input
                                        type="number"
                                        value={calculatorData.compoundingPeriod}
                                        onChange={(e) => setCalculatorData({ ...calculatorData, compoundingPeriod: Number(e.target.value) })}
                                        className="w-full px-4 py-3 border-2 border-primary/30 rounded-lg focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-6 border-2 border-primary">
                                <p className="text-sm text-neutral-600 mb-2">Details:</p>
                                <p className="text-2xl font-bold text-[#243062]">
                                    Maturity Value: ₹{formatCurrency(maturityValue)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Frequently Asked Questions Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#243062] mb-10 md:mb-12 text-center leading-tight">
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

            {/* Call to Action Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 md:p-12 border-2 border-primary/20 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 leading-tight">
                                Ready to Invest in Fixed Deposits?
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                                Connect with our experts to find the best FD rates and tenors from leading banks and NBFCs. Start building a secure, fixed-income portfolio today.
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
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pageSource="Fixed Deposit" />
        </div>
    );
};

export default FixedDeposit;

