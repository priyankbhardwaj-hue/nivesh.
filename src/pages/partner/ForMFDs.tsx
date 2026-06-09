import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { API_LEAD_PARTNER, PARTNER_ONBOARDING_URL } from '../../config/api';
import { getLeadSource } from '../../utils/leadSource';

const PAGE_SOURCE = 'ForMFDs';

function getQueryVariable(variable: string): string | false {
    try {
        const query = window.location.search.substring(1);
        const vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            if (pair[0] === variable) {
                const value = pair[1] ?? '';
                return value ? decodeURIComponent(value) : '';
            }
        }
    } catch {
        // ignore
    }
    return false;
}

function getUtmParam(key: string, fallback = ''): string {
    const value = getQueryVariable(key);
    return value !== false ? value : fallback;
}

const ForMFDs: React.FC = () => {
    const navigate = useNavigate();
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        holderType: 'arnHolder' as 'arnHolder' | 'nonArnHolder',
        getInfo: true,
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePartnerFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);
        const name = formData.fullName.trim();
        const email = formData.email.trim();
        const mobile = formData.mobile.trim();
        if (!name || !email || !mobile) {
            setSubmitError('Please fill in Full Name, Email and Mobile Number.');
            return;
        }
        setSubmitLoading(true);
        const source = getLeadSource(PAGE_SOURCE);
        const campaign = getUtmParam('utm_campaign');
        const content = getUtmParam('utm_content');
        const medium = getUtmParam('utm_medium');
        const payload = {
            Name: name,
            PhoneNo: mobile,
            Email: email,
            Message: formData.holderType === 'arnHolder' ? 'ARN Holder' : 'NON ARN Holder',
            IsDistributor: 0,
            TypeRequest: `LeadPartnerForm|${source}|${campaign}|${content}|${medium}`,
            Source: source,
            source: source,
        };
        try {
            const res = await fetch(API_LEAD_PARTNER, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                window.location.href = PARTNER_ONBOARDING_URL;
                return;
            }
            setSubmitError('Something went wrong. Please try again.');
        } catch {
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 overflow-hidden bg-neutral-50">
                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-sm mb-10">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                            Home
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500">Transform Your Distribution Business</span>
                    </nav>
                    
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:hidden font-bold text-[#243062] mb-8 leading-tight">
                                Transform your distribution business into a digital wealth brand.
                            </h2>
                            <h1 className="hidden md:block text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-8 leading-tight">
                                Transform your distribution business into a digital wealth brand.
                            </h1>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Nivesh empowers MFDs to scale faster, serve better, and evolve beyond transactions — with a digital platform that's fully white-labeled, multi-product, and client-first.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-20 justify-center">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => window.open('https://lead.nivesh.com/i-am-a-distributor/?utm_campaign=PartnerOnboarding', '_blank')}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                Get Your Free Platform
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setIsLeadModalOpen(true)}
                                className="!border-2 !border-[#243062] !text-[#243062] hover:!bg-[#243062] hover:!text-white px-8 py-4 rounded-lg text-lg font-semibold"
                            >
                                Book a Demo →
                            </Button>
                        </div>
                        <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-r-xl mt-8 max-w-2xl mx-auto">
                            <p className="text-lg md:text-xl font-semibold text-[#243062] italic">
                                "Platforms don't replace advisors — they evolve them."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why MFDs Need a Platform Now Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 text-center leading-tight">
                            You've built trust. Now build scale.
                        </h2>
                        <div className="space-y-6 mb-8">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                The old way of managing client portfolios — through Excel sheets, emails, and manual updates — limits growth and hurts client engagement.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Today's investors expect seamless, digital experiences and multi-product portfolios.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                With Nivesh, you can automate operations, expand your offering, and build a brand that grows with you.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-base md:text-lg text-neutral-700 font-medium">Go digital — onboard clients instantly</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <p className="text-base md:text-lg text-neutral-700 font-medium">Expand beyond mutual funds — offer PMS, AIFs, Bonds, and Insurance</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-base md:text-lg text-neutral-700 font-medium">Build your brand with your own app and web portal</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <p className="text-base md:text-lg text-neutral-700 font-medium">Deliver transparency and real-time insights</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    const element = document.getElementById('features');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="!border-2 !border-primary !text-primary hover:!bg-primary hover:!text-white px-8 py-4 rounded-lg text-lg font-semibold"
                            >
                                Explore How Nivesh Works →
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Changes with Nivesh Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            From manual management to intelligent growth.
                        </h2>
                        <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 overflow-hidden hover:border-primary/40 transition-all duration-300">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">Without Platform</th>
                                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">With Nivesh</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200">
                                        <tr className="hover:bg-primary/5 transition-colors">
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span>Manual data entry</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700 font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>Smart dashboards & automated reporting</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-primary/5 transition-colors">
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span>Product selling</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700 font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>Goal-based, advisory-led approach</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-primary/5 transition-colors">
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span>One product (MFs)</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700 font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>Multi-product ecosystem: PMS, AIFs, Bonds, Insurance</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-primary/5 transition-colors">
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span>Fragmented tools</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700 font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>One unified platform</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-primary/5 transition-colors">
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span>Time spent on ops</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700 font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>More time for client engagement</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>
                    <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-xl mt-12 max-w-4xl mx-auto">
                            <p className="text-center text-lg md:text-xl font-bold text-[#243062] italic">
                                "Let the tech do the work — so you can focus on what matters: your clients."
                            </p>
                        </div>
                </div>
            </section>

            {/* Key Features Built for MFDs Section */}
            <section id="features" className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Everything you need. Nothing you don't.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-primary/20 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    Digital Onboarding & KYC
                                </h3>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    Instant Aadhaar-based onboarding, eSign, and eMandate — faster client activation, zero paperwork.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-primary/20 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    Goal-Based Planning
                                </h3>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    Move beyond SIPs — help clients visualize and achieve their financial goals.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-primary/20 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    Multi-Product Access
                                </h3>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    Distribute PMS, AIFs, Bonds, MLDs, and Insurance — all on one screen.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-primary/20 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    Portfolio Insights & Analytics
                                </h3>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    Track performance, identify trends, and send timely alerts — all under your brand.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-primary/20 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    White-Label Branding
                                </h3>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    Your name. Your app. Your identity. Clients always remember who manages their money.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-primary/20 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    Marketing & Communication Tools
                                </h3>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    Get ready creatives, track leads, and run campaigns — directly from your dashboard.
                                </p>
                            </div>
                        </div>
                        <div className="text-center">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate('/the-nivesh-platform')}
                                className="!border-2 !border-primary !text-primary hover:!bg-primary hover:!text-white px-8 py-4 rounded-lg text-lg font-semibold"
                            >
                                View Platform Features →
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real Growth, Real Stories Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 text-center leading-tight">
                            Advisors who switched to Nivesh are seeing 2x–5x business growth.
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 text-center leading-relaxed">
                            When advisors go digital, their business grows faster, and client satisfaction soars. Hear from those who've made the leap.
                        </p>
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border-l-4 border-primary hover:shadow-xl transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4 italic">
                                            "Everything runs digitally now — onboarding, reports, and portfolio reviews. My time goes to clients, not admin."
                                        </p>
                                        <p className="text-sm md:text-base font-semibold text-[#243062]">
                                            — Ankit Jain, MFD from Pune
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border-l-4 border-primary hover:shadow-xl transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4 italic">
                                            "Nivesh helped me expand beyond MFs. Now I offer PMS and Bonds too — clients see me as their wealth partner."
                                        </p>
                                        <p className="text-sm md:text-base font-semibold text-[#243062]">
                                            — Rohit Mehta, MFD from Ahmedabad
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-8">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate('/testimonials')}
                                className="!border-2 !border-primary !text-primary hover:!bg-primary hover:!text-white px-8 py-4 rounded-lg text-lg font-semibold"
                            >
                                See All Success Stories →
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scale Your Brand with Nivesh Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 text-center leading-tight">
                            Your business, your brand — powered by Nivesh.
                        </h2>
                        <div className="space-y-6 mb-8">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed text-center">
                                Unlike other platforms that keep your clients under their name, Nivesh helps you build your brand.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed text-center">
                                Launch your own white-labeled platform and app in just days — so every interaction strengthens your identity and trust.
                            </p>
                        </div>
                        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl mb-8 max-w-3xl mx-auto">
                            <p className="text-center text-xl md:text-2xl font-bold text-[#243062] italic">
                                "Your clients shouldn't remember who powered the platform — they should remember you."
                            </p>
                        </div>
                        <div className="text-center">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => window.open('https://app.nivesh.com', '_blank')}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold"
                            >
                                Get My White-Label Platform →
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why MFDs Choose Nivesh Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Built for MFDs. Backed by experience.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-base md:text-lg text-neutral-700 font-medium leading-relaxed">
                                            Trusted by 10,000+ advisors across India
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-base md:text-lg text-neutral-700 font-medium leading-relaxed">
                                            Integrated with CAMS & KFin
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-base md:text-lg text-neutral-700 font-medium leading-relaxed">
                                            Zero onboarding cost
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-base md:text-lg text-neutral-700 font-medium leading-relaxed">
                                            Compliant with AMFI & SEBI regulations
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-base md:text-lg text-neutral-700 font-medium leading-relaxed">
                                            Access to PMS, AIF, Bonds, MLDs, and Insurance
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-base md:text-lg text-neutral-700 font-medium leading-relaxed">
                                            Dedicated training & support team for growth
                                        </p>
                                    </div>
                                </div>
                            </div>
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
                                The future MFD is digital. The platform is Nivesh.
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                                Join thousands of advisors using Nivesh to scale faster, offer more, and deliver better outcomes for clients.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => window.open('https://app.nivesh.com/partner_onboarding', '_blank')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold"
                                >
                                    Get Started Free
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => setIsLeadModalOpen(true)}
                                    className="!border-2 !border-primary !text-primary hover:!bg-primary hover:!text-white px-8 py-4 rounded-lg text-lg font-semibold"
                                >
                                    Talk to a Platform Expert →
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inline Partner Lead Modal */}
            {isLeadModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setIsLeadModalOpen(false)}
                >
                    <div className="relative bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-[calc(100%-0.5rem)] sm:max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
                        <button
                            type="button"
                            onClick={() => setIsLeadModalOpen(false)}
                            className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 md:p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors z-10"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <form noValidate onSubmit={handlePartnerFormSubmit} className="p-4 md:p-8 pt-10 md:pt-12">
                            <h2 className="text-base md:text-2xl font-bold text-neutral-800 mb-4 md:mb-6 pr-8">
                                Fill the Form to Know More!
                            </h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Enter Full Name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                                <input
                                    type="email"
                                    placeholder="Enter Email ID"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                                <input
                                    type="tel"
                                    placeholder="Enter Mobile Number"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                                />

                                <div className="pt-2">
                                    <p className="text-sm font-bold text-neutral-800 mb-3">Currently, you are an</p>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="holderType"
                                                value="arnHolder"
                                                checked={formData.holderType === 'arnHolder'}
                                                onChange={(e) => setFormData({ ...formData, holderType: e.target.value as 'arnHolder' })}
                                                className="w-4 h-4 text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-neutral-700">ARN Holder</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="holderType"
                                                value="nonArnHolder"
                                                checked={formData.holderType === 'nonArnHolder'}
                                                onChange={(e) => setFormData({ ...formData, holderType: e.target.value as 'nonArnHolder' })}
                                                className="w-4 h-4 text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-neutral-700">Non ARN Holder</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <label className="flex items-start gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.getInfo}
                                            onChange={(e) => setFormData({ ...formData, getInfo: e.target.checked })}
                                            className="w-4 h-4 mt-1 text-primary focus:ring-primary"
                                        />
                                        <span className="text-xs text-neutral-600 leading-relaxed">
                                            I would like to get information on products, investment options via WhatsApp, Email, SMS, phone from Nivesh
                                        </span>
                                    </label>
                                </div>

                                {submitError && <p className="text-sm text-red-600">{submitError}</p>}

                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="w-full bg-[#243062] hover:bg-[#1a2347] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {submitLoading ? 'Submitting...' : 'I Would Like To Know More'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForMFDs;


