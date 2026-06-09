import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFAQs, type FAQ } from '../../services/api';
import { API_LEAD_PARTNER, PARTNER_ONBOARDING_URL } from '../../config/api';
import { getLeadSource } from '../../utils/leadSource';

const PAGE_SOURCE = 'NISM Certification Exam';

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
        // ignore malformed query string
    }
    return false;
}

function getUtmParam(key: string, fallback = ''): string {
    const value = getQueryVariable(key);
    return value !== false ? value : fallback;
}

const NISMCertificationExam: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, _setSubmitSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        holderType: 'arnHolder',
        getInfo: true,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFaqs(true);
                const allFaqs = await fetchFAQs();
                // Filter FAQs by category "nism-certification-exam"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'nism-certification-exam' || 
                           category === 'nism certification exam' ||
                           category.includes('nism-certification-exam');
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
            {/* Hero Section - All About NISM Certificates Exam */}
            <section className="relative bg-white pt-20 md:pt-24 pb-12 md:pb-20 overflow-hidden">
                <div className="container-custom">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-sm mb-6">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                            Home
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500">NISM Certification Exam</span>
                    </nav>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-8 items-start">
                        {/* Left Column - Content */}
                        <div className="space-y-6">
                            <h2 className="md:hidden text-2xl sm:text-3xl font-bold text-[#243062] leading-tight">
                                All About NISM Certificates Exam
                            </h2>
                            <h1 className="hidden md:block text-3xl md:text-5xl lg:text-6xl font-bold text-[#243062] leading-tight">
                                All About NISM Certificates Exam
                            </h1>
                            
                            <div className="space-y-4 text-sm md:text-base text-neutral-600 leading-relaxed">
                                <p>
                                    The NISM (National Institute of Securities Markets) Certification Exam is a mandatory examination for individuals who wish to become MFDs in India. NISM is an educational institution established by the Securities and Exchange Board of India (SEBI) to enhance the quality of the securities markets.
                                </p>
                                
                                <p>
                                    The NISM-Series-V-A: MFD Certification Examination is specifically designed for individuals who want to distribute mutual fund products. This certification is a prerequisite for obtaining an AMFI Registration Number (ARN), which is essential for selling mutual funds in India.
                                </p>
                                
                                <p>
                                    Passing the NISM exam demonstrates your understanding of mutual fund products, regulations, and MFD practices, ensuring you can provide quality advice to investors.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Form or Success Message */}
                        <div className="lg:sticky lg:top-24">
                            {submitSuccess ? (
                                <div className="bg-white border-2 border-green-200 rounded-lg p-6 md:p-8 shadow-sm text-center">
                                    <div className="inline-flex w-12 h-12 rounded-full bg-green-100 text-primary items-center justify-center mb-4">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-neutral-800 mb-2">Thank you!</h2>
                                    <p className="text-neutral-600">We have received your details. Our team will get in touch with you shortly.</p>
                                </div>
                            ) : (
                            <form
                                noValidate
                                onSubmit={handleFormSubmit}
                                className="bg-white border-2 border-green-200 rounded-lg p-6 md:p-8 shadow-sm"
                            >
                                <h2 className="text-xl md:text-2xl font-bold text-neutral-800 mb-6">
                                    Fill the Form to Know More!
                                </h2>
                                
                                <div className="space-y-4">
                                    {/* Input Fields */}
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
                                    
                                    {/* Radio Buttons */}
                                    <div className="space-y-3">
                                        <p className="text-sm font-medium text-neutral-700">Currently, you are an</p>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer">
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
                                            <label className="flex items-center gap-3 cursor-pointer">
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
                                    <label className="flex items-start gap-3 cursor-pointer">
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
                                        <p className="text-sm text-red-600 mt-2">{submitError}</p>
                                    )}
                                    
                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={submitLoading}
                                        className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {submitLoading ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Highlights Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Key Highlights
                        </h2>
                    </div>
                    <div className="space-y-6 md:space-y-8">
                        {/* Top Section: Left (1-5) and Right (6-10) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Left Column: Items 1-5 */}
                            <div className="flex flex-col items-center md:items-end space-y-6 md:space-y-8">
                                {[
                                    {
                                        title: 'NISM Certifications Eligibility Criteria',
                                    },
                                    {
                                        title: 'Mode to Appear in the NISM Exam',
                                    },
                                    {
                                        title: 'How Much NISM Certification Fees to be submitted?',
                                    },
                                    {
                                        title: 'What is the Validity of NISM Certificate?',
                                    },
                                    {
                                        title: 'NISM Certification Exam Pattern',
                                    },
                                ].map((highlight, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 w-full max-w-lg"
                                    >
                                        <h5 className="text-lg md:text-xl font-bold text-[#243062]">
                                            {index + 1}. {highlight.title}
                                        </h5>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column: Items 6-10 */}
                            <div className="flex flex-col items-center md:items-start space-y-6 md:space-y-8">
                                {[
                                    {
                                        title: 'NISM Series VA - Name of Module',
                                    },
                                    {
                                        title: 'How to Enroll for the NISM Exam?',
                                    },
                                    {
                                        title: 'NISM Certifications Exam Syllabus',
                                    },
                                    {
                                        title: 'NISM Exam Study Material',
                                    },
                                    {
                                        title: 'Frequently Asked Questions (FAQs)',
                                    },
                                ].map((highlight, index) => (
                                    <div
                                        key={index + 5}
                                        className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 w-full max-w-lg"
                                    >
                                        <h5 className="text-lg md:text-xl font-bold text-[#243062]">
                                            {index + 6}. {highlight.title}
                                        </h5>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Section: Item 11 Centered */}
                        <div className="flex justify-center">
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 w-full max-w-md">
                                <h5 className="text-lg md:text-xl font-bold text-[#243062]">
                                    11. Become an MFD
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NISM Exam Eligibility Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            NISM Exam Eligibility
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                    According to the guidelines given by The National Institute of Securities Market (NISM):
                                </p>
                                <ul className="space-y-3 list-disc list-inside text-sm md:text-base text-neutral-700">
                                    <li>Anyone who is 18 years and above can participate in the NISM Exam and become an MFD.</li>
                                    <li>There is no educational qualification listed as per the Association of Mutual Fund (AMFI) website.</li>
                                    <li>If you are looking to enter the MFD business, you need to clear the NISM certification exam and obtain the NISM certificate examination to get started.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Get NISM Certification? Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            How to Get NISM Certification?
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                                <ul className="space-y-3 list-disc list-inside text-sm md:text-base text-neutral-700">
                                    <li>Register for the NISM exam by visiting the official website.</li>
                                    <li>Complete the NISM registration process and proceed with the NISM login to schedule your exam.</li>
                                    <li>Choose the NISM certificate course that matches your requirements.</li>
                                    <li>After passing the MFD exam, you will receive the NISM mutual fund certification.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why is NISM Certification Important? Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Why is NISM Certification Important?
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                                <ul className="space-y-3 list-disc list-inside text-sm md:text-base text-[#243062] mb-4">
                                    <li>It is a mandatory requirement for those who want to become MFDs.</li>
                                    <li>The AMFI certification ensures compliance with industry regulations.</li>
                                    <li>Helps in building credibility and trust among clients.</li>
                                </ul>
                                <p className="text-base md:text-lg text-[#243062] leading-relaxed">
                                This certification allows a person to become a certified MFD.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mode to Appear in the NISM MFD Exam Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Mode to Appear in the NISM MFD Exam
                        </h2>
                        
                        {/* Introductory Content */}
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200 mb-6">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                Based on the details provided by the Association of Mutual Funds in India (AMFI), the NISM MFD Exam can be attempted either in English or Hindi.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                The NISM certification examination is provided both online and offline for English speakers.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                For Hindi, it is made available only offline.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                The online option is highly popular as it is convenient, provided from various centers, and faster in terms of result processing.
                            </p>
                        </div>

                        {/* Mode Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 md:p-8 shadow-sm">
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    Online Mode
                                </h3>
                                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                    Available for English language. The online option is convenient, provided from various centers, and faster in terms of result processing.
                                </p>
                            </div>
                            <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 md:p-8 shadow-sm">
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    Offline Mode
                                </h3>
                                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                    Available for both English and Hindi languages. Candidates can appear for the exam at designated NISM test centers across India.
                                </p>
                            </div>
                        </div>

                        {/* Steps to Get NISM Certification */}
                        <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 md:p-8 shadow-sm mb-6">
                            <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                Steps to Get NISM Certification
                            </h3>
                            <ol className="space-y-3 list-decimal list-inside text-sm md:text-base text-neutral-700 ml-2">
                                <li>Register for the NISM exam on the official portal.</li>
                                <li>Select the NISM certificate course relevant to MFD.</li>
                                <li>Appear for the NISM certificate examination as per the chosen mode.</li>
                                <li>Clear the mutual fund exam to obtain the NISM mutual fund certification.</li>
                            </ol>
                        </div>

                        {/* Additional Information */}
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                            If you are wondering what is NISM certification, it is a mandatory qualification to become a certified MFD.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How Much NISM Exam Fee to be submitted? Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            How Much NISM Exam Fee to be submitted?
                        </h2>
                        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-200">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                The NISM-Series-V-A: MFD Certification Examination fee is <strong className="text-[#243062]">₹1,500</strong> (inclusive of taxes). This fee is payable at the time of registration for the exam.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                The exam fee is non-refundable and non-transferable. Candidates must ensure they are fully prepared before registering for the examination. In case of failure, candidates will need to pay the full fee again to retake the exam.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is the Validity for a NISM Certificate? Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            What is the Validity for a NISM Certificate?
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                The NISM-Series-V-A certificate is valid for <strong className="text-[#243062]">3 years</strong> from the date of issue. During this period, the certificate holder can use it to obtain and maintain their AMFI Registration Number (ARN).
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                To renew the certificate after 3 years, certificate holders must complete the mandatory Continuous Professional Education (CPE) training program. The CPE training ensures that MFDs stay updated with the latest developments in the mutual fund industry and regulatory changes.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                It is important to complete the CPE training before the certificate expires to avoid any interruption in your MFD activities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NISM Exam Pattern Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            NISM Exam Pattern
                        </h2>
                        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-200">
                            {/* Introductory Paragraph */}
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
                                The NISM Exam follows a structured pattern for candidates appearing in the MFD exam. Below are the key details:
                            </p>
                            
                            {/* Exam Pattern Table */}
                            <div className="mb-8 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-[#243062] text-white">
                                                <th className="border border-[#243062] p-4 text-left font-serif font-bold text-sm md:text-base">Parameter</th>
                                                <th className="border border-[#243062] p-4 text-center font-serif font-bold text-sm md:text-base">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white hover:bg-neutral-50">
                                                <td className="border border-neutral-300 p-4 font-serif text-sm md:text-base text-neutral-800">Total Questions</td>
                                                <td className="border border-neutral-300 p-4 text-center text-sm md:text-base text-neutral-700">100 questions</td>
                                            </tr>
                                            <tr className="bg-neutral-50 hover:bg-neutral-100">
                                                <td className="border border-neutral-300 p-4 font-serif text-sm md:text-base text-neutral-800">Marks per Question</td>
                                                <td className="border border-neutral-300 p-4 text-center text-sm md:text-base text-neutral-700">1 mark each (Maximum marks: 100)</td>
                                            </tr>
                                            <tr className="bg-white hover:bg-neutral-50">
                                                <td className="border border-neutral-300 p-4 font-serif text-sm md:text-base text-neutral-800">Passing Marks</td>
                                                <td className="border border-neutral-300 p-4 text-center text-sm md:text-base text-neutral-700">50% (50 marks out of 100)</td>
                                            </tr>
                                            <tr className="bg-neutral-50 hover:bg-neutral-100">
                                                <td className="border border-neutral-300 p-4 font-serif text-sm md:text-base text-neutral-800">Negative Marking</td>
                                                <td className="border border-neutral-300 p-4 text-center text-sm md:text-base text-neutral-700">No negative marking</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* How to Appear Section */}
                            <div className="mb-6">
                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">
                                    How to Appear for the NISM Certificate Examination?
                                </h3>
                                <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-neutral-700 ml-2">
                                    <li>Complete the NISM registration on the official portal.</li>
                                    <li>Log in using your NISM login credentials.</li>
                                    <li>Choose the relevant NISM certificate course and exam mode.</li>
                                    <li>Appear for the mutual fund exam and clear it to receive the NISM mutual fund certification.</li>
                                </ul>
                            </div>

                            {/* Additional Information Paragraphs */}
                            <div className="space-y-4 mb-6">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    If you are wondering what is NISM certification, it is a mandatory qualification for MFDs. The AMFI certification ensures compliance with industry standards.
                                </p>
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    For those searching how to get NISM certificate, the process starts with NISM register, selecting the exam, and passing with the required marks.
                                </p>
                            </div>

                            {/* Note Section */}
                            <div className="bg-[#243062] text-white rounded-lg p-4 md:p-6 mt-6">
                                <p className="text-sm md:text-base leading-relaxed">
                                    <strong>Note:</strong> Passing certificate will be issued only to those candidates who have furnished/ updated their Income Tax Permanent Account Number (PAN) in their registration details.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Name of Module Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            Name of Module: NISM-Series-V-A: MFD Certification Examination
                        </h2>
                        <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-200">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                The NISM-Series-V-A: MFD Certification Examination is the official certification program for individuals who wish to become MFDs in India.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                This module covers comprehensive topics related to mutual fund products, their features, benefits, risks, regulatory framework, and MFD practices. The examination ensures that candidates have a thorough understanding of:
                            </p>
                            <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-neutral-700 mb-4">
                                <li>Mutual fund concepts and products</li>
                                <li>Regulatory framework and compliance requirements</li>
                                <li>Investment strategies and portfolio management</li>
                                <li>Client relationship management</li>
                                <li>Ethical practices and code of conduct</li>
                            </ul>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                Successful completion of this examination is mandatory for obtaining an AMFI Registration Number (ARN) and becoming a registered MFD.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Enroll for The NISM Exam? Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            How to Enroll for The NISM Exam?
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-200">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
                                    To enroll for the NISM-Series-V-A: MFD Certification Examination, follow these steps:
                                </p>
                                <ol className="space-y-4 list-decimal list-inside text-sm md:text-base text-neutral-700">
                                    <li className="mb-2">
                                        <strong className="text-[#243062]">Visit the NISM Website:</strong> Go to the official NISM website (www.nism.ac.in) and navigate to the certification section.
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-[#243062]">Create an Account:</strong> Register yourself on the NISM portal by providing your personal details, email ID, and mobile number.
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-[#243062]">Select the Exam:</strong> Choose NISM-Series-V-A: MFD Certification Examination from the list of available exams.
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-[#243062]">Fill Application Form:</strong> Complete the online application form with all required details including personal information, educational qualifications, and contact details.
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-[#243062]">Upload Documents:</strong> Upload scanned copies of required documents such as photograph, signature, and identity proof.
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-[#243062]">Pay Exam Fee:</strong> Pay the examination fee of ₹1,500 online through the available payment gateways (credit card, debit card, net banking, or UPI).
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-[#243062]">Select Exam Date & Center:</strong> Choose your preferred exam date and test center (for offline mode) or schedule your online exam slot.
                                    </li>
                                    <li className="mb-2">
                                        <strong className="text-[#243062]">Download Admit Card:</strong> After successful registration, download your admit card from the NISM portal. The admit card will contain your exam details, date, time, and venue.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NISM Exam Syllabus Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            NISM Exam Syllabus
                        </h2>
                        <div className="space-y-6">
                            <div className=" mb-8">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    In order to qualify the NISM Exam, it is necessary for the personnel to understand the whole NISM Examination Syllabus. Following are the topics included in the NISM Curriculum.
                                </p>
                            </div>
                            {[
                                {
                                    topic: 'I. Investment Landscape',
                                    subtopics: [
                                        'Understand the parameters of the Indian Economy: Describe about Investors and their Financial Goals',
                                        'Understand Savings and Investment',
                                        'Discuss Different Asset Classes',
                                        'Understand the Classification of Investment Risks',
                                        'Explain Risk Measure and Management Strategies',
                                        'Understand Behavioral Biases in Investment Decision Making',
                                        'Understand Risk Profiling',
                                        'Explain the Asset Allocation',
                                        'Comparison between the two approaches – Do-it-yourself and Taking Professional Help',
                                    ],
                                },
                                {
                                    topic: 'II. Concept & Role of a Mutual Fund',
                                    subtopics: [
                                        'Explain the Concept of Mutual Fund',
                                        'Understand the Classifications of Mutual Funds',
                                        'Describe the Growth of the Mutual Fund Industry in India',
                                    ],
                                },
                                {
                                    topic: 'III. Legal Structure of Mutual Funds in India',
                                    subtopics: [
                                        'Describe the Structure of Mutual Funds in India',
                                        'Understand the Key Constituents of a Mutual Fund',
                                        'Understand the Organisation Structure of Asset Management Company',
                                        'Understand the Role and Support Functions of Service Providers of Mutual Funds',
                                        'Explain the Role and Function of AMFI',
                                    ],
                                },
                                {
                                    topic: 'IV. Legal and Regulatory Framework',
                                    subtopics: [
                                        'Describe Role of Regulators in India',
                                        'Discuss Role of Securities and Exchange Board of India',
                                        'Know the Due Diligence Process Followed by AMCs for MFDs',
                                        'Explain Investor Grievance and Redressal Standards (Explain about SCORES)',
                                        'Understand AMFI Code of Conduct for Intermediaries',
                                    ],
                                },
                                {
                                    topic: 'V. Scheme Related Information',
                                    subtopics: [
                                        'Understanding the Mandatory Documents and their Purpose, Objective and Significance',
                                        'Explain the Non-Mandatory Disclosures',
                                    ],
                                },
                                {
                                    topic: 'VI. MFD and Channel Management Practices',
                                    subtopics: [
                                        'Explain the Role and Importance of MFDs',
                                        'Understand the Classification of MFDs',
                                        'Explain the Modes of Distribution',
                                        'Understand the Pre-requisites to Become an MFD',
                                        'Explain Revenue for an MFD',
                                        'Know the Commission Disclosure mandated by SEBI',
                                        'Explain the Due Diligence Process by AMCs for MFDs',
                                        'Discuss Nomination Facilities to Agents / Distributors and Payment of Commission to Nominee',
                                        'Explain About Change of MFD',
                                    ],
                                },
                                {
                                    topic: 'VII. Net Asset Value, Total Expense Ratio and Pricing of Units',
                                    subtopics: [
                                        'Discuss the Fair Valuation Principles',
                                        'Compute Net Assets of a Mutual Fund Scheme and NAV',
                                        'Explain about Dividends & Distributable Reserves',
                                        'Know about the Concept of Entry and Exit Load and its Impact on NAV',
                                        'Know about the Key Accounting and Reporting Requirements Applicable to Mutual Funds',
                                        'Know about the NAV, Total expense ratio and Pricing of units for the Segregated Portfolio',
                                    ],
                                },
                                {
                                    topic: 'VIII. Taxation',
                                    subtopics: [
                                        'Understand Applicability of various taxes in respect of Mutual Funds',
                                        'Understand about Capital gains, Capital gains (Long term & Short term) tax and Indexation.',
                                        'Understand about the Dividend Income and Dividend Income tax',
                                        'Understand the Difference Between dividend distribution tax and capital gains tax',
                                        'Understand the basics of Setting off Gains and Losses under Income Tax Act',
                                        'Understand about Securities Transaction Tax',
                                        'Understand about Tax benefit under Section 80C of the Income Tax Act for investment pertaining to Mutual Funds',
                                        'Understand about Tax Deducted at Source (TDS) in Mutual Funds',
                                        'Understand Applicability of GST in Mutual Funds',
                                    ],
                                },
                                {
                                    topic: 'IX. Investor Services',
                                    subtopics: [
                                        'Describe the NFO Process',
                                        'Explain about the New Fund Offer Price /On-going price for subscription',
                                        'Discuss Different types of investment plans and options',
                                        'Explain how the mutual fund units are allotted to the investor',
                                        'Describe the content and periodicity of Statement of Accounts for investments',
                                        'Describe different types of Mutual Fund Investors',
                                        'Explain how to fill in the application form for Mutual Funds',
                                        'Describe the financial transactions with Mutual Funds (Purchase, Redemption and Switches)',
                                        'Explain Cut-off time and Time Stamping',
                                        'Describe the KYC requirement for mutual fund investors',
                                        'Explain the different types of systematic transactions',
                                        'Explain operational aspects of systematic transactions',
                                        'Explain Non – Financial Transactions in Mutual Funds',
                                        'Discuss change in Status of Special Investor Categories',
                                        'Explain Investor Transactions – turnaround times',
                                    ],
                                },
                                {
                                    topic: 'X. Risk, Return and Performance of funds',
                                    subtopics: [
                                        'Understand the General and Specific Risk Factors',
                                        'Explain the Factors that affect mutual fund performance',
                                        'Describe Drivers of Returns and Risk in mutual fund Scheme',
                                        'Understand the Measures of Returns',
                                        'Know about the SEBI norms regarding representation of returns by Mutual Funds in India',
                                        'Explain risks in fund investing with a focus on investors',
                                        'Understand the Measures of Risk',
                                        'Explain certain provisions with respect to Credit Risk',
                                    ],
                                },
                                {
                                    topic: 'XI. Mutual Fund Scheme Performance',
                                    subtopics: [
                                        'Explain the concept of Benchmarks',
                                        'Compare Price Return Index and Total Return Index',
                                        'Identify the basics of choosing an appropriate performance benchmark',
                                        'Describe the use of market benchmarks to evaluate Equity Fund Performance',
                                        'Describe the use of market benchmarks to evaluate Debt Fund Performance',
                                        'Describe the use of market benchmarks to evaluate Other Schemes',
                                        'Explain Quantitative Measures of Fund Manager Performance',
                                        'Define Tracking Error',
                                        'Understand the different Sources for disclosure of scheme performance (Scheme documents, AMFI and AMC website and Fund Fact Sheet)',
                                    ],
                                },
                                {
                                    topic: 'XII. Mutual Fund Scheme Selection',
                                    subtopics: [
                                        'Explain Scheme Selection based on Investor needs, preferences and risk-profile',
                                        'Explain Risk Levels in mutual fund schemes',
                                        'Explain Scheme Selection based on investment strategy of Mutual Funds',
                                        'Explain Selection of Mutual Fund scheme offered by different AMCs or within the scheme category',
                                        'Know about selecting options in mutual fund schemes',
                                        'Know about Do\'s and Don\'ts while selecting mutual fund schemess',
                                    ],
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 shadow-sm"
                                >
                                    <h3 className="text-lg md:text-xl font-bold text-[#243062] mb-4">
                                        {item.topic}
                                    </h3>
                                    <ul className="space-y-2 list-disc list-inside text-sm md:text-base text-neutral-700">
                                        {item.subtopics.map((subtopic, subIndex) => (
                                            <li key={subIndex}>{subtopic}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* NISM Exam Study Material Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-12 text-center leading-tight">
                            NISM Exam Study Material
                        </h2>
                        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-200">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                If you want to qualify the NISM Test with good grades and in the first attempt then it is highly necessary to prepare strongly. For this you can take help from the Mutual Fund Mock Test, NISM Books and other material like the News sections. Study material is provided by NISM upon registration for the exam.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Frequently Asked Questions (FAQs) Section */}
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
        </div>
    );
};

export default NISMCertificationExam;

