import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Favicon from '../../assets/Favicon.png';
import PersonImage from '../../assets/Person.webp';
import GraphImage from '../../assets/graph.webp';
import { fetchFAQs, type FAQ } from '../../services/api';
import { API_LEAD_PARTNER, PARTNER_ONBOARDING_URL } from '../../config/api';
import { getLeadSource } from '../../utils/leadSource';

const PAGE_SOURCE = 'Partner';

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

const testimonialsData = [
    {
        quote: 'Abhimanyu has been an entrepreneur in the hospitality and real estate sectors based out of Delhi NCR. He had been thinking about the need of taking other asset classes to his clients, as he realized over-exposure to one asset class could pose a significant risk to him and his customers. He was aware of Mutual Funds but was not sure of how to get started. After coming in touch with Nivesh.com, he carefully evaluated the option of dealing with Nivesh.com versus directly with mutual funds and clearly saw the benefit of being part of a larger platform and great leverage of technology that Nivesh.com offered. He then spent some time trying to understand the basics of mutual fund investing and also obtained an AMFI Registration Number (ARN). Since then, he has been able to help his customers diversify into mutual funds in a much simpler manner leveraging the state of the art technology. He is clear that he is into this for the long term.',
        author: 'Abhimanyu Nehra',
        role: '',
    },
    {
        quote: 'I was running a Vodafone outlet. Due to dengue, I couldn\'t work for a month because of which I didn\'t get any payout in that period. I realized that even if I continue to work in the same business for the next 10 years, I could fall into the same situation. Hence, I was looking for a business that can secure my future. At this time, I met Nivesh.com and learned about Mutual Funds. I understood that once I could build a sizeable AUM, I would continue to earn a trial commission even if I am unable to work at some point in the future. Today, thanks to Nivesh.com, I have achieved fast-paced growth and can boast of having the highest number of clients with them.',
        author: 'Rajesh Panwar',
        role: '',
    },
    {
        quote: 'Nivesh has changed the way I have been investing my money, they have educated me & facilitated investments into a totally new investment class for me, Mutual Funds. Having interacted with their able team, I have grown in my conviction about the merits of investing in MF\'s and also benefited adequately over a period of time. Happy to recommend them to all those who are looking out for the opportunities and avenues to invest their money and see it grow.',
        author: 'Dhananjay Chaturvedi',
        role: 'Evangelist, Thinker, Consultant Formerly Managing Director, Miele India',
    },
    {
        quote: 'Amazing platform to invest in Mutual Funds. I have been thinking about investing for a long time but not sure how to start. I have been using the Nivesh app for a very long time and I realized it\'s very simple and safe',
        author: 'Shashi',
        role: 'Insurance Advisor based at Faridabad',
    },
    {
        quote: 'I\'m a 62-year-old Financial Advisor, working in the Mutual Funds Industry for the past 20 years. In 2017, I started working from home. With a huge customer base, I had to commute all day for collecting the client\'s documents. At the end of each day I thought "Till when will I continue working like this!"',
        author: 'Gokul Prasad Yadav',
        role: '',
    },
    {
        quote: 'I have a habit of saving money from the time I got my job. I was keeping this money either in my savings account or through recurring deposits. I heard about mutual funds but was not confident how to start. When I met Nivesh advisor I was amazed to know that I can invest through a mobile app and can track the portfolio',
        author: 'Ajay Mandal',
        role: 'Technician at Tata Sky',
    },
    {
        quote: 'I was actually exploring someone who can help me to save tax under section 80C. I read in the newspaper that I should invest in ELSS but I was not sure how to do that. It was very simple to invest under 80C through Nivesh and later also started SIP through the app.',
        author: 'Amit Malhotra',
        role: 'Manger with leading Health Insurance Company',
    },
    {
        quote: 'From traveling in buses to Jaipur and haggling with Mutual Funds companies for collecting clients\' statements to sitting in the comfort of my home and managing all the transactions in a few clicks on my phone, I have come a long way All thanks to Nivesh. There was a time when I was forced to stop the SIPs of my hard-earned customers as it was impossible to service them given the paperwork that required a lot of commuting and expenses. For every customer\'s KYC, I had to go to a cybercafé, pay Rs 10 and get a printout. Then the choice of funds was a complex issue. To make it worse, it was a herculean task to track my brokerage as it was coming from various places. Nivesh came as a one-stop solution for all the problems and made investing a cake walk for me and my customers',
        author: 'Yashwant Gupta',
        role: '',
    },
];

