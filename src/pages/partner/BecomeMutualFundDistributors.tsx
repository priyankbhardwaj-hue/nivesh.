import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { fetchFAQs, type FAQ } from '../../services/api';
import { API_LEAD_PARTNER, PARTNER_ONBOARDING_URL } from '../../config/api';
import { getLeadSource } from '../../utils/leadSource';

const PAGE_SOURCE = 'Become Mutual Fund Distributor';

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

const BecomeMutualFundDistributors: React.FC = () => {
    const navigate = useNavigate();
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
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

    // Fetch FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFaqs(true);
                const allFaqs = await fetchFAQs();
                // Filter FAQs by category "become-mfds"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'become-mfds' || 
                           category === 'become mfds' ||
                           category.includes('become-mfds');
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

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Become an MFD with Nivesh */}
            <section className="relative py-16 md:py-24 overflow-hidden bg-neutral-50">
                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-sm mb-10">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                            Home
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500">Become Mutual Fund Distributor</span>
                    </nav>
                    
                    {/* Centered Content */}
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                            Start your wealth journey — become a Mutual Fund Distributor with{' '}
                            <span className="text-primary">Nivesh</span>
                        </h1>
                        
                        <div className="space-y-4 mb-10 md:mb-12">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed max-w-3xl mx-auto">
                                We help you get AMFI certified, set up your business, and serve clients digitally — with tools, training, and a ready-to-use platform.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed max-w-3xl mx-auto">
                                Build a rewarding career helping people invest and grow wealth.
                            </p>
                        </div>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-12">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => window.open('https://app.nivesh.com/partner_onboarding', '_blank')}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                Get Started Now
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    const element = document.getElementById('how-it-works');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="!border-2 !border-[#243062] !text-[#243062] hover:!bg-[#243062] hover:!text-white px-8 py-4 rounded-lg text-lg font-semibold"
                            >
                                How It Works
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setIsLeadModalOpen(true)}
                                className="!border-2 !border-primary !text-primary hover:!bg-primary hover:!text-white px-8 py-4 rounded-lg text-lg font-semibold"
                            >
                                Talk to an Expert
                            </Button>
                        </div>

                        {/* Visual Elements - Icons representing learning, certification, and clients */}
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-12">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-neutral-700">Learning</span>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-neutral-700">Certification</span>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-neutral-700">Clients</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Wavy Lines at Bottom */}
                    {/* <div className="absolute bottom-0 left-0 right-0 z-0">
                        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20 md:h-24">
                            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
                        </svg>
                    </div> */}
                </div>
            </section>

            {/* Why Become an MFD? (Opportunity Section) */}
            <section className="py-12 md:py-20 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                </div>
                
                <div className="container-custom relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 leading-tight animate-fade-in">
                                A career with purpose, income, and independence.
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto animate-fade-in animation-delay-200">
                                India's financial awareness is growing — but millions still need guidance.
                            </p>
                        </div>
                        
                        {/* Benefits Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 animate-slide-in-right animation-delay-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-medium">
                                            As an MFD, you help clients save, invest, and reach life goals.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 animate-slide-in-right animation-delay-400 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-medium">
                                            You earn commissions on every investment and build a long-term, recurring income.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 animate-slide-in-right animation-delay-500 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-medium">
                                            You decide your own pace, clients, and future.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Quote Box */}
                        <div className="bg-primary/10 border-l-4 border-primary p-6 md:p-8 rounded-r-xl max-w-3xl mx-auto animate-fade-in animation-delay-600">
                            <p className="text-xl md:text-2xl font-bold text-[#243062] text-center italic">
                                It's not just a job — it's your own wealth business.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Nivesh Advantage Section */}
            <section id="how-it-works" className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            We make it simple to start, scale, and succeed.
                        </h2>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">Step</th>
                                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">What You Get with Nivesh</th>
                                            <th className="px-6 py-4 text-left text-sm md:text-base font-semibold">How It Helps</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200">
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-5 text-lg md:text-xl font-bold text-[#243062]">1. Learn & Get Certified</td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">AMFI exam training, mock tests, support</td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">Pass with confidence</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-5 text-lg md:text-xl font-bold text-[#243062]">2. Set Up Your Business</td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">Assistance in registration & documentation</td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">Quick & hassle-free onboarding</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-5 text-lg md:text-xl font-bold text-[#243062]">3. Start with Zero Investment</td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">No setup cost, no infrastructure required</td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">Begin earning from day one</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-5 text-lg md:text-xl font-bold text-[#243062]">4. Use Your Digital Platform</td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">White-labeled app + dashboard</td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">Manage clients easily</td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-5 text-lg md:text-xl font-bold text-[#243062]">5. Grow with Expert Support</td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">Marketing, client acquisition, and training</td>
                                            <td className="px-6 py-5 text-sm md:text-base text-neutral-700">Scale your income and brand</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p className="text-center text-xl md:text-2xl font-bold text-[#243062] mt-8 italic">
                            From learning to earning — Nivesh is with you at every step.
                        </p>
                    </div>
                </div>
            </section>

            {/* Training & Certification Support Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Become AMFI-certified the smart way.
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 animate-fade-in animation-delay-200 group">
                                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-medium pt-2">
                                            Free learning modules and test prep resources.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 animate-fade-in animation-delay-300 group">
                                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-medium pt-2">
                                            Mentor sessions to clarify rules, regulations, and client-handling.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 animate-fade-in animation-delay-400 group">
                                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                        </div>
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-medium pt-2">
                                            Practice questions & guidance from industry experts.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 animate-fade-in animation-delay-500 group">
                                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed font-medium pt-2">
                                            Direct help with ARN registration once you clear the exam.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-primary/10 rounded-xl p-6 md:p-8 border-2 border-primary/20">
                                <p className="text-lg md:text-xl font-semibold text-[#243062] italic text-center">
                                    "We don't just help you pass the exam — we prepare you for real client conversations."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real Growth Stories Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            From first client to first lakh — every success starts small.
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-neutral-200">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4 italic">
                                    "I started as a homemaker with no financial background. With Nivesh's support, I built a steady client base in just 6 months."
                                </p>
                                <p className="text-sm md:text-base font-semibold text-[#243062]">
                                    — Priya S., Delhi
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-neutral-200">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4 italic">
                                    "The digital tools made it easy to serve clients remotely. Today, I manage ₹4 Cr AUM with Nivesh."
                                </p>
                                <p className="text-sm md:text-base font-semibold text-[#243062]">
                                    — Rajesh K., Pune
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ready to Begin? Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 md:p-12 border-2 border-primary/20 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                                Your journey to becoming an MFD starts here.
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 mb-6 leading-relaxed">
                                Get trained, certified, and onboarded — all in one place.
                            </p>
                            <p className="text-base md:text-lg font-semibold text-[#243062] mb-8 leading-relaxed">
                                Build your own wealth business with Nivesh.
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => window.open('https://app.nivesh.com/partner_onboarding', '_blank')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold"
                                >
                                    Start My MFD Journey
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => navigate('/partner/all-about-amfi-arn-code')}
                                    className="!border-2 !border-primary !text-primary hover:!bg-primary hover:!text-white px-8 py-4 rounded-lg text-lg font-semibold"
                                >
                                    Learn About AMFI Certification
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => setIsLeadModalOpen(true)}
                                    className="!border-2 !border-[#243062] !text-[#243062] hover:!bg-[#243062] hover:!text-white px-8 py-4 rounded-lg text-lg font-semibold"
                                >
                                    Talk to an Expert
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section id="faqs" className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#243062] mb-10 md:mb-12 text-center leading-tight">
                            FAQs on Becoming an MFD with Nivesh
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
                                            onClick={() => {
                                                const newOpenFaqs = { ...openFaqs };
                                                newOpenFaqs[index] = !newOpenFaqs[index];
                                                setOpenFaqs(newOpenFaqs);
                                            }}
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

export default BecomeMutualFundDistributors;

