import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import BondsImage from '../../assets/Bonds.png';
import BondImg1 from '../../assets/Bond_Img1.png';
import BondImg2 from '../../assets/Bond_Img2.png';
import BondImg3 from '../../assets/Bond_Img3.png';
import BondImg4 from '../../assets/Bond_Img3.png';
import { fetchFAQs, type FAQ } from '../../services/api';
import usePageStatistics from '../../hooks/usePageStatistics';

const Bond: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
    const [activeTab, setActiveTab] = useState<'advantages' | 'suitability' | 'taxation' | 'safety'>('advantages');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calculatorData, setCalculatorData] = useState({
        faceValue: 100000,
        couponRate: 8,
        yearsToMaturity: 5,
        currentPrice: 95000,
    });
    const [interestPayment, setInterestPayment] = useState(0);
    const [ytm, setYtm] = useState(0);
    const [currentYield, setCurrentYield] = useState(0);
    const fallbackStats = [
        { number: '9,134', description: 'Partners in 772 cities across India' },
        { number: '58,505', description: 'Customers spread over 3,000 pincodes' },
        { number: '48,54,650', description: 'Transactions Executed' },
        { number: 'Rs. 6,478', description: 'Crore- Transaction Value' },
    ];
    const { stats: displayStats, loading: statsLoading, error: statsError } = usePageStatistics(
        'bond',
        fallbackStats
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        calculateBondMetrics();
    }, [calculatorData]);

    // Fetch FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFaqs(true);
                const allFaqs = await fetchFAQs();
                // Filter FAQs by category "bond"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'bond' || category.includes('bond');
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

    const calculateBondMetrics = () => {
        const { faceValue, couponRate, yearsToMaturity, currentPrice } = calculatorData;
        
        // Interest Payment (Annual)
        const annualInterest = (faceValue * couponRate) / 100;
        setInterestPayment(Math.round(annualInterest));
        
        // Current Yield
        const yieldValue = (annualInterest / currentPrice) * 100;
        setCurrentYield(parseFloat(yieldValue.toFixed(2)));
        
        // YTM (Yield to Maturity) - Simplified calculation
        const totalInterest = annualInterest * yearsToMaturity;
        const capitalGain = faceValue - currentPrice;
        const totalReturn = totalInterest + capitalGain;
        const avgReturn = totalReturn / yearsToMaturity;
        const ytmValue = (avgReturn / currentPrice) * 100;
        setYtm(parseFloat(ytmValue.toFixed(2)));
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const features = [
        {
            title: 'Prevailing interest rates',
            description: 'Bond prices generally move in the opposite direction of prevailing interest rates. If interest rates are falling, Bond prices are generally rising. In a rising interest rate environment, Bond prices will generally fall. If you are looking to benefit from a trade, buy when the yield is high with the expectation to sell when it is low.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
        },
        {
            title: 'Age of the Bond',
            description: 'The longer the maturity, the larger the swing in price in relation to interest rate movements. In a period of rising rates and declining prices, the long-term Bond funds will decline in value more than intermediate-term and short-term Bonds.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: 'Credit quality',
            description: 'Credit Rating is an important factor that affects the Bond prices and yields just like an individual wanting to get a loan, Bond issuers must generally pay higher interest rates if their credit rating is poor. Therefore Bond investors must ensure the credit quality of the issuer.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
    ];

    const bondTypes = [
        { name: 'Corporate Bond', image: BondImg1 },
        { name: 'Non-Convertible Debentures', image: BondImg2 },
        { name: 'RBI Floating Rate Saving Bonds', image: BondImg3 },
        { name: 'Sovereign Gold Bond', image: BondImg4 },
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
                            <span className="text-neutral-500">Bond</span>
                        </nav>

                        <div className="grid lg:grid-cols-[40%_60%] gap-6 md:gap-6 items-start">
                            <div className="lg:pr-6">
                                <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] mb-4 leading-tight">
                                    Best Bonds/ NCD to Invest in India with Nivesh
                                </h2>
                                <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-4 md:mb-4 leading-tight">
                                    Best Bonds/ NCD to Invest in India with Nivesh
                                </h1>
                                <p className="text-base md:text-lg text-neutral-700 mb-6 md:mb-8 leading-relaxed">
                                    To strengthen your portfolio's risk-return profile, Bonds/NCD can create a more balanced portfolio by adding diversification and calming volatility. If you are looking to invest in Bonds/NCD go with Nivesh.
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
                                    src={BondsImage}
                                    alt="Bonds - Fixed Income Investments"
                                    className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Features
                        </h2>
                        <div className="space-y-6">
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

            {/* How it works Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            How it works?
                        </h2>
                        <div className="bg-white rounded-lg p-8 border border-neutral-200 space-y-6">
                            <div>
                                <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                    There are two methods of buying a Bond.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-primary/10 rounded-lg p-4">
                                        <h4 className="font-semibold text-[#243062] mb-2">Primary (Directly from Issuer)</h4>
                                    </div>
                                    <div className="bg-primary/10 rounded-lg p-4">
                                        <h4 className="font-semibold text-[#243062] mb-2">Secondary (From the Secondary Market on Exchange)</h4>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                    Buyers need to be aware of two primary aspects, market price and yield. Market price is what is quoted on an exchange for buying or selling, and the yield shows what you earn every year by holding the Bond. The latter is calculated by dividing the annual coupon or interest rate by the market price. Stocks are bought with the expectation that price rise will lead to profits. In Bonds, however, the buy price is not always lower than the face value of the Bond that you get back at maturity. What really matters is the yield.
                                </p>
                                <p className="text-base text-neutral-700 leading-relaxed">
                                    Bond prices rise when yields fall, and vice versa. For example, a Bond issued at Rs. 100 with a 10% coupon and maturity of 2 years is sold at the end of year 1 at Rs. 101. This is a yield of 9.9% and makes for 11% return (Rs. 1 on the price + Rs. 10 coupon). At the end of the next year, the buyer gets back Rs. 100 principal and Rs. 10 as coupon, but that is not a return of 10%, rather it is 9.9%, because you paid Rs. 101 to acquire the Bond. If you had bought when the yield was low, chances are you won't be able to profit much as a rising yield means lower prices. If the trend is for yields to move lower, then the opposite is likely to occur.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Bonds to Buy Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Best Bonds to Buy in India
                        </h2>
                        <div className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                            <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                Investors can buy Bonds in India, various types of Bonds exist. For example: Tax Free Bonds - where the interest earned is tax free in the hands of investors, Capital Gain Bonds or 54EC Bonds which are the Fixed Income instruments that provide capital gains tax exemption under section 54EC to the investors, Corporate Bonds, GOI Bonds, etc.
                            </p>
                            <p className="text-base text-neutral-700 leading-relaxed">
                                Also NCDs are of two types - Secured NCDs that are backed by the issuer company's assets and Unsecured NCDs which are issued based on the creditworthiness of the issuer (not backed by the asset).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Invest in Bonds Section with Tabs */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Invest in Bonds
                        </h2>
                        
                        {/* Tab Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <button
                                onClick={() => setActiveTab('advantages')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'advantages'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Advantages
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
                            <button
                                onClick={() => setActiveTab('safety')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'safety'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Is it safe to invest in Bonds
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white rounded-lg p-8 border border-neutral-200">
                            {activeTab === 'advantages' && (
                                <div className="space-y-6">
                                    <div>
                                        <h5 className="text-xl font-semibold text-[#243062] mb-3">Fixed Returns on Investment:</h5>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                            Bonds are a fixed investment that pays out regular interest at regular times. Furthermore, when a Bond matures, you receive the principal amount deposited before.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-semibold text-[#243062] mb-3">Less Volatile:</h5>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                            Although the value of a Bond might change depending on current interest rates or inflation rates, they are typically more stable than stocks. They are also less risky as compared to stocks.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-semibold text-[#243062] mb-3">Clear Ratings:</h5>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            Bonds, unlike Equities, are assessed by credit rating organisations globally. This reassures investors that now is the best moment to invest in Bonds. Credit Rating agencies provide good insights regarding particular Bonds.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'suitability' && (
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                        They can be good investments for those who are in or close to retirement as well as younger investors who seek a stable return. They are a safe and conservative investment which provide a predictable stream of income.
                                        </p>
                                        
                                    </div>
                                </div>
                            )}

                            {activeTab === 'taxation' && (
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                        Interest Income is added to an individual's income and taxed accordingly. While Capital gain on Bond will be taxed at 20% along with indexation benefit after 1 year and as per income slab if sold within 1 year.

</p>
                                        
                                    </div>
                                </div>
                            )}

                            {activeTab === 'safety' && (
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                        Bond investment in India are considered safe relative to equity investments but there are factors that should be checked in to understand the safety.                                        </p>
                                        
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

            {/* Bond Types Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Types of Bonds
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bondTypes.map((bond, index) => (
                                <div key={index} className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                                    <div className="bg-[#243062] rounded-t-lg -m-6 mb-4 flex flex-col">
                                        <div className="flex justify-center pt-3 pb-2 px-2">
                                            <img
                                                src={bond.image}
                                                alt={bond.name}
                                                className="w-24 h-24 sm:w-28 sm:h-28 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between px-6 pb-4">
                                            <h4 className="text-lg font-semibold text-white">{bond.name}</h4>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => setIsModalOpen(true)}
                                                className="bg-white hover:bg-neutral-100 text-[#243062] px-4 py-2 rounded font-semibold shrink-0"
                                            >
                                                Invest Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Use Our Bond Calculator to Figure Out the Interest Payment, YTM and Current Yield.
                        </h2>
                        <div className="bg-white rounded-lg p-8 border border-neutral-200">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Face value in ₹
                                    </label>
                                    <input
                                        type="range"
                                        min="10000"
                                        max="1000000"
                                        step="10000"
                                        value={calculatorData.faceValue}
                                        onChange={(e) =>
                                            setCalculatorData({
                                                ...calculatorData,
                                                faceValue: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full"
                                    />
                                    <div className="text-right text-sm text-neutral-600 mt-1">
                                        ₹ {formatCurrency(calculatorData.faceValue)}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Coupon Rate in %
                                    </label>
                                    <input
                                        type="range"
                                        min="3"
                                        max="15"
                                        step="0.5"
                                        value={calculatorData.couponRate}
                                        onChange={(e) =>
                                            setCalculatorData({
                                                ...calculatorData,
                                                couponRate: parseFloat(e.target.value),
                                            })
                                        }
                                        className="w-full"
                                    />
                                    <div className="text-right text-sm text-neutral-600 mt-1">
                                        {calculatorData.couponRate}%
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Years to Maturity
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        step="1"
                                        value={calculatorData.yearsToMaturity}
                                        onChange={(e) =>
                                            setCalculatorData({
                                                ...calculatorData,
                                                yearsToMaturity: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full"
                                    />
                                    <div className="text-right text-sm text-neutral-600 mt-1">
                                        {calculatorData.yearsToMaturity} Years
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Current Bond Price
                                    </label>
                                    <input
                                        type="range"
                                        min="50000"
                                        max="150000"
                                        step="1000"
                                        value={calculatorData.currentPrice}
                                        onChange={(e) =>
                                            setCalculatorData({
                                                ...calculatorData,
                                                currentPrice: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full"
                                    />
                                    <div className="text-right text-sm text-neutral-600 mt-1">
                                        ₹ {formatCurrency(calculatorData.currentPrice)}
                                    </div>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <div className="text-sm text-neutral-600 mb-2">Details:</div>
                                    <div className="space-y-2">
                                        <div className="text-lg font-semibold text-[#243062]">
                                            Interest Payment: ₹ {formatCurrency(interestPayment)}
                                        </div>
                                        <div className="text-lg font-semibold text-[#243062]">
                                            YTM: {ytm}%
                                        </div>
                                        <div className="text-lg font-semibold text-[#243062]">
                                            Current Yield: {currentYield}%
                                        </div>
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
                                Ready to Explore Bond Investments?
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                                Connect with our investment experts to learn more about bonds and fixed-income options for your portfolio. Get access to competitive rates and secure returns.
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
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pageSource="Bond" />
        </div>
    );
};

export default Bond;

