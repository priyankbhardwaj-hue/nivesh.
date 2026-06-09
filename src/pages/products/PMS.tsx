import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import PMSImage from '../../assets/PMS.png';
import { fetchFAQs, type FAQ } from '../../services/api';
import usePageStatistics from '../../hooks/usePageStatistics';
// Partner logos from public/partner-logos/ (filename per partner – add missing SVGs there to show all)
const PARTNER_LOGO_FILES: Record<string, string> = {
    'SBI Asset Management': 'sbi.jpeg',
    'Kotak Asset Management': 'kotak.jpeg',
    'Abakkus': 'Abakkus.jpeg',
    'Aditya Birla Capital': 'AditiyaBirla.jpeg',
    'Buoyant Capital PMS': 'Buoyant.jpeg',
    'Carenlian': 'Carenlian.jpeg',
    'Nippon India Portfolio Management': 'NipponIndia.jpeg',
    'Tata Asset Management Company': 'Tata.png',
    'Motilal Oswal Group': 'MotilalOswal.svg',
    'ICICI Prudential Portfolio Management': 'ICICIPrudential.svg',
    'ASK Group': 'ASK.svg',
};

const PMS: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
    const [activeTab, setActiveTab] = useState<'why' | 'who' | 'taxability'>('why');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calculatorData, setCalculatorData] = useState({
        investmentAmount: 5000000, // 50 Lakhs default
        rateOfInterest: 12,
        timeInYears: 5,
    });
    const [futureValue, setFutureValue] = useState(0);
    const fallbackStats = [
        { number: '9,137', description: 'Partners in 772 cities across India' },
        { number: '58,505', description: 'Customers spread over 3,000 pincodes' },
        { number: '48,54,653', description: 'Transactions Executed' },
        { number: 'Rs. 6,478', description: 'Crore- Transaction Value' },
    ];
    const { stats: displayStats, loading: statsLoading, error: statsError } = usePageStatistics('pms', fallbackStats);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        calculateFutureValue();
    }, [calculatorData]);

    // Fetch FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFaqs(true);
                const allFaqs = await fetchFAQs();
                // Filter FAQs by category "pms"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'pms' || category.includes('pms');
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

    const calculateFutureValue = () => {
        const { investmentAmount, rateOfInterest, timeInYears } = calculatorData;
        const r = rateOfInterest / 100;
        const future = investmentAmount * Math.pow(1 + r, timeInYears);
        setFutureValue(Math.round(future));
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const features = [
        {
            title: 'Asset Allocation',
            description: 'Dividing your investment among different asset classes is defined as asset allocation. This mix needs to be done in such a way that the investors can safeguard their funds from risk and generate superior returns on them.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
        {
            title: 'Customization',
            description: 'Portfolio Management Services provides a customized investment solution to investors. Portfolio managers have the liberty to diversify an investor\'s portfolio depending upon his risk appetite and returns generated on his existing investments.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
        },
        {
            title: 'Portfolio Performance Tracking',
            description: 'Tracking the performance of a portfolio is one of the benefits of a PMS service. You can track your holdings in real-time and the investor is updated with the market situation as well.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
        {
            title: 'Risk Management',
            description: 'Investments come with a certain degree of risk. With the best PMS services, you can control the amount of risk you would want to take. With real-time tracking, under the Non-discretionary PMS , you can decide if the invested instrument needs to be held or redeemed before maturity',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            title: 'Maintaining Liquidity',
            description: 'Investments are made to fulfill financial goals. The best PMS services provider in India helps in maintaining liquidity so that you can redeem your investment in time of need.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: 'Knowledge',
            description: 'The best Portfolio Management Services can help in reaching your financial goals. Apart from this it also helps investors in understanding their finances. By imparting continuous knowledge and investment strategies, it helps investors to understand how the funds work and helps in making informed choices.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
        },
    ];

    const partners = [
        { name: 'SBI Asset Management' },
        { name: 'Kotak Asset Management' },
        { name: 'Abakkus' },
        { name: 'Aditya Birla Capital' },
        { name: 'Buoyant Capital PMS' },
        { name: 'Carenlian' },
        { name: 'Nippon India Portfolio Management' },
        { name: 'Tata Asset Management Company' },
        { name: 'Motilal Oswal Group' },
        { name: 'ICICI Prudential Portfolio Management' },
        { name: 'ASK Group' },
    ];

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
                            <span className="text-neutral-500">Portfolio Management Services</span>
                        </nav>

                        <div className="grid lg:grid-cols-[40%_60%] gap-6 md:gap-6 items-start">
                            <div className="lg:pr-6">
                                <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] mb-4 leading-tight">
                                    Portfolio Management Services (PMS)
                                </h2>
                                <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-4 md:mb-4 leading-tight">
                                    Portfolio Management Services (PMS)
                                </h1>
                                <p className="text-base md:text-lg text-neutral-700 mb-6 md:mb-8 leading-relaxed">
                                    Professional portfolio management services tailored to your financial goals and risk appetite. Let expert fund managers handle your investments while you focus on what matters most.
                                </p>
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
                                    src={PMSImage}
                                    alt="Portfolio Management Services"
                                    className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Aspects of Portfolio Management Services Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Aspects of Portfolio Management Services (PMS)
                        </h2>
                        
                        {/* Tab Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <button
                                onClick={() => setActiveTab('why')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'why'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Why
                            </button>
                            <button
                                onClick={() => setActiveTab('who')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'who'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Who
                            </button>
                            <button
                                onClick={() => setActiveTab('taxability')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'taxability'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Taxability on PMS Investment
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                            {activeTab === 'why' && (
                                <div className="space-y-4">
                                    <ul className="list-disc list-inside space-y-3 text-base text-neutral-700 leading-relaxed">
                                        <li>Professionally managed portfolios.</li>
                                        <li>Customised portfolio as per the financial needs to the investor.</li>
                                        <li>Risk is also managed since the fund managers have a wealth of knowledge.</li>
                                        <li>Possibility of superior returns.</li>
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'who' && (
                                <div className="space-y-6">
                                    <div>
                                        
                                        <ul className="list-disc list-inside mt-4 space-y-2 text-base text-neutral-700">
                                            <li>High net worth individuals.</li>
                                            <li>Individuals who have a high risk appetite.</li>
                                            <li>Investors looking for superior returns.</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'taxability' && (
                                <div className="space-y-6">
                                    <div>
                                       
                                        <ul className="list-disc list-inside space-y-2 text-base text-neutral-700">
                                            <li>Profits earned on Portfolio Management Services attract capital gain tax.</li>
                                            <li>Profits earned on the investments held for one year or less attract short-term capital gains. It is taxed at 20% plus cess.</li>
                                            <li>Long-term capital gain is paid for any profit earned after 1 year and the investor is liable to pay 12.5%, nill upto 1.25 Lakh capital gain.</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* How does Portfolio Management Service Work Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            How does Portfolio Management Service Work?
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 border border-neutral-200">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        1
                                    </div>
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            <strong className="text-[#243062]">Step 1:</strong> The investor chooses which scheme they want to opt for; discretionary or non-discretionary PMS.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-6 border border-neutral-200">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        2
                                    </div>
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            <strong className="text-[#243062]">Step 2:</strong> The investor invests the minimum amount which is INR 50 Lakhs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-6 border border-neutral-200">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        3
                                    </div>
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            <strong className="text-[#243062]">Step 3:</strong> If the investor opts for discretionary PMS they will receive continuous updates on the performance of their portfolio.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-6 border border-neutral-200">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        4
                                    </div>
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            <strong className="text-[#243062]">Step 4:</strong> Evaluation and adjustments are done based on the requirements of the investor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features and Benefits Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Features and Benefits of Portfolio Management Services
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-[#243062] mb-3">{feature.title}</h3>
                                            <p className="text-base text-neutral-700 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Types of Portfolio Management Services Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Types of Portfolio Management Services
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed text-center">
                            There are two types of Portfolio Management Services provided by the pms companies in india
                        </p>
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-8 border border-neutral-200">
                                <h3 className="text-2xl font-bold text-[#243062] mb-4">Discretionary Portfolio Management Service:</h3>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    In discretionary PMS service, it is the portfolio manager that independently and individually manages the funds and securities. Investors do not have to make any financial decisions. They inform the portfolio manager of their needs and the manager works following them.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-8 border border-neutral-200">
                                <h3 className="text-2xl font-bold text-[#243062] mb-4">Non-Discretionary Portfolio Management Service:</h3>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    When the portfolio manager manages the funds in harmony with the directions of the client it is termed as a Non-Discretionary Portfolio Management Service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Partners Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Our Partners
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {partners.map((partner, index) => (
                                <div key={index} className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all">
                                    <div className="bg-[#243062] px-1.5 py-2 flex items-center justify-between rounded-t-lg -m-6 mb-4">
                                        <div className="flex items-center min-h-[2.5rem]">
                                            <img
                                                src={`/partner-logos/${encodeURIComponent(PARTNER_LOGO_FILES[partner.name] ?? '')}`}
                                                alt={partner.name}
                                                className="h-18 max-w-[200px] object-contain object-left"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    const next = e.currentTarget.nextElementSibling as HTMLElement;
                                                    if (next) next.classList.remove('hidden');
                                                }}
                                            />
                                            <span className="text-lg font-semibold text-white hidden">
                                                {partner.name}
                                            </span>
                                        </div>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => setIsModalOpen(true)}
                                            className="bg-white hover:bg-neutral-100 text-[#243062] ml-1.5 px-3 py-2 rounded font-semibold max-w-fit shrink-0 text-nowrap"
                                        >
                                            Know More About {partner.name.split(' ')[0]} {partner.name.split(' ')[1] || ''}
                                        </Button>
                                    </div>
                                </div>
                            ))}
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
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Use Our PMS Calculator to Figure Out the Future Value
                        </h2>
                        <div className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Investment Amount
                                    </label>
                                    <input
                                        type="range"
                                        min="5000000"
                                        max="100000000"
                                        step="100000"
                                        value={calculatorData.investmentAmount}
                                        onChange={(e) =>
                                            setCalculatorData({
                                                ...calculatorData,
                                                investmentAmount: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full"
                                    />
                                    <div className="text-right text-sm text-neutral-600 mt-1">
                                        ₹ {formatCurrency(calculatorData.investmentAmount)}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Rate of Interest Annual (in %)
                                    </label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="20"
                                        step="0.5"
                                        value={calculatorData.rateOfInterest}
                                        onChange={(e) =>
                                            setCalculatorData({
                                                ...calculatorData,
                                                rateOfInterest: parseFloat(e.target.value),
                                            })
                                        }
                                        className="w-full"
                                    />
                                    <div className="text-right text-sm text-neutral-600 mt-1">
                                        {calculatorData.rateOfInterest}%
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Time in Years
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        step="1"
                                        value={calculatorData.timeInYears}
                                        onChange={(e) =>
                                            setCalculatorData({
                                                ...calculatorData,
                                                timeInYears: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full"
                                    />
                                    <div className="text-right text-sm text-neutral-600 mt-1">
                                        {calculatorData.timeInYears} Years
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-6 border border-neutral-200">
                                    <div className="text-sm text-neutral-600 mb-2">Details:</div>
                                    <div className="text-2xl font-bold text-[#243062]">
                                        Future Value: ₹ {formatCurrency(futureValue)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
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
                                    <div key={faq.id} className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
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
                                Ready to Explore PMS?
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                                Connect with our experts to learn how Portfolio Management Services can help you achieve your investment goals with customized, professional management.
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
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pageSource="PMS" />
        </div>
    );
};

export default PMS;

