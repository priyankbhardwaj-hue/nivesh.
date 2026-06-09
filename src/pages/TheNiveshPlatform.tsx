import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import digitalOnboardingKYCImg2 from '../assets/Digital Onboarding & KYC2.jpeg';
import goalPlanningImg2 from '../assets/Goal Planning & Tracking2.jpeg';
import portfolioReportsImg2 from '../assets/Portfolio Reports & Analytics2.jpeg';
import multiProductTransactionImg2 from '../assets/Multi-Product Transactions2.jpeg';
import whiteLabelImg2 from '../assets/White-label App & Dashboard2.jpeg';
import marketingCRMToolsImg2 from '../assets/Marketing & CRM Tools2.jpeg';
import portfolioConstructionImg from '../assets/Portfolio Construction.jpeg';
import portfolioReviewEngineImg from '../assets/Portfolio Review Engine.jpeg';
import insightsDashboardImg from '../assets/Insights Dashboard.jpeg';
import eVisitingCardImg from '../assets/E-Visiting Card.jpeg';

const RESEARCH_FEATURES = [
    { title: 'Portfolio Construction', description: 'Goal-based, asset-allocated model portfolios tailored to client profiles.', iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', image: portfolioConstructionImg },
    { title: 'Portfolio Review Engine', description: 'Automated health checks and alerts to identify rebalancing needs.', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', image: portfolioReviewEngineImg },
    { title: 'Insights Dashboard', description: 'Actionable signals to help MFDs proactively engage clients.', iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', image: insightsDashboardImg },
    { title: 'E-Visiting Card', description: 'Create, preview, and share your E-Visiting Card in seconds.', iconPath: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2', image: eVisitingCardImg },
];

const CAPABILITIES = [
    { name: 'Digital Onboarding & KYC', description: 'Seamless client activation, paperless and compliant', iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', image: digitalOnboardingKYCImg2 },
    { name: 'Goal Planning & Tracking', description: 'Interactive goal planner with real-time progress charts', iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', image: goalPlanningImg2 },
    { name: 'Portfolio Reports & Analytics', description: 'Rich visuals that clients love and trust', iconPath: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z', image: portfolioReportsImg2 },
    { name: 'Multi-Product Transactions', description: 'One-click execution across MF, PMS, Bonds & Insurance', iconPath: 'M12 4v16m8-8H4', image: multiProductTransactionImg2 },
    { name: 'White-label App & Dashboard', description: 'Offer your clients a premium experience under your brand', iconPath: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', image: whiteLabelImg2 },
    { name: 'Marketing & CRM Tools', description: 'Campaign templates, client alerts, and engagement tracking', iconPath: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z', image: marketingCRMToolsImg2 },
];

const TheNiveshPlatform: React.FC = () => {
    const navigate = useNavigate();
    const [carouselIndex, setCarouselIndex] = useState(0);
    const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        autoSlideRef.current = setInterval(() => {
            setCarouselIndex((i) => (i === CAPABILITIES.length - 1 ? 0 : i + 1));
        }, 4000);
        return () => {
            if (autoSlideRef.current) clearInterval(autoSlideRef.current);
        };
    }, []);

    const goToPrev = () => setCarouselIndex((i) => (i === 0 ? CAPABILITIES.length - 1 : i - 1));
    const goToNext = () => setCarouselIndex((i) => (i === CAPABILITIES.length - 1 ? 0 : i + 1));
    const goToSlide = (index: number) => setCarouselIndex(index);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 overflow-hidden bg-primary/10">
                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-sm mb-10">
                            <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                                Home
                            </Link>
                            <span className="text-neutral-400">/</span>
                            <span className="text-neutral-500">The Nivesh Platform</span>
                        </nav>
                    
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sm md:text-lg text-primary font-semibold mb-6 uppercase tracking-wide">
                            One digital platform. Every wealth solution. Backed by research, intelligence, and trust.
                        </p>
                        <h2 className="text-4xl font-bold text-[#243062] mb-8 leading-tight md:hidden">
                            One platform. Smarter wealth management.
                        </h2>
                        <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-8 leading-tight">
                            One platform. Smarter wealth management.
                        </h1>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                            From Mutual Funds to PMS, AIFs, Bonds, and Insurance — Nivesh empowers you with data-driven research, intelligent recommendations, and a seamless digital platform to grow your clients and your brand.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-16 sm:mt-20 justify-center">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => window.open('https://app.nivesh.com/partner_onboarding', '_blank')}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                Book a Demo
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    const element = document.getElementById('features');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="!border-2 !border-[#243062] !text-[#243062] hover:!bg-[#243062] hover:!text-white px-8 py-4 rounded-lg text-lg font-semibold"
                            >
                                Explore Features
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Unified Product Ecosystem Section */}
            <section className="py-12 md:py-20 bg-white px-4 sm:px-0">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h3 className="text-xl font-bold text-[#243062] mb-6 text-center leading-tight md:hidden">
                            From investments to protection — deliver holistic solutions effortlessly.
                        </h3>
                        <h2 className="hidden md:block text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-12 text-center leading-tight">
                            From investments to protection — deliver holistic solutions effortlessly.
                        </h2>
                        <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 overflow-hidden hover:border-primary/40 transition-all duration-300">
                            <div className="overflow-x-hidden min-w-0 md:overflow-x-visible">
                                <table className="w-full table-fixed md:table-auto text-[10px] sm:text-xs md:text-base">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 text-left text-[10px] sm:text-xs md:text-sm md:text-base font-semibold w-[20%] md:w-auto">Product</th>
                                            <th className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 text-left text-[10px] sm:text-xs md:text-sm md:text-base font-semibold w-[40%] md:w-auto">What It Means for You</th>
                                            <th className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 text-left text-[10px] sm:text-xs md:text-sm md:text-base font-semibold w-[40%] md:w-auto">Client Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200">
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-lg md:text-xl font-bold text-[#243062]">Mutual Funds</td>
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-sm md:text-base text-neutral-700">Access curated schemes & recommendations powered by proprietary scoring</td>
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-sm md:text-base text-neutral-700">Smarter SIPs, aligned to goals</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-lg md:text-xl font-bold text-[#243062]">PMS</td>
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-sm md:text-base text-neutral-700">Connect clients to premium portfolio managers</td>
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-sm md:text-base text-neutral-700">Personalized, high-alpha solutions</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-lg md:text-xl font-bold text-[#243062]">AIFs</td>
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-sm md:text-base text-neutral-700">Unlock advanced strategies for qualified investors</td>
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-sm md:text-base text-neutral-700">Diversified, growth-oriented exposure</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-lg md:text-xl font-bold text-[#243062]">Bonds & MLDs</td>
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-sm md:text-base text-neutral-700">Offer stable, fixed-income alternatives</td>
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-sm md:text-base text-neutral-700">Balance risk and reward</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-lg md:text-xl font-bold text-[#243062]">Life & Health Insurance</td>
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-sm md:text-base text-neutral-700">Add protection and peace of mind</td>
                                            <td className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-5 text-[10px] sm:text-xs md:text-sm md:text-base text-neutral-700">True financial wellness</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p className="text-center text-base sm:text-xl md:text-2xl font-bold text-[#243062] mt-6 md:mt-8 italic">
                            All products. One login. Intelligent diversification.
                        </p>
                    </div>
                </div>
            </section>

            {/* Proprietary Research & Advisory Intelligence Section */}
            <section id="features" className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 text-center leading-tight">
                            Research that empowers real advice.
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 text-center leading-relaxed">
                            Nivesh's in-house research engine helps you go beyond selling — to advising with confidence.
                        </p>
                        <div className="space-y-6 md:space-y-8 mb-8">
                            {RESEARCH_FEATURES.map((item, index) => {
                                const imageLeft = index % 2 === 0;
                                const imageBlock = (
                                    <div key={`${index}-img`} className={`rounded-xl overflow-hidden bg-neutral-100 min-h-[200px] md:min-h-[240px] order-1 ${!imageLeft ? 'md:order-2' : ''}`}>
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center min-h-[200px] md:min-h-[240px]" />
                                    </div>
                                );
                                const cardBlock = (
                                    <div key={`${index}-card`} className={`bg-white rounded-xl p-6 md:p-8 border-2 border-primary/20 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group flex flex-col justify-center order-2 ${!imageLeft ? 'md:order-1' : ''}`}>
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.iconPath} />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                            {item.title}
                                        </h3>
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                                return (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
                                        {imageLeft ? imageBlock : cardBlock}
                                        {imageLeft ? cardBlock : imageBlock}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="bg-primary/10 rounded-xl p-8 py-4 md:py-6 md:p-10 border-2 border-primary/20 text-center">
                            <p className="text-lg md:text-xl font-semibold text-[#243062] italic">
                                Transform from distributor to trusted wealth strategist.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Advisor Tools & Capabilities Section */}
            <section className="py-8 md:py-14 lg:py-20 bg-white px-4 sm:px-6">
                <div className="container-custom">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-10 text-center leading-tight">
                        Simplify operations. Amplify relationships.
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-10 items-start max-w-6xl mx-auto">
                        {/* Left: Capabilities table (reduced height) */}
                        <div className="min-w-0 w-full">
                            <div className="bg-white rounded-lg md:rounded-xl shadow-lg border-2 border-primary/20 overflow-hidden hover:border-primary/40 transition-all duration-300">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[280px] sm:min-w-[320px]">
                                        <thead className="bg-primary text-white">
                                            <tr>
                                                <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold">Capability</th>
                                                <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200">
                                            {CAPABILITIES.map((cap, index) => (
                                                <tr
                                                    key={index}
                                                    className={`transition-colors cursor-default ${index === carouselIndex ? 'bg-primary/10' : 'hover:bg-primary/5'}`}
                                                >
                                                    <td className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-bold text-[#243062] flex items-center gap-2">
                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cap.iconPath} />
                                                        </svg>
                                                        <span>{cap.name}</span>
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs text-neutral-700">{cap.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Right: Image carousel (reduced height) */}
                        <div className="w-full flex flex-col min-w-0">
                            <div className="bg-white rounded-lg md:rounded-xl shadow-lg border-2 border-primary/20 overflow-hidden hover:border-primary/40 transition-all duration-300 flex flex-col w-full">
                                <div className="relative w-full h-[280px] sm:h-[320px] md:h-[320px] bg-neutral-50">
                                    {CAPABILITIES.map((cap, i) => (
                                        <div
                                            key={i}
                                            className={`absolute inset-0 transition-opacity duration-300 ${i === carouselIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                            aria-hidden={i !== carouselIndex}
                                        >
                                            <img src={cap.image} alt={cap.name} className="w-full h-full object-contain object-center p-2" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between gap-2 p-2 sm:p-2.5 border-t border-neutral-100 bg-neutral-50/50">
                                    <button
                                        type="button"
                                        onClick={goToPrev}
                                        className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                                        aria-label="Previous image"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <div className="flex gap-1.5">
                                        {CAPABILITIES.map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => goToSlide(i)}
                                                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === carouselIndex ? 'bg-primary' : 'bg-neutral-300 hover:bg-neutral-400'}`}
                                                aria-label={`Go to slide ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={goToNext}
                                        className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                                        aria-label="Next image"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#243062] mt-6 md:mt-10 italic max-w-4xl mx-auto px-2">
                        Let tech handle the heavy lifting — you focus on advice and growth.
                    </p>
                </div>
            </section>

            {/* White-label Advantage Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Your brand. Powered by Nivesh.
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                                <ul className="space-y-4 text-base md:text-lg text-neutral-700">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>Launch your own branded mobile app and client portal — no coding, no infrastructure cost.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>Clients invest, track, and interact with you — not a third-party name.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>Build visibility, trust, and long-term stickiness.</span>
                                    </li>
                                </ul>
                            </div>
                            <p className="text-center text-xl md:text-2xl font-bold text-[#243062] italic">
                                Because clients remember brands, not backends.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security, Compliance & Reliability Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Built on trust. Backed by compliance.
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                                <ul className="space-y-4 text-base md:text-lg text-neutral-700">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>AMFI-registered, SEBI-compliant framework</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>Integrated with BSE StAR MF and NSE systems</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>End-to-end encryption and secure data hosting</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>Multi-layer verification for every transaction</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>99.9% uptime and continuous monitoring</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-primary/10 rounded-xl p-6 md:p-8 border-2 border-primary/20 text-center">
                                <p className="text-lg md:text-xl font-semibold text-[#243062] italic">
                                    Your clients' trust is your biggest asset — and our highest priority.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Growth Support & Partnership Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            You grow. We grow with you.
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                                <ul className="space-y-4 text-base md:text-lg text-neutral-700">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>Dedicated partner success team</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>Marketing and client acquisition support</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>Continuous platform enhancements</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 font-bold">•</span>
                                        <span>Access to industry insights and advisor communities</span>
                                    </li>
                                </ul>
                            </div>
                            <p className="text-center text-xl md:text-2xl font-bold text-[#243062] italic">
                                Your growth story is built into our roadmap.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 md:p-12 border-2 border-primary/20 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                                Discover a smarter way to grow your wealth business.
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                                Manage every client, every product, and every insight — from one intelligent platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="bg-black text-white text-[9px] sm:text-[14px] hover:bg-neutral-800 border-none shadow-lg flex items-center gap-2 sm:px-6"
                                    onClick={() => navigate('/for-mfds')}
                                >
                                    Existing MFD? Connect with Us
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-neutral-900 text-neutral-900 hover:bg-neutral-200 flex items-center gap-2 text-xs sm:text-base px-3 sm:px-6"
                                    onClick={() => navigate('/partner/become-mutual-fund-distributors')}
                                >
                                    Become an MFD
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TheNiveshPlatform;