const Partner: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
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
    const [expandedTestimonials, setExpandedTestimonials] = useState<{ [key: number]: boolean }>({});
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);

    const toggleFaq = (index: number) => {
        setOpenFaqs((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const nextProduct = () => {
        setCurrentProductIndex((prev) => (prev + 1) % products.length);
    };

    const prevProduct = () => {
        setCurrentProductIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setSubmitLoading(true);
        const source = getLeadSource(PAGE_SOURCE);
        const campaign = getUtmParam('utm_campaign');
        const content = getUtmParam('utm_content');
        const medium = getUtmParam('utm_medium');
        const payload = {
            Name: formData.fullName,
            PhoneNo: formData.mobile,
            Email: formData.email,
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

    const toggleTestimonial = (index: number) => {
        setExpandedTestimonials((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
        }, 5000); // Auto-scroll every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Fetch FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFaqs(true);
                const allFaqs = await fetchFAQs();
                // Filter FAQs by category "partner"
                const partnerFaqs = allFaqs.filter(faq => 
                    faq.category?.toLowerCase() === 'partner'
                );
                setFaqs(partnerFaqs);
            } catch (error) {
                console.error('Error loading FAQs:', error);
                setFaqs([]);
            } finally {
                setLoadingFaqs(false);
            }
        };

        loadFAQs();
    }, []);

    const products = [
        {
            name: 'Home Loan',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
        },
        {
            name: 'Mutual Funds',
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
        },
        {
            name: 'Fixed Deposits',
            image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
        },
        {
            name: 'Insurance',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
        },
        {
            name: 'PMS',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        },
        {
            name: 'Bonds',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-12 md:py-20 overflow-hidden" style={{
                background: 'linear-gradient(to right, #FFE5E5, #E8D5FF, #C4A3FF)'
            }}>
                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-sm mb-2 mt-6">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                            Home
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500">Be A Nivesh Partner</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Column - Person Image and Text */}
                        <div className="relative z-10">
                            <div className="flex flex-col items-start">
                                {/* Text Content */}
                                <div className="mb-6">
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-neutral-800 mb-2 leading-tight">
                                        Empower yourself with
                                    </h1>
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-neutral-800 leading-tight">
                                        emerging technologies
                                    </h1>
                                </div>
                                
                                {/* Person Image */}
                                <div className="w-full flex justify-start">
                                    <div className="relative">
                                        <img
                                            src={PersonImage}
                                            alt="Business Professional"
                                            className="w-56 md:w-72 lg:w-32 h-auto object-contain rounded-lg"
                                        />
                                    </div>
                                </div>
                                
                                {/* CTA Button */}
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => window.open('https://lead.nivesh.com/i-am-a-distributor/?utm_campaign=PartnerOnboarding', '_blank')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold"
                                >
                                    Be A Partner For Free
                                </Button>
                            </div>
                        </div>

                        {/* Right Column - Phone Mockup with Form */}
                        <div className="relative z-10 flex justify-center lg:justify-end">
                            <div className="relative transform -rotate-6 lg:-rotate-3">
                                {/* Phone Frame */}
                                <div className="relative w-72 md:w-80 lg:w-96 h-[500px] md:h-[600px]">
                                    {/* Phone Outer Frame */}
                                    <div className="absolute inset-0 bg-black rounded-[3.5rem] p-1 shadow-2xl">
                                        {/* Phone Screen */}
                                        <div className="w-full h-full bg-white rounded-[3rem] overflow-hidden relative">
                                            {/* Phone Notch */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>
                                            
                                            {/* Form Content or Success Message */}
                                            <div className="relative z-10 p-6 pt-8 h-full overflow-y-auto">
                                        {submitSuccess ? (
                                            <div className="text-center py-6">
                                                <div className="inline-flex w-12 h-12 rounded-full bg-green-100 text-primary items-center justify-center mb-4 mx-auto">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                                <h2 className="text-lg font-bold text-neutral-800 mb-2">Thank you!</h2>
                                                <p className="text-neutral-600 text-sm">We have received your details. Our team will get in touch with you shortly.</p>
                                            </div>
                                        ) : (
                                        <form onSubmit={handleFormSubmit} className="space-y-3">
                                            {/* Logo */}
                                            <div className="flex justify-center mb-3">
                                                <img src={Favicon} alt="Nivesh" className="w-8 h-8" />
                                            </div>
                                            
                                            {/* Title */}
                                            <div className="text-center mb-4">
                                                <h3 className="text-base md:text-lg font-serif font-bold text-neutral-800 mb-0.5">
                                                    It's a Great Opportunity
                                                </h3>
                                                <h3 className="text-base md:text-lg font-serif font-bold text-neutral-800">
                                                    Let's Connect!
                                                </h3>
                                            </div>
                                            
                                            {/* Input Fields */}
                                            <input
                                                type="text"
                                                placeholder="Enter Full Name"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                required
                                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                                            />
                                            
                                            <input
                                                type="email"
                                                placeholder="Enter Email-ID"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                                            />
                                            
                                            <input
                                                type="tel"
                                                placeholder="Enter Mobile Number"
                                                value={formData.mobile}
                                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                                            />
                                            
                                            {/* Radio Buttons */}
                                            <div className="pt-1">
                                                <div className="text-center mb-2">
                                                    <p className="text-sm font-serif font-bold text-neutral-800">
                                                        Currently, you are an
                                                    </p>
                                                </div>
                                                <div className="space-y-2">
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
                                            
                                            {/* Checkbox */}
                                            <div className="pt-1">
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

                                            {submitError && (
                                                <p className="text-sm text-red-600 mt-2">{submitError}</p>
                                            )}
                                            
                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={submitLoading}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm transition-colors duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {submitLoading ? 'Submitting...' : 'Submit'}
                                            </button>
                                        </form>
                                        )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wavy Lines at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-0">
                    <svg className="w-full h-20 md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="white">
                        <path d="M0,60 Q360,20 720,60 T1440,60 L1440,120 L0,120 Z"></path>
                    </svg>
                    <svg className="w-full h-16 md:h-20 -mt-4" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="white" opacity="0.9">
                        <path d="M0,50 Q360,10 720,50 T1440,50 L1440,100 L0,100 Z"></path>
                    </svg>
                </div>
            </section>

            {/* Grow your Financial Business with Nivesh Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                            Grow your Financial Business with Nivesh
                        </h2>
                        <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-8">
                            Nivesh provides independent financial advisors and MFDs with a comprehensive digital platform to grow their business, manage client relationships, and offer a wide range of financial products. Join thousands of partners who trust Nivesh to power their financial advisory business.
                        </p>
                        {/* Graph Image */}
                        <div className="mt-8 flex justify-center">
                            <img
                                src={GraphImage}
                                alt="Business Growth Graph"
                                className="w-full max-w-4xl h-auto object-contain rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Discover the Best Online MFD Platform Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                            Discover the Best Online MFD Platform – Go Digital with Nivesh Today
                        </h2>
                        <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-8">
                            Transform your MFD business with Nivesh's cutting-edge technology platform. Our digital-first approach helps you serve clients better, scale your operations, and grow your Assets Under Management (AUM) efficiently.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                {
                                    title: 'Digital Platform',
                                    description: 'Complete digital infrastructure for managing your MFD business.',
                                },
                                {
                                    title: 'Client Management',
                                    description: 'Advanced tools to manage client relationships and portfolios effectively.',
                                },
                                {
                                    title: 'Growth Tools',
                                    description: 'Powerful analytics and insights to help you grow your AUM.',
                                },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg border border-neutral-100 transition-all duration-300"
                                >
                                    <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Wide range of Financial Products Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                                Wide range of Financial Products
                            </h2>
                            <div className="space-y-4 text-base md:text-lg text-neutral-700 leading-relaxed">
                                <p>
                                    Nivesh fulfills client needs by providing multiple product options, helping MFDs expand their business through cross-selling and up-selling.
                                </p>
                                <p>
                                    Nivesh's online software makes investment easy and efficient, positioning Nivesh as <strong className="text-[#243062] font-bold">India's best MFD platform</strong> that centralizes mutual fund investment solutions.
                                </p>
                                <p>
                                    AMFI-registered MFDs can act in clients' best interest and scale their business easily, with access to products like Corporate FDs, Bonds, PMS, and AIFs for cross-selling and up-selling without revenue limitations.
                                </p>
                                <p>
                                    The platform is intuitive, user-friendly, and simplifies the entire investment journey.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Product Carousel */}
                        <div className="relative">
                            <div className="relative overflow-visible">
                                {/* Carousel Container */}
                                <div className="flex items-center justify-center px-8 md:px-12">
                                    {products.map((product, index) => {
                                        const isActive = index === currentProductIndex;
                                        const isPrev = index === (currentProductIndex - 1 + products.length) % products.length;
                                        const isNext = index === (currentProductIndex + 1) % products.length;
                                        const isVisible = isActive || isPrev || isNext;

                                        if (!isVisible) return null;

                                        return (
                                            <div
                                                key={index}
                                                className={`transition-all duration-500 ease-in-out ${
                                                    isActive
                                                        ? 'flex-shrink-0 w-full md:w-[250px] scale-100 z-10'
                                                        : isPrev
                                                        ? 'flex-shrink-0 w-full md:w-[250px] scale-90 -ml-4 md:-mr-24'
                                                        : 'flex-shrink-0 w-full md:w-[250px] scale-90 -mr-4 md:-ml-24'
                                                }`}
                                            >
                                                <div className="bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                                    {/* Product Image */}
                                                    <div className={`w-full  overflow-hidden ${
                                                        isActive ? 'h-48 md:h-56' : 'h-36 md:h-40'
                                                    }`}>
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    {/* Product Content */}
                                                    <div className={`${isActive ? 'p-6' : 'p-4'}`}>
                                                        <h3 className={`font-bold text-[#243062] mb-4 text-center ${
                                                            isActive ? 'text-lg md:text-xl' : 'text-sm md:text-base'
                                                        }`}>
                                                            {product.name}
                                                        </h3>
                                                        <Button
                                                            variant="primary"
                                                            size={isActive ? "md" : "sm"}
                                                            onClick={() => window.open('https://app.nivesh.com', '_blank')}
                                                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                                                        >
                                                            Know More
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevProduct}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-200/80 hover:bg-neutral-300 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-20"
                                    aria-label="Previous product"
                                >
                                    <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextProduct}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-200/80 hover:bg-neutral-300 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-20"
                                    aria-label="Next product"
                                >
                                    <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Carousel Indicators */}
                            <div className="flex justify-center gap-2 mt-8">
                                {products.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentProductIndex(index)}
                                        className={`h-2 rounded-full transition-all duration-200 ${
                                            index === currentProductIndex
                                                ? 'bg-[#243062] w-8'
                                                : 'bg-neutral-300 w-2'
                                        }`}
                                        aria-label={`Go to product ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* We Don't Target Individuals, We Target Families Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            We Don't Target Individuals, We Target Families
                        </h2>
                        
                        {/* Family Grid Table */}
                        <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    {/* Header Row */}
                                    <thead>
                                        <tr className="bg-neutral-50">
                                            <th className="border border-neutral-300 p-4 text-left font-serif font-bold text-[#243062] text-base md:text-lg">
                                                An Indian Family members of 3 generation
                                            </th>
                                            <th className="border border-neutral-300 p-4 text-center font-serif font-bold text-[#243062] text-sm md:text-base">
                                                Mutual Fund
                                            </th>
                                            <th className="border border-neutral-300 p-4 text-center font-serif font-bold text-[#243062] text-sm md:text-base">
                                                Fixed Income
                                            </th>
                                            <th className="border border-neutral-300 p-4 text-center font-serif font-bold text-[#243062] text-sm md:text-base">
                                                Insurance
                                            </th>
                                            <th className="border border-neutral-300 p-4 text-center font-serif font-bold text-[#243062] text-sm md:text-base">
                                                <div>Others</div>
                                                <div className="text-xs md:text-sm text-neutral-600 font-normal mt-1">
                                                    (NPS, PMS, AIF, Loans, Gold, NCDs/Bonds, Peer to Peer Lending - P2P)
                                                </div>
                                            </th>
                                        </tr>
                                       
                                    </thead>
                                    <tbody>
                                        {/* Row 1: 45Y Businessman and 42Y School Teacher - Both with all 4 checkmarks */}
                                        <tr className="hover:bg-neutral-50">
                                            <td className="border border-neutral-300 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13v-2a1 1 0 00-1-1h-1a1 1 0 00-1 1v2a1 1 0 001 1h1a1 1 0 001-1z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13v-2a1 1 0 011-1h1a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-serif text-sm md:text-base text-neutral-800">45Y Businessman</span>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50">
                                            <td className="border border-neutral-300 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-serif text-sm md:text-base text-neutral-800">42Y School Teacher</span>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        {/* Row 2: 18Y College (first 3 checkmarks, not Others) and 8Y School (no checkmarks) */}
                                        <tr className="hover:bg-neutral-50">
                                            <td className="border border-neutral-300 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21V5a2 2 0 012-2h2a2 2 0 012 2v16" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-serif text-sm md:text-base text-neutral-800">18Y College</span>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-neutral-200"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50">
                                            <td className="border border-neutral-300 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-serif text-sm md:text-base text-neutral-800">8Y School</span>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-neutral-200"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        {/* Row 3: 70Y Retired and 65Y Housewife - Both with Fixed Income and Insurance only */}
                                        <tr className="hover:bg-neutral-50">
                                            <td className="border border-neutral-300 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-serif text-sm md:text-base text-neutral-800">70Y Retired</span>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-neutral-200"></div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-neutral-200"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-neutral-50">
                                            <td className="border border-neutral-300 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-serif text-sm md:text-base text-neutral-800">65Y Housewife</span>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-neutral-200"></div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-600 flex items-center justify-center">
                                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border border-neutral-300 p-4 text-center">
                                                <div className="flex justify-center">
                                                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-neutral-200"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Become Part of Our Family & Enjoy Benefits Like Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#243062] mb-4 leading-tight">
                            Become Part of Our Family & Enjoy Benefits Like
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[
                            {
                                text: 'Work With A Digital Ecosystem, Not Just A Platform',
                                icon: (
                                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                            {
                                text: 'Transform Your Offline Office To Virtual Office',
                                icon: (
                                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                ),
                            },
                            {
                                text: 'Paperless Experience For Both MFDs And Clients',
                                icon: (
                                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 2v4a1 1 0 001 1h4" />
                                    </svg>
                                ),
                            },
                            {
                                text: 'Portfolio Reviews And Restructuring As Per Your Client\'s Requirements',
                                icon: (
                                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                ),
                            },
                            {
                                text: 'Save Time With Our Research-driven Reports And Recommendations',
                                icon: (
                                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                                    </svg>
                                ),
                            },
                            {
                                text: 'Customized And Personalized Marketing Content To Boost Your Customer Outreach',
                                icon: (
                                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20M2 12h20" />
                                    </svg>
                                ),
                            },
                            {
                                text: 'Hassle-free Google Listing To Improve Your Visibility In Your Area',
                                icon: (
                                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                    </svg>
                                ),
                            },
                            {
                                text: 'Skill-building Sessions From Experts To Empower You To Scale Your Business',
                                icon: (
                                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                ),
                            },
                            {
                                text: 'Relationship Managers To Navigate Your Path To Success',
                                icon: (
                                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ),
                            },
                            {
                                text: 'Uncompromised Safety And Privacy',
                                icon: (
                                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                            },
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 flex items-center justify-center mb-4 flex-shrink-0">
                                    {benefit.icon}
                                </div>
                                <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-sans">
                                    {benefit.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What Our Partners Say Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            What Our Partners Say
                        </h2>
                    </div>
                    
                    {/* Carousel Container */}
                    <div className="relative overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
                        >
                            {testimonialsData.map((testimonial, index) => {
                                const isExpanded = expandedTestimonials[index];
                                const shouldTruncate = testimonial.quote.length > 200;
                                
                                return (
                                    <div
                                        key={index}
                                        className="min-w-full flex-shrink-0 px-4"
                                    >
                                        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg border border-neutral-100 transition-all duration-300 max-w-4xl mx-auto">
                                            <div className="mb-4">
                                                <svg className="w-8 h-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                                </svg>
                                            </div>
                                            <p 
                                                className={`text-sm md:text-base text-neutral-700 leading-relaxed mb-4 ${
                                                    shouldTruncate && !isExpanded 
                                                        ? 'line-clamp-4' 
                                                        : ''
                                                }`}
                                            >
                                                "{testimonial.quote}"
                                            </p>
                                            {shouldTruncate && (
                                                <button
                                                    onClick={() => toggleTestimonial(index)}
                                                    className="text-primary hover:text-primary-dark font-medium text-sm mb-4 transition-colors duration-200"
                                                >
                                                    {isExpanded ? 'Read less' : 'Read more'}
                                                </button>
                                            )}
                                            <div>
                                                <p className="font-semibold text-[#243062]">{testimonial.author}</p>
                                                {testimonial.role && (
                                                    <p className="text-sm text-neutral-600">{testimonial.role}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonialsData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonialIndex(index)}
                                className={`h-2 rounded-full transition-all duration-200 ${
                                    index === currentTestimonialIndex
                                        ? 'bg-[#243062] w-8'
                                        : 'bg-neutral-300 w-2'
                                }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features of Nivesh Online MFD Platform Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Features of Nivesh Online MFD Platform
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[
                            {
                                title: 'Client Portfolio Management',
                                description: 'Comprehensive tools to manage and track client portfolios.',
                            },
                            {
                                title: 'Real-time Analytics',
                                description: 'Get real-time insights into your business performance.',
                            },
                            {
                                title: 'Automated Transactions',
                                description: 'Streamlined transaction processing and settlement.',
                            },
                            {
                                title: 'Compliance Management',
                                description: 'Stay compliant with all regulatory requirements.',
                            },
                            {
                                title: 'Mobile App Access',
                                description: 'Manage your business on-the-go with our mobile app.',
                            },
                            {
                                title: 'Client Communication',
                                description: 'Built-in tools for seamless client communication.',
                            },
                            {
                                title: 'Document Management',
                                description: 'Secure storage and management of client documents.',
                            },
                            {
                                title: 'Reporting Tools',
                                description: 'Comprehensive reporting and analytics dashboard.',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-neutral-50 rounded-xl p-6 md:p-8 hover:bg-white hover:shadow-lg border border-neutral-100 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-[#243062] rounded-lg flex items-center justify-center text-white mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-[#243062] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner Interview Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                        Our Elite Partner Mr. Atul Naval Shares His Growth Journey with Nivesh
                        </h2>
                        
                        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-neutral-100 overflow-hidden">
                            <div className="aspect-video rounded-xl overflow-hidden">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/8h56Qmr5lX8?start=5"
                                    title="Partner Interview"
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
            <section className="py-12 md:py-20 bg-white">
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
                                        className="bg-neutral-50 rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-transparent border-none outline-none cursor-pointer hover:bg-white transition-colors duration-200"
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
                                                    <div className="text-sm md:text-base text-neutral-700 leading-relaxed prose prose-sm max-w-none mb-3" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                                )}
                                                <a
                                                    href="https://nivesh.com/en/partner"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm md:text-base text-primary hover:text-primary-dark font-medium cursor-pointer inline-block mt-4"
                                                >
                                                    Click here to join Nivesh
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Applications in Different Platforms Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Applications in Different Platforms
                        </h2>
                        <p className="text-base md:text-lg text-neutral-600 max-w-3xl mx-auto">
                            Access Nivesh on multiple platforms for seamless business management
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                platform: 'Web Platform',
                                description: 'Access Nivesh through your web browser for full-featured business management.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                ),
                            },
                            {
                                platform: 'Mobile App (iOS)',
                                description: 'Manage your business on-the-go with our iOS mobile application.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ),
                            },
                            {
                                platform: 'Mobile App (Android)',
                                description: 'Access Nivesh anywhere with our Android mobile application.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ),
                            },
                        ].map((platform, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg border border-neutral-100 transition-all duration-300 text-center"
                            >
                                <div className="w-16 h-16 bg-[#243062] rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                                    {platform.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-3">
                                    {platform.platform}
                                </h3>
                                <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                                    {platform.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Partner;

