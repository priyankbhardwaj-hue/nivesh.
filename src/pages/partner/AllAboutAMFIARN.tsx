import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFAQs, type FAQ } from '../../services/api';
import { API_LEAD_PARTNER, PARTNER_ONBOARDING_URL } from '../../config/api';
import { getLeadSource } from '../../utils/leadSource';

const PAGE_SOURCE = 'All About AMFI ARN';

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

const AllAboutAMFIARN: React.FC = () => {
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
                // Filter FAQs by category "all-about-amfi-arn"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'all-about-amfi-arn' || 
                           category === 'all about amfi arn' ||
                           category.includes('all-about-amfi-arn');
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
            {/* Hero Section */}
            <section className="relative pt-20 md:pt-24 pb-12 md:pb-20 bg-white overflow-hidden">
                <div className="container-custom">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-sm mb-4">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                            Home
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500">All About AMFI ARN</span>
                    </nav>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Left Column - Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#243062] leading-tight">
                                All about AMFI Registration Number (ARN)
                            </h2>
                            
                            <div className="space-y-4 text-sm md:text-base text-neutral-600 leading-relaxed">
                                <p>
                                    MFDs with an AMFI Registration Number (ARN) are eligible to sell mutual funds. To become an ARN Holder, a distributor must qualify for the NISM Series V-A: MFDs Certification Examination.
                                </p>
                                
                                <p>
                                    A distributor should not hold more than one ARN card/Letter of Registration. The ARN has a validity period of 3 years. Renewal is required online if the validity period is over. The renewal depends on two factors:
                                </p>
                                
                                <ul className="list-disc list-inside space-y-2 ml-2">
                                    <li>ARN validity is about to expire</li>
                                    <li>ARN validity has expired</li>
                                </ul>
                                
                                <p>
                                    You can check the AMFI ARN status section for renewal information.
                                </p>
                                
                                <p>
                                    The online AMFI ARN registration process for new distributors is straightforward. It ensures compliance with AMFI regulations and helps distributors maintain their registration status. EUIN registration and renewal are also important aspects of the process.
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
                                    <div className="pt-2">
                                        <div className="text-center mb-3">
                                            <p className="text-sm font-bold text-neutral-800">
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

                                    {submitError && (
                                        <p className="text-sm text-red-600 mt-2">{submitError}</p>
                                    )}
                                    
                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={submitLoading}
                                        className="w-full bg-[#243062] hover:bg-[#1a2347] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {submitLoading ? 'Submitting...' : 'I Would Like To Know More'}
                                    </button>
                                </div>
                            </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why is the AMFI Registration Number (ARN Code) significant? */}
            <section className="py-12 md:py-20 bg-red-600">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 md:mb-10 leading-tight text-center">
                            Why is the AMFI Registration Number (ARN Code) significant?
                        </h2>
                        <div className="space-y-6 text-white">
                            <p className="text-base md:text-lg leading-relaxed">
                            AMFI Registration Number (ARN) is an essential factor facilitating the ethical and informed distribution of mutual funds throughout India. The process of AMFI registration helps both SEBI and the Association of Mutual Funds in India (AMFI) control the industry by only allowing experienced professionals to act as mfds.
                            </p>
                            <p className="text-base md:text-lg leading-relaxed">
                            Whenever you hear Mutual Funds are subject to market risk, it is a word of caution that while risk cannot be eliminated, it can be managed more efficiently with professional guidance. It is here that an AMFI-registered distributor with an ARN code plays its part. When the distributor registers online with the AMFI ARN, he proves proficient with the NISM certification and qualified enough to guide investors with goal specific recommendations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Get ARN Number? */}
            <section className="py-12 md:py-20 bg-[#243062]">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 md:mb-10 leading-tight text-center">
                            How to Get ARN Number?
                        </h2>
                        
                        <div className="space-y-6 mb-10">
                            <p className="text-base md:text-lg text-white leading-relaxed text-center max-w-4xl mx-auto">
                                After clearing the AMFI exam (NISM -VA) and receiving the certificate, one can apply for AMFI ARN registration through offline or online modes. AMFI India has authorized CAMS to complete the registration process and issue the ARN code.
                            </p>
                        </div>

                        {/* Two Boxes - Offline and Online */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10">
                            {/* Offline Mode Box */}
                            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                                <h3 className="text-2xl md:text-3xl font-bold text-[#243062] mb-4">
                                    AMFI ARN Registration - Offline Mode
                                </h3>
                                <p className="text-sm md:text-base text-neutral-700 mb-6 leading-relaxed">
                                    For offline registration, documents need to be enclosed and submitted to the nearest CAMS office for biometric completion.
                                </p>
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-[#243062] mb-3">Required Documents:</h4>
                                    <ul className="space-y-2 text-sm md:text-base text-neutral-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 font-bold mt-1">•</span>
                                            <span>Duly filled fresh Individual registration application form.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 font-bold mt-1">•</span>
                                            <span>Demand Draft in favor of "ASSOCIATION OF Mutual Funds IN INDIA" payable locally.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 font-bold mt-1">•</span>
                                            <span>Self-attested copy of the Valid NISM Series V-A Certificate.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 font-bold mt-1">•</span>
                                            <span>3 Stamp Size Colour Photographs.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 font-bold mt-1">•</span>
                                            <span>Duly Filled and Signed KYD Individual Application and Photograph should be affixed in the KYD Application Sign across.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-600 font-bold mt-1">•</span>
                                            <span>Self-Attested Copy of Pan Proof, Address Proof, and Bank Proof (Cancelled Cheque Copy/Latest Bank A/c Statement).</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Online Mode Box */}
                            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                                <h3 className="text-2xl md:text-3xl font-bold text-[#243062] mb-4">
                                    AMFI ARN Registration Process - Online Mode
                                </h3>
                                <p className="text-sm md:text-base text-neutral-700 mb-4 leading-relaxed font-semibold">
                                    Eligibility: Ensure that you have cleared the NISM Series V-A certification exam.
                                </p>
                                <div className="space-y-3 mt-6">
                                    <h4 className="font-semibold text-[#243062] mb-3">Steps for Online Registration:</h4>
                                    <ul className="space-y-2 text-sm md:text-base text-neutral-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#243062] font-bold mt-1">1.</span>
                                            <span><strong>Online Application:</strong> Visit the AMFI ARN registration online portal to start the application process.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#243062] font-bold mt-1">2.</span>
                                            <span><strong>Document Submission:</strong> Upload documents like NISM certificate, PAN card, and address proof.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#243062] font-bold mt-1">3.</span>
                                            <span><strong>Aadhaar Authentication:</strong> Verify using your Aadhaar number for identification via the eKYC process.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#243062] font-bold mt-1">4.</span>
                                            <span><strong>Payment of Fees:</strong> Pay the applicable registration fee for AMFI ARN registration online.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#243062] font-bold mt-1">5.</span>
                                            <span><strong>Confirmation:</strong> Your ARN will be emailed upon successful payment and verification.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Note Section */}
                        <div className="bg-white/10 rounded-lg p-6 md:p-8 border border-white/20">
                            <p className="text-white leading-relaxed">
                                <strong className="font-bold">Note:</strong> Fees vary by entity. It is important to update your details via the AMFI distributor login. Regular renewal is essential for compliance. Please refer to the online renewal sections for guidance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Register for CPE/ ECPE Training? */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-8 md:mb-10 leading-tight text-center">
                            How to Register for CPE/ ECPE Training?
                        </h2>
                        
                        {/* Table Section */}
                        <div className="overflow-x-auto mb-12">
                            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                                <thead>
                                    <tr className="bg-[#243062] text-white">
                                        <th className="px-4 py-4 md:px-6 md:py-5 text-left text-sm md:text-base font-bold border-r border-white/20">Normal</th>
                                        <th className="px-4 py-4 md:px-6 md:py-5 text-left text-sm md:text-base font-bold border-r border-white/20">Grandfather by Age Category</th>
                                        <th className="px-4 py-4 md:px-6 md:py-5 text-left text-sm md:text-base font-bold">Grandfather by Experience Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-4 md:px-6 md:py-5 text-sm md:text-base text-neutral-700 border-r border-neutral-200 bg-neutral-50">
                                            Candidates can attend the CPE Program 6 months prior to the expiry of the said Certificate / ARN Card.
                                        </td>
                                        <td className="px-4 py-4 md:px-6 md:py-5 text-sm md:text-base text-neutral-700 border-r border-neutral-200 bg-white">
                                            Any associated person, other than Principal, who has completed the age of 50 years as of May 31, 2010, may attend NISM Series V (a): MFDs CPE Program under the 'Grandfather by Age Category'.
                                        </td>
                                        <td className="px-4 py-4 md:px-6 md:py-5 text-sm md:text-base text-neutral-700 bg-neutral-50">
                                            Any associated person, other than Principal, having experience of 10 years or more as a distributor, agent or employed or engaged in the sale and/or distribution of Mutual Fund products, as of May 31, 2010, may attend NISM Series V (a): MFDs CPE Program under the 'Grandfather by Experience Category'.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* What are the Benefits of the ARN Code? */}
                        <div className="mb-12">
                            <h3 className="text-2xl md:text-4xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                                What are the Benefits of the ARN Code?
                            </h3>
                            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-100">
                                <ul className="space-y-4">
                                    {[
                                        "Serves as a distributor's exclusive ID, facilitating transparent mutual fund transactions.",
                                        "Facilitates legal mutual fund distribution following AMFI ARN registration online.",
                                        "Establishes credibility and trust among investors with verified AMFI registration.",
                                        "Facilitates tracking commissions and trail income seamlessly.",
                                        "Works towards professional upgrade with AMFI-certified knowledge and ethics.",
                                        "Must be listed on online investment platforms and portals.",
                                    ].map((point, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-5 h-5 bg-[#243062] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Process of ARN Renewal Online */}
                        <div>
                            <h3 className="text-2xl md:text-4xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                                Process of ARN Renewal Online
                            </h3>
                            <div className="space-y-6">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    The ARN Number is valid for three years. To complete the AMFI ARN renewal online process, follow these steps based on the validity status:
                                </p>
                                
                                <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border border-neutral-100">
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-[#243062] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <span className="text-white text-sm font-bold">1</span>
                                            </div>
                                            <div>
                                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                                    <strong>If ARN validity is about to expire:</strong> Book a CPE/ECPE training session.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-[#243062] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <span className="text-white text-sm font-bold">2</span>
                                            </div>
                                            <div>
                                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                                    <strong>If ARN validity has expired:</strong> Book the AMFI exam registration for the NISM Certification Exam.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-6 border-t border-neutral-200">
                                        <h4 className="text-lg md:text-xl font-bold text-[#243062] mb-4">
                                            Requirements for AMFI ARN Renewal (for individuals, senior citizens, and employees):
                                        </h4>
                                        <ul className="space-y-3">
                                            {[
                                                "Application for renewal of ARN/EUIN.",
                                                "Copy of the passing certificate of the NISM MFDs Certification Examination or CPE Certificate",
                                                "Two stamp-size colour photographs.",
                                            ].map((point, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="w-5 h-5 bg-[#243062] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                                        {point}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="mt-6 pt-6 border-t border-neutral-200">
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                            It is important to ensure that all documents are legitimate and up-to-date. Staying updated with AMFI Certification is essential for compliance and maintaining your reputation as a professional MFD.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process to Register for CPE/ ECPE Training */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight">
                            Process to Register for CPE/ ECPE Training
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                            {/* Left Column - Paragraph and Button */}
                            <div className="space-y-6">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    If your ARN number is about to expire and you want to renew it before the date ends, then you need to get register for the CPE/ ECPE Training. The process of registration is as follows.
                                </p>
                                
                                <div className="flex justify-start">
                                    <button
                                        onClick={() => window.open('https://www.nism.ac.in/', '_blank', 'noopener,noreferrer')}
                                        className="px-8 py-3 bg-primary hover:bg-[#1a2347] text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                                    >
                                        Login Now
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Steps */}
                            <div className="space-y-6">
                                {[
                                    {
                                        step: '1',
                                        description: "Login to your NISM account and select 'Enrolment'.",
                                    },
                                    {
                                        step: '2',
                                        description: "Choose a dropdown that reflects 'Enroll for CPE/eCPE'.",
                                    },
                                    {
                                        step: '3',
                                        description: "Select modules (Mutual Funds) and categories such as normal renewal/ grandfathered by age or grandfathered by experience. In most cases, you will have to select normal renewal.",
                                    },
                                    {
                                        step: '4',
                                        description: "You can select a desired date and time slot and make payment online through the NISM portal.",
                                    },
                                    {
                                        step: '5',
                                        description: "You will receive login credentials for CPE via email and SMS a day prior to the training date.",
                                    },
                                    {
                                        step: '6',
                                        description: "Your login credentials will be valid till the time of completion of training.",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-neutral-50 rounded-xl p-2 md:p-4 border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-lg md:text-xl font-bold">
                                                {item.step}
                                            </div>
                                            <div className="flex-1">
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
                </div>
            </section>

            {/* Difference Between CPE & E CPE */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 leading-tight text-center">
                            Difference Between CPE & E CPE
                        </h2>
                        
                        {/* Table Section */}
                        <div className="overflow-x-auto mt-8">
                            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                                <thead>
                                    <tr className="bg-[#243062] text-white">
                                        <th className="px-4 py-4 md:px-6 md:py-5 text-left text-sm md:text-base font-bold border-r border-white/20">Category</th>
                                        <th className="px-4 py-4 md:px-6 md:py-5 text-left text-sm md:text-base font-bold border-r border-white/20">CPE</th>
                                        <th className="px-4 py-4 md:px-6 md:py-5 text-left text-sm md:text-base font-bold">ECPE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        {
                                            category: 'Mode',
                                            cpe: 'Online Mode',
                                            ecpe: 'Offline Mode',
                                        },
                                        {
                                            category: 'Centre',
                                            cpe: 'Physical centre. You will have to visit the selected centre on the training day',
                                            ecpe: 'No need to visit the centre',
                                        },
                                        {
                                            category: 'Prerequisites',
                                            cpe: 'Id Proofs and admit card',
                                            ecpe: 'A laptop or desktop with at least 2GB RAM Internet connection with a minimum speed of 2MBPS',
                                        },
                                        {
                                            category: 'Duration',
                                            cpe: '5-6 hours',
                                            ecpe: '4-5 hours',
                                        },
                                        {
                                            category: 'Doubt Session',
                                            cpe: 'One on one questions can be asked',
                                            ecpe: 'This is session recorded and live doubts are taken into consideration',
                                        },
                                    ].map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                                            <td className="px-4 py-4 md:px-6 md:py-5 text-sm md:text-base font-semibold text-[#243062] border-r border-neutral-200">
                                                {row.category}
                                            </td>
                                            <td className="px-4 py-4 md:px-6 md:py-5 text-sm md:text-base text-neutral-700 border-r border-neutral-200">
                                                {row.cpe}
                                            </td>
                                            <td className="px-4 py-4 md:px-6 md:py-5 text-sm md:text-base text-neutral-700">
                                                {row.ecpe}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Frequently Asked Questions (FAQs) */}
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
        </div>
    );
};

export default AllAboutAMFIARN;

