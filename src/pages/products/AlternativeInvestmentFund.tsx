import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import Testimonials from '../../components/home/Testimonials';
import AIFImage from '../../assets/AIF.png';
import { fetchFAQs, type FAQ } from '../../services/api';
import usePageStatistics from '../../hooks/usePageStatistics';

const AlternativeInvestmentFund: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
    const [activeTab, setActiveTab] = useState<'how-it-works' | 'who-should-invest' | 'taxability'>('how-it-works');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calculatorData, setCalculatorData] = useState({
        investmentAmount: 10000000, // 1 Crore default
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
        'alternative-investment-fund',
        fallbackStats
    );

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
                // Filter FAQs by category "alternative-investment-fund"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'alternative-investment-fund' || 
                           category === 'alternative investment fund' ||
                           category.includes('alternative-investment-fund');
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

    const aifPlans = [
        {
            name: 'DualAdvantage_Feb25_10F15V_V2',
            returns: { '1 Year': 0, '2 Year': 0, '3 Year': 0, '5 Year': 0 },
        },
        {
            name: 'Motilal Oswal MultiFactor AIF',
            returns: { '1 Year': 0, '2 Year': 0, '3 Year': 0, '5 Year': 0 },
        },
        {
            name: 'Motilal Oswal NTDOP AIF',
            returns: { '1 Year': 0, '2 Year': 0, '3 Year': 0, '5 Year': 0 },
        },
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
                            <span className="text-neutral-500">Alternative Investment Fund</span>
                        </nav>

                        <div className="grid lg:grid-cols-[40%_60%] gap-6 md:gap-6 items-start">
                            <div className="lg:pr-6">
                                <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] mb-4 leading-tight">
                                    Invest in Alternative Investment Funds with Nivesh
                                </h2>
                                <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-4 md:mb-4 leading-tight">
                                    Invest in Alternative Investment Funds with Nivesh
                                </h1>
                                <p className="text-base md:text-lg text-neutral-700 mb-6 md:mb-8 leading-relaxed">
                                    Alternative Investment Funds are defined as privately pooled investment funds. They are categorized by SEBI as Category I AIF, Category II AIF, and Category III AIF. Assets under management can include start-ups, SME funds, infrastructure funds, private equity funds, or even hedge funds that may be trading in listed or unlisted derivatives depending on the type of fund.
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
                                    src={AIFImage}
                                    alt="Alternative Investment Funds"
                                    className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Best AIF Plans Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Best AIF Plans with Nivesh
                        </h2>
                        <div className="space-y-4">
                            {aifPlans.map((plan, index) => (
                                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                                    {/* Plan Header - Dark Blue Bar */}
                                    <div className="bg-[#243062] px-6 py-4 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => setIsModalOpen(true)}
                                            className="bg-white hover:bg-neutral-100 text-[#243062] px-4 py-2 rounded font-semibold"
                                        >
                                            Invest Now
                                        </Button>
                                    </div>
                                    
                                    {/* Performance Years Row - Light Gray */}
                                    <div className="bg-neutral-200 px-6 py-3">
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="font-semibold text-[#243062] text-sm">1 Year</div>
                                            <div className="font-semibold text-[#243062] text-sm">2 Year</div>
                                            <div className="font-semibold text-[#243062] text-sm">3 Year</div>
                                            <div className="font-semibold text-[#243062] text-sm">5 Year</div>
                                        </div>
                                    </div>
                                    
                                    {/* Performance Values Row - Light Blue */}
                                    <div className="bg-primary/20 px-6 py-3">
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="font-semibold text-[#243062] text-sm">{plan.returns['1 Year']}%</div>
                                            <div className="font-semibold text-[#243062] text-sm">{plan.returns['2 Year']}%</div>
                                            <div className="font-semibold text-[#243062] text-sm">{plan.returns['3 Year']}%</div>
                                            <div className="font-semibold text-[#243062] text-sm">{plan.returns['5 Year']}%</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features and Benefits Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                            Features and Benefits of Alternative Investment Funds
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                            As the name suggests Alternative Investment Funds in India are non-traditional investments. This means the assets under such funds are not correlated to the stock market. These funds are primarily for high-net-worth investors looking for diversification and better potential returns while absorbing the accompanying risk.
                        </p>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed font-semibold">
                            Some of the benefits and features of Alternative Investment Funds are:
                        </p>
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 border border-neutral-200">
                                <h3 className="text-xl font-semibold text-[#243062] mb-3">Diversification</h3>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    Diversification is one of the key features of these funds. They have considerable freedom to decide where to invest unlike most funds which are regulated by SEBI.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 border border-neutral-200">
                                <h3 className="text-xl font-semibold text-[#243062] mb-3">Non-traditional Investment Options</h3>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    Non-traditional investment options are available to these funds which are not generally open to all investors.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 border border-neutral-200">
                                <h3 className="text-xl font-semibold text-[#243062] mb-3">Potential Returns</h3>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    Potential returns are a factor considering the type of non-traditional assets these funds invest in.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 border border-neutral-200">
                                <h3 className="text-xl font-semibold text-[#243062] mb-3">Minimum Investment Amount</h3>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    The minimum investment amount is INR 1 Crore depending on the type of AIF.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Types of Alternative Investment Funds Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Types of Alternative Investment Funds
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed text-center">
                            Alternative Investment Funds in India are categorized into 3 types are per SEBI rules
                        </p>

                        {/* Category I */}
                        <div className="mb-12">
                            <div className="bg-primary/10 rounded-lg p-6 mb-6">
                                <h3 className="text-2xl font-bold text-[#243062] mb-4">Category I</h3>
                                <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                    Category I are funds with strategies to invest in start-up or early stage ventures or social ventures or SMEs or infrastructure or other sectors or areas which the government or regulators consider as socially or economically desirable. These invest in Startups, SME's, Social ventures, Infrastructure funds, Angel funds, or Venture Capital Funds
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                        <h4 className="font-semibold text-[#243062] mb-2">Venture Capital Fund</h4>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                        <h4 className="font-semibold text-[#243062] mb-2">SME Funds</h4>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                        <h4 className="font-semibold text-[#243062] mb-2">Social Venture Funds</h4>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                        <h4 className="font-semibold text-[#243062] mb-2">Infrastructure Funds</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Category II */}
                        <div className="mb-12">
                            <div className="bg-primary/10 rounded-lg p-6 mb-6">
                                <h3 className="text-2xl font-bold text-[#243062] mb-4">Category II</h3>
                                <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                    Category II are funds which cannot be categorized as Category I AIFs or Category III AIFs. These funds do not undertake leverage or borrowing other than to meet day-to-day operational requirements and as permitted in the Regulations. Private Equity debt funds that invest in real estate funds, funds for distressed assets, funds of funds, etc.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                        <h4 className="font-semibold text-[#243062] mb-2">Real Estate Funds</h4>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                        <h4 className="font-semibold text-[#243062] mb-2">Private Equity Funds</h4>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                        <h4 className="font-semibold text-[#243062] mb-2">Funds for Distressed Assets</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Category III */}
                        <div className="mb-12">
                            <div className="bg-primary/10 rounded-lg p-6 mb-6">
                                <h3 className="text-2xl font-bold text-[#243062] mb-4">Category III</h3>
                                <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                    Category III are type of fund that invests in Hedge funds or funds which trade with the purpose of making short-term returns and can employ complex and diverse trading strategies, like using arbitrage, derivatives trading, and open-ended funds.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                        <h4 className="font-semibold text-[#243062] mb-2">Hedge Funds</h4>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                        <h4 className="font-semibold text-[#243062] mb-2">Private Investments in Public Equity</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Aspects of Alternative Investment Funds Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Aspects of Alternative Investment Funds
                        </h2>
                        
                        {/* Tab Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <button
                                onClick={() => setActiveTab('how-it-works')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'how-it-works'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                How it works
                            </button>
                            <button
                                onClick={() => setActiveTab('who-should-invest')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'who-should-invest'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Who should invest
                            </button>
                            <button
                                onClick={() => setActiveTab('taxability')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'taxability'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Taxability on Alternative Investment Funds
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                            {activeTab === 'how-it-works' && (
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            Alternative Investment Funds raise money to form an investment fund pool that invests in non-traditional assets classes. These are asset classes that investors may not have direct access through regular methods like Mutual Funds or Debt. Money can be raised from any investor of Indian, foreign, or non-resident origin for such funds.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'who-should-invest' && (
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                            These types of funds are primarily aimed at High-Net-worth individuals who are already accustomed and well versed with the investing world. While the potential for returns these funds offer is high, so are the risks.
                                        </p>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                            So, Indian residents, Non-Residents (NRI's), and Foreign Nationals can invest in Alternative Investment Funds.
                                        </p>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4 font-semibold">
                                            Investors who are willing to meet the below criteria should invest in Alternative Investment Funds:
                                        </p>
                                        <ul className="list-disc list-inside mt-4 space-y-2 text-base text-neutral-700">
                                            <li>Have a large amount to invest in one instrument</li>
                                            <li>Ability to withstand the risk</li>
                                            <li>Are acceptable with lock-in periods</li>
                                            <li>Are acceptable with lower regulatory control/ interventions</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'taxability' && (
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                            Alternative Investment Funds are taxed according to their category.
                                        </p>
                                        <div className="mb-6">
                                            <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                                Category 1 and 2 AIFs are accorded pass-through status. This means that the income on the fund is not taxed, only the income or profit booked by the investor is taxed. The tax is as per the income slab of the investor. Capital gains the fund makes on the stocks are taxed depending on the holding period that is short term or long term.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-base text-neutral-700 leading-relaxed">
                                                Category 3 AIFs are not granted pass-through status. The income generated by such funds is taxed as high as 42.7% depending on various factors of the gains received. Factors can include, dividend, nature of gain, short term or long term, business income among others.
                                            </p>
                                        </div>
                                    </div>
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
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Use Our Alternative Investment Calculator to Figure Out the Future Value
                        </h2>
                        <div className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Investment Amount
                                    </label>
                                    <input
                                        type="range"
                                        min="1000000"
                                        max="100000000"
                                        step="1000000"
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
                                        max="10"
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

            {/* Testimonials Section */}
            <Testimonials variant="default" />

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
                                Ready to Explore AIF Opportunities?
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                                Connect with our investment experts to learn more about Alternative Investment Funds and how they can fit into your portfolio for sophisticated, diversified strategies.
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
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pageSource="Alternative Investment Fund" />
        </div>
    );
};

export default AlternativeInvestmentFund;

