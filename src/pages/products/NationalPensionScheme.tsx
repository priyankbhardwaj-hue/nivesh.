import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import Testimonials from '../../components/home/Testimonials';
import NPSImage from '../../assets/NPS.png';
import { fetchFAQs, type FAQ } from '../../services/api';
import usePageStatistics from '../../hooks/usePageStatistics';
import { getHtmlContent, htmlContentClasses } from '../../utils/htmlRenderer';

const NationalPensionScheme: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
    const [activeTab, setActiveTab] = useState<'types-of-accounts' | 'investment-choices' | 'tax-benefits'>('types-of-accounts');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calculatorData, setCalculatorData] = useState({
        investmentAmount: 5000,
        rateOfInterest: 10,
        timeInYears: 30,
    });
    const [futureValue, setFutureValue] = useState(0);
    const fallbackStats = [
        { number: '9,134', description: 'Partners in 772 cities across India' },
        { number: '58,505', description: 'Customers spread over 3,000 pincodes' },
        { number: '48,54,650', description: 'Transactions Executed' },
        { number: 'Rs. 6,478', description: 'Crore- Transaction Value' },
    ];
    const { stats: displayStats, loading: statsLoading, error: statsError } = usePageStatistics(
        'national-pension-scheme',
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
                // Filter FAQs by category "national-pension-scheme"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'national-pension-scheme' || 
                           category === 'national pension scheme' ||
                           category.includes('national-pension-scheme');
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
        const months = timeInYears * 12;
        // Future value of annuity formula: FV = P * [((1 + r)^n - 1) / r]
        const future = investmentAmount * ((Math.pow(1 + r / 12, months) - 1) / (r / 12));
        setFutureValue(Math.round(future));
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const npsPlans = [
        { name: 'National Pension Scheme'},
        { name: 'SBI Pension Funds Private Limited' },
        { name: 'UTI Retirement Solutions Limited' },
        { name: 'LIC Pension Fund Limited' },
        { name: 'KOTAK MAHINDRA PENSION FUND LIMITED' },
        { name: 'ICICI PRUDENTIAL PENSION FUNDS MANAGEMENT COMPANY LIMITED' },
        { name: 'HDFC PENSION MANAGEMENT COMPANY LIMITED' },
        { name: 'ADITYA BIRLA SUN LIFE PENSION MANAGEMENT LIMITED' },
        { name: 'TATA PENSION FUND MANAGEMENT PRIVATE LIMITED' },
        { name: 'AXIS PENSION FUND MANAGEMENT LIMITED' },
    ];

    const benefits = [
        {
            title: 'Voluntary Scheme',
            description: 'It is an investment option available for citizens employed in the public as well.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: 'Low-Cost Scheme',
            description: 'Costs associated with the best NPS funds are very low.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: 'Simplicity',
            description: 'To subscribe to the best NPS funds, an applicant has to open an account at any of the PFRDA appointed Points of Presence (POP) and get a Permanent Retirement Account Number (PRAN).',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            title: 'Portability',
            description: 'Individuals can operate an NPS fund account from anywhere in the country and the contribution can be deposited in any of the POPs.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
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
                            <span className="text-neutral-500">National Pension Scheme</span>
                        </nav>

                        <div className="grid lg:grid-cols-[40%_60%] gap-6 md:gap-6 items-start">
                            <div className="lg:pr-6">
                                <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] mb-4 leading-tight">
                                    Best National Pension Scheme to Invest
                                </h2>
                                <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-4 md:mb-4 leading-tight">
                                    Best National Pension Scheme to Invest
                                </h1>
                                <p className="text-base md:text-lg text-neutral-700 mb-6 md:mb-8 leading-relaxed">
                                    The best NPS scheme is that they are voluntary long-term investments that can be subscribed by investors for retirement planning. Regular contributions can be deposited in the pension account by the subscriber. On retirement, you can withdraw a part of the corpus in lump sum. Also, the remaining corpus can generate allowance to secure a regular income, post-retirement.
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
                                    src={NPSImage}
                                    alt="National Pension Scheme"
                                    className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Best NPS Plans Section */}
            <section className="py-12 md:py-20 bg-primary/10">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Best NPS Plans
                        </h2>
                        <div className="space-y-4">
                            {npsPlans.map((plan, index) => (
                                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                                    {/* Plan Header - Dark Blue Bar */}
                                    <div className="bg-[#243062] px-6 py-4 flex items-center justify-between">
                                        <h4 className="text-lg font-semibold text-white">{plan.name}</h4>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => setIsModalOpen(true)}
                                            className="bg-white hover:bg-neutral-100 text-[#243062] px-4 py-2 rounded font-semibold"
                                        >
                                            Invest Now
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Benefits of Investing in National Pension Scheme
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                            {benefit.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-[#243062] mb-3">{benefit.title}</h3>
                                            <p className="text-base text-neutral-700 leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Investment Process Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Investment Process in NPS with Nivesh
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed text-center">
                            Any investor can enjoy the benefits of investing through Nivesh in the following easy steps:
                        </p>
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 border border-neutral-200">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        1
                                    </div>
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            <strong className="text-[#243062]">Step 1:</strong> Create an account in Nivesh by providing your basic details. (If you already have an account then just login into your account)
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
                                            <strong className="text-[#243062]">Step 2:</strong> On your portfolio page click on the Buy New tab at the right top corner of the screen.
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
                                            <strong className="text-[#243062]">Step 3:</strong> Select NPS and choose the scheme you want to purchase.
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
                                            <strong className="text-[#243062]">Step 4:</strong> Your request will be generated and a relationship manager will get in touch with you for getting the investment done
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Aspects of National Pension Scheme Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Aspects of National Pension Scheme
                        </h2>
                        
                        {/* Tab Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <button
                                onClick={() => setActiveTab('types-of-accounts')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'types-of-accounts'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Types of Accounts
                            </button>
                            <button
                                onClick={() => setActiveTab('investment-choices')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'investment-choices'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Investment Choices
                            </button>
                            <button
                                onClick={() => setActiveTab('tax-benefits')}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    activeTab === 'tax-benefits'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                            >
                                Tax Benefits
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                            {activeTab === 'types-of-accounts' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#243062] mb-3">Citizen Model:</h3>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                            The individual is the single holder of the NPS scheme. Decisions about the investment choice, annuity service provider, scheme provider are taken by the individual alone.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#243062] mb-3">Corporate Model:</h3>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                            The individual and the employer can both contribute to the individual's NPS scheme. The company will have to register for corporate NPS so that the employees can avail the benefit of the corporate model.
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                            There are two sub-accounts available while opening an NPS funds in India:
                                        </p>
                                        <div className="space-y-4">
                                            <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                                <h4 className="text-lg font-semibold text-[#243062] mb-3">Tier I Account:</h4>
                                                <ul className="list-disc list-inside space-y-2 text-base text-neutral-700">
                                                    <li>A pension and retirement account, withdrawals are subject to certain restrictions.</li>
                                                    <li>Minimum deposit of INR 500 is required to open the account.</li>
                                                    <li>Minimum contribution of INR 1,000 needs to be done per year.</li>
                                                    <li>Minimum of 1 contribution needs to be deposited per year.</li>
                                                </ul>
                                            </div>
                                            <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                                <h4 className="text-lg font-semibold text-[#243062] mb-3">Tier II Account:</h4>
                                                <ul className="list-disc list-inside space-y-2 text-base text-neutral-700">
                                                    <li>Being a voluntary savings facility, the subscriber is free to withdraw the NPS funds savings whenever funds are required.</li>
                                                    <li>Minimum deposit of INR 1,000 is required to open the account.</li>
                                                    <li>Minimum total transactions for a year can be INR 250.</li>
                                                    <li>There is no cap on the maximum amount deposited in the account.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'investment-choices' && (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                            <h4 className="text-lg font-semibold text-[#243062] mb-2">Active Choice:</h4>
                                            <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                                The individual decides how the money should be invested in different asset classes. With the best pension funds for NPS an individual can choose to allocate contributed funds in different percentages with a 50% maximum cap on Equity.
                                            </p>
                                            <ul className="list-disc list-inside space-y-2 text-base text-neutral-700 leading-relaxed">
                                                <li>Asset Class E: Invests 50% in stocks.</li>
                                                <li>Asset Class C: Invests in Fixed Income instruments other than government securities.</li>
                                                <li>Asset Class G: Invests only in Government Securities.</li>
                                            </ul>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-neutral-200">
                                            <h4 className="text-lg font-semibold text-[#243062] mb-2">Auto Choice:</h4>
                                            <p className="text-base text-neutral-700 leading-relaxed">
                                                The best NPS fund automatically invests money based on the age of the individual. This is a default option for the individuals as per the system.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'tax-benefits' && (
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-base text-neutral-700 leading-relaxed mb-4">
                                            As per the Income Tax Act 1961, the NPS funds attract income tax benefits:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-base text-neutral-700 leading-relaxed">
                                            <li>
                                                Under Section 80CCD(1B): Individuals contributing to National Pension Scheme investment in Tier I account can claim tax deductions of up to INR 50,000/- under Section 80CCD(1). This benefit is over and above the tax exemption of INR 1,50,000 under Section 80C. Under Section 80CCD(2): Employers contributing in Tier I investment in the NPS scheme are eligible for tax deduction up to 14% for central government contribution and 10% for others. This deduction falls over and above the deductions applicable under Section 80C. Withdrawal of 25% of Tier I contribution in the pension fund for NPS is exempt from tax. Lump-sum NPS fund withdrawal of up to 40% after the individual turns 60 is exempt from tax.
                                            </li>
                                        </ul>
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

            {/* Who Can Invest Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Who Can Invest in NPS?
                        </h2>
                        <div className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                            <ul className="list-disc list-inside space-y-3 text-base text-neutral-700 leading-relaxed">
                                <li>NPS schemes can be used for subscribers or investors who are planning their retirement and are risk-averse.</li>
                                <li>Individuals employed in the private sector who need regular income post-retirement through pension.</li>
                                <li>Who are seeking extra deduction of INR 50,000 under Income tax can benefit from National Pension Scheme investment.</li>
                                <li>Individuals between the age of 18-70 years of age can invest in the best NPS funds.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How NPS Works Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            How NPS Works?
                        </h2>
                        <div className="bg-white rounded-lg p-8 border border-neutral-200 space-y-4">
                            <p className="text-base text-neutral-700 leading-relaxed">
                                NPS is a defined contribution pension system in which the contributions are invested in a mix of assets and the retirement corpus is dependent on the returns from those assets.
                            </p>
                            <p className="text-base text-neutral-700 leading-relaxed">
                                The returns of the NPS scheme are linked to the markets and dedicated fund managers look into the management of funds.
                            </p>
                            <p className="text-base text-neutral-700 leading-relaxed">
                                An investor can open up to 2 types of accounts. Tier 1 accounts are those in which withdrawals cannot be made and tier 2 accounts are those in which voluntary withdrawals are allowed. An investor must open a Tier 1 account in order to be eligible to open a Tier 2 account.
                            </p>
                            <p className="text-base text-neutral-700 leading-relaxed">
                                Investors can also choose out of 2 options, auto choice and active choice. In auto choice the asset allocation is done as per the age of the investor and in active choice the choice of asset allocation lies with the investor. However in the active choice the capping is 50% in equity.
                            </p>
                            <p className="text-base text-neutral-700 leading-relaxed">
                                Withdrawals can be made at the age of retirement and if withdrawals are made before that there are certain exit conditions which are applicable.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Use Our National Pension Calculator to Figure Out the Pension Amount you Accumulate
                        </h2>
                        <div className="bg-neutral-50 rounded-lg p-8 border border-neutral-200">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Investment Amount
                                    </label>
                                    <input
                                        type="range"
                                        min="500"
                                        max="50000"
                                        step="500"
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
                                        max="15"
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
                                        min="10"
                                        max="40"
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
                                                    <div className={`text-base text-neutral-700 leading-relaxed ${htmlContentClasses}`} dangerouslySetInnerHTML={getHtmlContent(faq.answer)} />
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
                                Ready to Plan for Retirement with NPS?
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                                Connect with our experts to learn more about the National Pension Scheme and how it can secure your future with tax benefits and market-linked returns.
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
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pageSource="National Pension Scheme" />
        </div>
    );
};

export default NationalPensionScheme;

