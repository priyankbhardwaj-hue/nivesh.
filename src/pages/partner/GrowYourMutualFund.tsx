import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Favicon from '../../assets/Favicon.png';
import Testimonials from '../../components/home/Testimonials';
import { fetchFAQs, convertYouTubeUrlToEmbed, type FAQ } from '../../services/api';
import { API_LEAD_PARTNER, PARTNER_ONBOARDING_URL } from '../../config/api';
import { getLeadSource } from '../../utils/leadSource';

const PAGE_SOURCE = 'Grow Your Mutual Fund';

function getQueryVariable(variable: string): string | false {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] === variable) return decodeURIComponent(pair[1] || '');
    }
    return false;
}

function getUtmParam(key: string, fallback = ''): string {
    const value = getQueryVariable(key);
    return value !== false ? value : fallback;
}

const GrowYourMutualFund: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        holderType: 'arnHolder',
        getInfo: true,
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, _setSubmitSuccess] = useState(false);
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const [modalFormData, setModalFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        holderType: 'arnHolder' as 'arnHolder' | 'nonArnHolder',
        getInfo: true,
    });
    const [modalSubmitLoading, setModalSubmitLoading] = useState(false);
    const [modalSubmitError, setModalSubmitError] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFaqs(true);
                const allFaqs = await fetchFAQs();
                // Filter FAQs by category "grow-your-mf"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'grow-your-mf' || 
                           category === 'grow your mf' ||
                           category.includes('grow-your-mf');
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


    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);
        setSubmitLoading(true);
        const name = formData.fullName.trim();
        const email = formData.email.trim();
        const mobile = formData.mobile.trim();
        if (!name || !email || !mobile) {
            setSubmitError('Please fill in Full Name, Email and Mobile Number.');
            setSubmitLoading(false);
            return;
        }
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

    const handleModalFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setModalSubmitError(null);
        const name = modalFormData.fullName.trim();
        const email = modalFormData.email.trim();
        const mobile = modalFormData.mobile.trim();
        if (!name || !email || !mobile) {
            setModalSubmitError('Please fill in Full Name, Email and Mobile Number.');
            return;
        }
        setModalSubmitLoading(true);
        const source = getLeadSource(PAGE_SOURCE);
        const campaign = getUtmParam('utm_campaign');
        const content = getUtmParam('utm_content');
        const medium = getUtmParam('utm_medium');
        const payload = {
            Name: name,
            PhoneNo: mobile,
            Email: email,
            Message: modalFormData.holderType === 'arnHolder' ? 'ARN Holder' : 'NON ARN Holder',
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
            setModalSubmitError('Something went wrong. Please try again.');
        } catch {
            setModalSubmitError('Something went wrong. Please try again.');
        } finally {
            setModalSubmitLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section id="hero-section" className="relative pt-20 md:pt-24 pb-12 md:pb-20 overflow-hidden bg-neutral-50">
                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-xs sm:text-sm px-4 sm:px-0">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                            Home
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500">Grow Your MFD Distribution Business</span>
                    </nav>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Left Column - Content */}
                        <div className="relative z-10 text-center lg:text-left mt-6 sm:mt-8 lg:mt-10">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#243062] mb-4 sm:mb-5 md:mb-6 leading-tight px-2 sm:px-0">
                                Grow Your MFD{' '}
                                <span className="text-primary">Business</span>
                            </h1>
                            
                            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-6 sm:mb-7 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 px-4 sm:px-6 lg:px-0">
                                Transform your mfd business with Nivesh's comprehensive platform. Scale your operations, enhance client relationships, and accelerate your growth with cutting-edge technology and dedicated support.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-7 md:mb-8 px-4 sm:px-0">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => window.open('https://app.nivesh.com/partner_onboarding', '_blank')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                                >
                                    Start Growing Today
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => window.open('https://nivesh.com/en/partner', '_blank')}
                                    className="!border-2 !border-[#243062] !text-[#243062] hover:!bg-[#243062] hover:!text-white hover:!border-[#243062] active:!bg-[#243062] active:!text-white active:!border-[#243062] focus:!bg-[#243062] focus:!text-white focus:!border-[#243062] focus:!outline-none px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold w-full sm:w-auto"
                                >
                                    Learn More
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-md mx-auto lg:mx-0 px-4 sm:px-0">
                                <div className="text-center">
                                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#243062]">5000+</div>
                                    <div className="text-xs sm:text-sm text-neutral-600">Active Clients</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#243062]">₹1000Cr+</div>
                                    <div className="text-xs sm:text-sm text-neutral-600">AUM Managed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#243062]">99%</div>
                                    <div className="text-xs sm:text-sm text-neutral-600">Satisfaction</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form Card or Success Message */}
                        <div className="relative z-10 mt-8 lg:mt-0">
                            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-5 md:p-6 border border-neutral-200 mx-4 sm:mx-0">
                                {submitSuccess ? (
                                    <div className="text-center py-4">
                                        <div className="inline-flex w-12 h-12 rounded-full bg-green-100 text-primary items-center justify-center mb-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <h2 className="text-lg md:text-xl font-bold text-[#243062] mb-2">Thank you!</h2>
                                        <p className="text-neutral-600 text-sm">We have received your details. Our team will get in touch with you shortly.</p>
                                    </div>
                                ) : (
                                <form noValidate onSubmit={handleFormSubmit} className="space-y-5">
                                    <div className="text-center mb-6">
                                        <div className="flex justify-center mb-4">
                                            <img src={Favicon} alt="Nivesh" className="w-10 h-10" />
                                        </div>
                                        <h2 className="text-lg md:text-xl font-bold text-[#243062] mb-1">
                                            It's a Great Opportunity
                                        </h2>
                                        <h2 className="text-xl md:text-2xl font-bold text-[#243062]">
                                            Let's Connect!
                                        </h2>
                                    </div>
                                    
                                    <input
                                        type="text"
                                        placeholder="Enter Full Name"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                                    />
                                    
                                    <input
                                        type="email"
                                        placeholder="Enter Email-ID"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                                    />
                                    
                                    <input
                                        type="tel"
                                        placeholder="Enter Mobile Number"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                                    />
                                    
                                    <div className="space-y-3 pt-2">
                                        <p className="text-sm font-medium text-neutral-700 text-center">Currently, you are an</p>
                                        <div className="flex gap-6 justify-center">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="holderType"
                                                    value="arnHolder"
                                                    checked={formData.holderType === 'arnHolder'}
                                                    onChange={(e) => setFormData({ ...formData, holderType: e.target.value })}
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
                                                    onChange={(e) => setFormData({ ...formData, holderType: e.target.value })}
                                                    className="w-4 h-4 text-primary focus:ring-primary"
                                                />
                                                <span className="text-sm text-neutral-700">Non ARN Holder</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <label className="flex items-start gap-3 cursor-pointer pt-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.getInfo}
                                            onChange={(e) => setFormData({ ...formData, getInfo: e.target.checked })}
                                            className="mt-1 w-4 h-4 text-primary focus:ring-primary rounded"
                                        />
                                        <span className="text-xs text-neutral-600 leading-relaxed">
                                            I would like to get information on products, investment options via WhatsApp, Email, SMS, phone from Nivesh
                                        </span>
                                    </label>

                                    {submitError && (
                                        <p className="text-sm text-red-600">{submitError}</p>
                                    )}
                                    
                                    <button
                                        type="submit"
                                        disabled={submitLoading}
                                        className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 text-base shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {submitLoading ? 'Submitting...' : 'Submit'}
                                    </button>
                                </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Building Your MFD Business Section */}
            <section className="py-12 md:py-20 bg-[#F87171]">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
                            Building Your MFD Business with a Simple But Powerful Formula
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl text-white mb-6 leading-relaxed">
                            With the rapidly evolving mutual fund industry of today, growing your mfd business is as uncomplicated as a straightforward but extremely efficient recipe:
                        </p>
                        <div className="border border-white backdrop-blur-sm rounded-lg p-4 md:p-6 mb-6">
                            <p className="text-lg md:text-xl lg:text-xl font-semibold text-white">
                                More AUM = Number of Clients × Amount Invested per Client × Clients' Retention Rate
                            </p>
                        </div>
                        <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed">
                            This proven technique is central to successful MFDs growing their mutual fund businesses. But during 2025, there is one critical ingredient that has been identified as an absolute necessity: digital enablement.
                        </p>
                    </div>
                </div>
            </section>

            {/* Get Your AMFI Registration Number Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Get Your AMFI Registration Number
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200 mb-8">
                            <ul className="space-y-4 list-disc list-inside text-sm md:text-base text-neutral-700 leading-relaxed">
                                <li>You can generate leads from social media platforms like Facebook and WhatsApp by sharing personalized and branded content.</li>
                                <li>We help you build social media presence with Google business listings and your own website.</li>
                                <li>We also help you organize Investor Awareness Programs in your area.</li>
                                <li>You can generate more business remotely by sharing App Referral Link.</li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => setIsLeadModalOpen(true)}
                                className="bg-[#243062] hover:bg-[#1a2447] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                            >
                                Join Us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Increasing Investment Per Customer Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Increasing Investment Per Customer
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                            <ul className="space-y-4 list-disc list-inside text-sm md:text-base text-neutral-700 leading-relaxed">
                                <li>Nivesh's goal-based investment plans help you to suggest the right asset allocation and funds for the customers, thereby increasing their confidence in you.</li>
                                <li>Cross-sell and up-sell opportunities are identified and suggested by the platform. You can accordingly approach customers with new product ideas.</li>
                                <li>Customers can also use the Nivesh app. The transparency helps in generating more business from existing customers.</li>
                                <li>Our data shows that more and more existing customers do repeat business after using the platform.</li>
                                <li>Multiple product bouquet also helps in mobilizing business as per needs of the customers.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Increasing Customer Retention Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Increasing Customer Retention
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200 mb-8">
                            <ul className="space-y-4 list-disc list-inside text-sm md:text-base text-neutral-700 leading-relaxed">
                                <li>Your ability to service customers in real-time with the help of the online platform will result in lower customer churn and much higher customer retention.</li>
                                <li>You can share engaging content provided by Nivesh's content team with your existing customers.</li>
                                <li>Right kind of suggestions during market volatility also helps in customer retention.</li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => setIsLeadModalOpen(true)}
                                className="bg-[#243062] hover:bg-[#1a2447] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                            >
                                Join Us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Understand Your Clients' Needs to Build Trust Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                            Understand Your Clients' Needs to Build Trust
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed mb-6">
                                The foundation of any successful mfd business lies in understanding your clients' goals. Whether they aim to save for retirement, build an emergency fund, or achieve short-term goals, providing personalized recommendation fosters trust and loyalty.
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                Key Steps to Build Client Trust:
                            </h3>
                            <ul className="space-y-4 list-disc list-inside text-sm md:text-base text-neutral-700 leading-relaxed">
                                <li>Conduct in-depth consultations to understand financial goals.</li>
                                <li>Educate clients about various mutual fund schemes, including SIPs and tax-saving funds.</li>
                                <li>Maintain regular communication to update clients about portfolio performance.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Offer Seamless Digital Solutions Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                            Offer Seamless Digital Solutions
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed mb-6">
                                In today's tech-driven world, integrating digital tools into your mfd business is essential. Clients expect seamless processes for onboarding, investment tracking, and reporting.
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                How Digital Tools Can Help Grow Your Business:
                            </h3>
                            <ul className="space-y-4 list-disc list-inside text-sm md:text-base text-neutral-700 leading-relaxed">
                                <li>Simplify KYC processes for faster client onboarding.</li>
                                <li>Use portfolio management platforms to provide real-time updates.</li>
                                <li>Maintain regular communication to update clients about portfolio performance.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Focus on SIPs to Ensure Steady Growth Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                            Focus on SIPs to Ensure Steady Growth
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed mb-6">
                                Promoting Systematic Investment Plans (SIPs) is a proven way to grow your MFD business. SIPs encourage clients to invest regularly, ensuring a steady inflow of funds for both the client and MFD.
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                Benefits of Focusing on SIPs:
                            </h3>
                            <ul className="space-y-4 list-disc list-inside text-sm md:text-base text-neutral-700 leading-relaxed">
                                <li>Builds a long-term relationship with clients.</li>
                                <li>Ensures consistent MFD commissions for MFDs.</li>
                                <li>SIPs are easy to explain and help clients understand the power of compounding.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diversify Your Offerings Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                            Diversify Your Offerings
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed mb-6">
                                Clients appreciate MFDs who provide comprehensive solutions. By offering multiple investment options like tax-saving funds, debt funds, and diversified equity funds, you can maximize your MFD income.
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                Suggestions to Diversify Portfolios:
                            </h3>
                            <ul className="space-y-4 list-disc list-inside text-sm md:text-base text-neutral-700 leading-relaxed">
                                <li>Recommend ELSS funds for clients looking to save taxes while earning market-linked returns.</li>
                                <li>Offer debt funds for conservative investors seeking stable returns.</li>
                                <li>Promote hybrid funds for balanced risk and reward.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Build Strong Relationships with Clients Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                            Build Strong Relationships with Clients
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed mb-6">
                            Long-term growth in the MFD business relies on client retention. Offering exceptional service and goal specific recommendations ensures client loyalty.
                            </p>
                            <ul className="space-y-4 list-disc list-inside text-sm md:text-base text-neutral-700 leading-relaxed">
                                <li>Communicate regularly about market updates and portfolio performance.</li>
                                <li>Resolve client queries promptly and professionally.</li>
                                <li>Celebrate milestones such as achieving financial goals or long-term investment anniversaries.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stay Updated with Industry Trends Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                            Stay Updated with Industry Trends
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                            The mutual fund industry is constantly evolving. To stay ahead, keep yourself informed about market trends, new mutual fund launches, and regulatory updates. This knowledge positions you as a trusted MFD in the eyes of your clients.                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leverage Technology Like Nivesh Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                            Leverage Technology Like Nivesh
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed mb-6">
                                Using a platform like Nivesh can significantly enhance the growth of your MFD business by providing:
                            </p>
                            <ul className="space-y-4 list-disc list-inside text-sm md:text-base text-neutral-700 leading-relaxed">
                                <li>Instant client onboarding.</li>
                                <li>Automated KYC processes.</li>
                                <li>Real-time portfolio tracking and reporting.</li>
                                <li>Tools to manage multiple clients efficiently.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scale Your MFD Business Strategically With NIVESH Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                            Scale Your MFD Business Strategically With NIVESH
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200 space-y-4">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                Growing your MFD business requires a combination of personalized service, smart marketing, and effective use of technology. By focusing on client satisfaction, offering value-added services, and leveraging digital tools, you can position yourself as a leading AMFI MFD and achieve long-term success.
                            </p>
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                Start implementing these growth strategies today to expand your client base, increase your MFD income, and build a thriving business!
                            </p>
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                Take the first step to growing your business today with platforms like Nivesh, and position yourself as a leader in the MFD industry!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why MFDs Need a Platform Now Section */}
            {/* <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Why MFDs Need a Platform Now
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {[
                                {
                                    title: 'Digital Transformation',
                                    description: 'The financial services industry is rapidly moving towards digitalization. MFDs need modern platforms to stay competitive and meet evolving client expectations.',
                                },
                                {
                                    title: 'Operational Efficiency',
                                    description: 'Manual processes are time-consuming and error-prone. A digital platform streamlines operations, reduces paperwork, and increases productivity.',
                                },
                                {
                                    title: 'Client Expectations',
                                    description: 'Today\'s clients expect seamless digital experiences, real-time portfolio tracking, and instant transactions. A platform enables you to meet these expectations.',
                                },
                                {
                                    title: 'Scalability',
                                    description: 'Growing your business requires scalable solutions. A platform allows you to manage more clients efficiently without proportionally increasing your workload.',
                                },
                                {
                                    title: 'Compliance & Security',
                                    description: 'Regulatory compliance and data security are critical. A robust platform ensures you meet all requirements while protecting client information.',
                                },
                                {
                                    title: 'Competitive Advantage',
                                    description: 'MFDs using advanced platforms can offer better services, faster response times, and superior client experiences, giving them a significant edge.',
                                },
                            ].map((reason, index) => (
                                <div
                                    key={index}
                                    className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <h3 className="text-lg md:text-xl font-bold text-[#243062] mb-3">
                                        {reason.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                        {reason.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section> */}

            
            

            {/* Grow Digitally with Nivesh: Paperless Solutions Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                                Grow Digitally with Nivesh: Paperless Solutions for MFDs
                            </h2>
                            <p className="text-base md:text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
                                Nivesh provides your MFD industry with a 100% digital, paperless platform that is perfectly suited for efficiency, compliance, and customer happiness. Here's how:
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {[
                                {
                                    number: '1',
                                    title: 'Unlock the Power of Paperless Investment',
                                    description: 'Transform your investment processes with a fully digital platform for fast, eco-friendly decisions without physical documents.',
                                },
                                {
                                    number: '2',
                                    title: 'Efficient Digital Fund Management',
                                    description: 'Control client mutual fund investments through a digital-first system, offering real-time updates and smooth management.',
                                },
                                {
                                    number: '3',
                                    title: 'Simplified Paperless Client Onboarding',
                                    description: 'Smooth onboarding with fully digital KYC and registration, eliminating paperwork and delays.',
                                },
                                {
                                    number: '4',
                                    title: 'No Paperwork, Just Results',
                                    description: 'A paperless business model from onboarding to transactions, streamlining processes to reduce human error and improve operational efficiency.',
                                },
                                {
                                    number: '5',
                                    title: 'Quick, Digital KYC Process',
                                    description: 'Fast and secure KYC completion via the digital platform, avoiding delays and ensuring secure, eco-friendly digital storage of client data.',
                                },
                                {
                                    number: '6',
                                    title: 'Track Investments Anytime, Anywhere',
                                    description: 'Access and manage client portfolios on the go, with paperless statements and real-time access to mutual fund statements and portfolio progress from any device.',
                                },
                                {
                                    number: '7',
                                    title: 'Go Paperless, Go Green',
                                    description: 'Business sustainability through paperless transactions and reduced waste, helping clients invest smarter and supporting a green environment.',
                                },
                                {
                                    number: '8',
                                    title: 'Real-Time Paperless Reporting',
                                    description: 'Instant access to investment summaries, performance reports, and consolidated mutual fund statements without physical reports.',
                                },
                                {
                                    number: '9',
                                    title: 'Seamless Digital Communication',
                                    description: 'Effective client and partner engagement through paperless digital communication, facilitating quick sharing of reports and investment advice.',
                                },
                                {
                                    number: '10',
                                    title: 'Transform Your Business with Paperless Transactions',
                                    description: 'Switch to paperless transactions to streamline the entire business model, from distribution to client transactions, for smooth operation without paper clutter.',
                                },
                                {
                                    number: '11',
                                    title: 'Secure, Paperless Documentation',
                                    description: 'Secure digital storage of all client and transaction documents, eliminating the risk of loss and making everything easily accessible for efficient organization.',
                                },
                                {
                                    number: '12',
                                    title: 'Reduce Operational Costs with Paperless Solutions',
                                    description: 'Digital operations cut costs associated with printing, paperwork, and mailing, allowing resource allocation for business growth and customer satisfaction.',
                                },
                                {
                                    number: '13',
                                    title: 'Real-Time Digital Fund Tracking',
                                    description: 'Monitor mutual fund investments and performance with real-time, paperless portfolio tracking.',
                                },
                                {
                                    number: '14',
                                    title: 'Seamless Digital Transactions',
                                    description: 'Make quick and secure mutual fund transactions using the paperless platform.',
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-[#243062] text-white rounded-lg flex items-center justify-center font-bold text-lg">
                                            {item.number}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-xl font-bold text-[#243062] mb-3 leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Built for MFDs Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Key Features Built for MFDs
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
                            Powerful tools and features designed specifically to help MFDs grow their business
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                title: 'Client Onboarding',
                                description: 'Streamlined digital onboarding process with e-KYC, reducing time from days to minutes.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Portfolio Management',
                                description: 'Comprehensive portfolio tracking, analysis, and rebalancing tools for better client service.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Transaction Management',
                                description: 'Seamless transaction processing for SIPs, lumpsum investments, redemptions, and switches.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Analytics & Reports',
                                description: 'Advanced analytics and customizable reports to track performance and make data-driven decisions.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Commission Tracking',
                                description: 'Real-time commission tracking and automated payouts to ensure transparency and timely payments.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Marketing Tools',
                                description: 'Built-in marketing tools, templates, and lead generation features to help you grow your client base.',
                                icon: (
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                    </svg>
                                ),
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-[#243062] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Real Growth, Real Stories Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Real Growth, Real Stories
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
                            Discover how MFDs are transforming their businesses with Nivesh
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                name: 'Rajesh Panwar',
                                story: 'I was running a Vodafone outlet. Due to dengue, I couldn\'t work for a month because of which I didn\'t get any payout in that period. I realized that even if I continue to work in the same business for the next 10 years, I could fall into the same situation. Hence, I was looking for a business that can secure my future. At this time, I met Nivesh.com and learned about Mutual Funds. Today, thanks to Nivesh.com, I have achieved fast-paced growth and can boast of having the highest number of clients with them.',
                            },
                            {
                                name: 'Abhimanyu Nehra',
                                story: 'Abhimanyu has been an entrepreneur in the hospitality and real estate sectors based out of Delhi NCR. He had been thinking about the need of taking other asset classes to his clients. After coming in touch with Nivesh.com, he carefully evaluated the option and clearly saw the benefit of being part of a larger platform and great leverage of technology that Nivesh.com offered. Since then, he has been able to help his customers diversify into mutual funds in a much simpler manner.',
                            },
                            {
                                name: 'Yashwant Gupta',
                                story: 'From traveling in buses to Jaipur and haggling with Mutual Funds companies for collecting clients\' statements to sitting in the comfort of my home and managing all the transactions in a few clicks on my phone, I have come a long way. All thanks to Nivesh. There was a time when I was forced to stop the SIPs of my hard-earned customers as it was impossible to service them given the paperwork. Nivesh came as a one-stop solution for all the problems and made investing a cake walk for me and my customers.',
                            },
                        ].map((story, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 md:p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="mb-4">
                                    <svg className="w-8 h-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-3.312.817-5.996 3.549-5.996 7.849 0 2.857 1.158 5.143 3.369 6.571l-1.748 1.429zm-10.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-3.313.817-5.996 3.549-5.996 7.849 0 2.857 1.158 5.143 3.369 6.571l-1.748 1.429z"/>
                                    </svg>
                                </div>
                                <p className="text-sm md:text-base text-neutral-700 leading-relaxed mb-4">
                                    "{story.story}"
                                </p>
                                <p className="text-base md:text-lg font-bold text-[#243062]">
                                    - {story.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scale Your Brand with Nivesh Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Scale Your Brand with Nivesh
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {[
                                {
                                    title: 'Brand Visibility',
                                    description: 'Enhance your brand presence with white-label solutions and custom branding options that reflect your professional identity.',
                                },
                                {
                                    title: 'Marketing Support',
                                    description: 'Access to marketing materials, social media templates, and promotional content to help you reach more clients.',
                                },
                                {
                                    title: 'Lead Generation',
                                    description: 'Leverage Nivesh\'s marketing channels and lead generation tools to expand your client base and grow your business.',
                                },
                                {
                                    title: 'Professional Image',
                                    description: 'Present a professional, tech-forward image to clients with a modern platform that showcases your expertise and reliability.',
                                },
                            ].map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <h3 className="text-lg md:text-xl font-bold text-[#243062] mb-3">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why MFDs Choose Nivesh Section */}
            {/* <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Why MFDs Choose Nivesh
                        </h2>
                        <div className="space-y-6">
                            {[
                                {
                                    title: 'Comprehensive Platform',
                                    description: 'Everything you need in one place - from client onboarding to portfolio management, all integrated seamlessly.',
                                },
                                {
                                    title: 'Dedicated Support',
                                    description: 'Get personalized support from our team of experts who understand your business and are committed to your success.',
                                },
                                {
                                    title: 'Competitive Commissions',
                                    description: 'Attractive commission structure with transparent tracking and timely payouts to maximize your earnings.',
                                },
                                {
                                    title: 'Continuous Innovation',
                                    description: 'Regular platform updates and new features based on MFD feedback, ensuring you always have the latest tools.',
                                },
                                {
                                    title: 'Training & Development',
                                    description: 'Ongoing training programs, webinars, and resources to help you stay updated and grow your expertise.',
                                },
                                {
                                    title: 'Trusted by Thousands',
                                    description: 'Join a community of thousands of successful MFDs who trust Nivesh for their business growth and client management.',
                                },
                            ].map((reason, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 md:p-8 border border-neutral-200 shadow-sm"
                                >
                                    <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                        {reason.title}
                                    </h3>
                                    <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                        {reason.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Partner Success Story Video Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Esteemed Partner Mr. Yuktarth Shrivastava Shares His Growth Journey with Nivesh
                        </h2>
                        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-neutral-100 overflow-hidden">
                            <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={convertYouTubeUrlToEmbed('https://www.youtube.com/watch?v=aYFjr7EvtQc') || ''}
                                    title="Partner Success Story: How Mr. Yuktarth Shrivastava Grew His Business"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
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

            <Testimonials variant="default" />

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

                        <form noValidate onSubmit={handleModalFormSubmit} className="p-4 md:p-8 pt-10 md:pt-12">
                            <h2 className="text-base md:text-2xl font-bold text-neutral-800 mb-4 md:mb-6 pr-8">
                                Fill the Form to Know More!
                            </h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Enter Full Name"
                                    value={modalFormData.fullName}
                                    onChange={(e) => setModalFormData({ ...modalFormData, fullName: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                                <input
                                    type="email"
                                    placeholder="Enter Email ID"
                                    value={modalFormData.email}
                                    onChange={(e) => setModalFormData({ ...modalFormData, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                                <input
                                    type="tel"
                                    placeholder="Enter Mobile Number"
                                    value={modalFormData.mobile}
                                    onChange={(e) => setModalFormData({ ...modalFormData, mobile: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                                />

                                <div className="pt-2">
                                    <p className="text-sm font-bold text-neutral-800 mb-3">Currently, you are an</p>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="modalHolderType"
                                                value="arnHolder"
                                                checked={modalFormData.holderType === 'arnHolder'}
                                                onChange={(e) => setModalFormData({ ...modalFormData, holderType: e.target.value as 'arnHolder' })}
                                                className="w-4 h-4 text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-neutral-700">ARN Holder</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="modalHolderType"
                                                value="nonArnHolder"
                                                checked={modalFormData.holderType === 'nonArnHolder'}
                                                onChange={(e) => setModalFormData({ ...modalFormData, holderType: e.target.value as 'nonArnHolder' })}
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
                                            checked={modalFormData.getInfo}
                                            onChange={(e) => setModalFormData({ ...modalFormData, getInfo: e.target.checked })}
                                            className="w-4 h-4 mt-1 text-primary focus:ring-primary"
                                        />
                                        <span className="text-xs text-neutral-600 leading-relaxed">
                                            I would like to get information on products, investment options via WhatsApp, Email, SMS, phone from Nivesh
                                        </span>
                                    </label>
                                </div>

                                {modalSubmitError && <p className="text-sm text-red-600">{modalSubmitError}</p>}

                                <button
                                    type="submit"
                                    disabled={modalSubmitLoading}
                                    className="w-full bg-[#243062] hover:bg-[#1a2347] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {modalSubmitLoading ? 'Submitting...' : 'I Would Like To Know More'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GrowYourMutualFund;

