import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFAQs, type FAQ } from '../../../services/api';

const DataSecurity: React.FC = () => {
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch FAQs from API
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoadingFaqs(true);
                const allFaqs = await fetchFAQs();
                // Filter FAQs by category "data-security"
                const filteredFaqs = allFaqs.filter(faq => {
                    const category = faq.category?.toLowerCase() || '';
                    return category === 'data-security' || 
                           category === 'data security' ||
                           category.includes('data-security');
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

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-16 md:pt-24 overflow-hidden bg-white">
                <div className="container-custom relative z-10">
                    <div className="max-w-6xl mx-auto">
                        {/* Breadcrumbs */}
                        <div className="mb-6">
                            <nav className="flex items-center space-x-2 text-sm">
                                <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                                    Home
                                </Link>
                                <span className="text-neutral-400">/</span>
                                <span className="text-neutral-500">Data Security</span>
                            </nav>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Nivesh Data Security Policy
                        </h1>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="relative py-2 md:py-4 bg-white">
                <div className="container-custom relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="prose prose-lg max-w-none">
                            {/* Introduction */}
                            <div className="mb-12">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                    As digital finance continues its rapid expansion, safeguarding personal data has never been more critical. The Website Security System at Nivesh is built to ensure secure access, user privacy, and full regulatory compliance. Central to this approach is a clearly defined client data security policy, governing how data is collected, used, retained, and managed. This article outlines how Nivesh strengthens client trust with an advanced, compliance-ready security infrastructure.
                                </p>
                            </div>

                            {/* What Does Nivesh's Security Infrastructure Include? */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    What Does Nivesh's Security Infrastructure Include?
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        In a tech-driven world, protecting financial and personal data from cyber threats is a top priority. Platforms like Nivesh, with an expanding base of digital transactions, must protect sensitive customer data to maintain trust and regulatory standing.
                                    </p>

                                    <p>
                                        The data protection framework at Nivesh extends beyond simple data encryption—it encompasses every privacy protocol necessary to secure information across digital platforms. This includes everything from basic login credentials to highly sensitive KYC details, all protected under Indian law.
                                    </p>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            Legal Foundations:
                                        </h3>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>Information Technology Act, 2000</li>
                                            <li>IT Security Rules, 2011</li>
                                            <li>Digital Personal Data Protection Act, 2023</li>
                                        </ul>
                                        <p className="mt-4">
                                            Adherence to these legal frameworks demonstrates Nivesh's serious commitment to protecting client data.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Types of Personal Data Collected */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Types of Personal Data Collected
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        Under the client data security policy, Nivesh collects and processes only essential information, including:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Full name, DOB, and contact details</li>
                                        <li>Government-issued IDs: PAN, Aadhaar, passport</li>
                                        <li>Financial and employment data</li>
                                        <li>KYC-related documents</li>
                                        <li>Transaction records and payment logs</li>
                                        <li>IP address, device usage, and location</li>
                                        <li>Voice recordings and digital document images</li>
                                    </ul>
                                    <p>
                                        All data is handled lawfully and only for legitimate, service-related purposes.
                                    </p>
                                </div>
                            </div>

                            {/* Why Is This Data Collected? */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Why Is This Data Collected?
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        Nivesh's client data security policy ensures limited and specific usage:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Completing KYC and onboarding</li>
                                        <li>Processing investment and financial transactions</li>
                                        <li>Identity verification and service eligibility</li>
                                        <li>Customer support, complaints, or query resolution</li>
                                        <li>Legal audits and compliance reporting</li>
                                        <li>Improving user experience and offering relevant services</li>
                                    </ul>
                                    <p>
                                        All data usage is fully consent-based and legally compliant.
                                    </p>
                                </div>
                            </div>

                            {/* Data Sharing with Third Parties */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Data Sharing with Third Parties
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        To operate effectively in the fintech space, Website Security at Nivesh incorporates secure, rule-based data sharing practices:
                                    </p>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            Data may be shared with:
                                        </h3>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>Mutual fund RTAs and asset management companies</li>
                                            <li>Stock exchanges and depositories</li>
                                            <li>Regulatory agencies and KYC registrars</li>
                                            <li>Secure third-party infrastructure providers</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            Data protection safeguards include:
                                        </h3>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>Sharing on a strict need-to-know basis</li>
                                            <li>Legally binding confidentiality agreements</li>
                                            <li>Encrypted and secure data transmission</li>
                                        </ul>
                                    </div>

                                    <p>
                                        These controls extend Nivesh's data protection practices beyond its platform.
                                    </p>
                                </div>
                            </div>

                            {/* How Nivesh Protects Client Data */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    How Nivesh Protects Client Data
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        The backbone of Nivesh's Website Security System is a comprehensive combination of technical and procedural controls:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>SSL encryption & secure data transfer</li>
                                        <li>Role-based access and user authentication</li>
                                        <li>Encrypted data storage and backups</li>
                                        <li>Third-party cybersecurity audits</li>
                                        <li>Secure device login & OTP validation</li>
                                        <li>Auto session expiration and anti-replay mechanisms</li>
                                    </ul>
                                    <p>
                                        Additionally, Nivesh employs disaster recovery systems to prevent data loss in emergencies.
                                    </p>
                                </div>
                            </div>

                            {/* Data Retention Practices */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Data Retention Practices
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        Nivesh retains personal data only for the duration necessary to provide services or comply with the law. Once the purpose is fulfilled:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Data is securely deleted or anonymized</li>
                                        <li>No personal data is retained unnecessarily</li>
                                        <li>Only statutory retention requirements are followed</li>
                                    </ul>
                                    <p>
                                        This aligns with a strong, forward-looking data security policy.
                                    </p>
                                </div>
                            </div>

                            {/* Your Rights as a Client */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Your Rights as a Client
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        Nivesh's platform is built with user empowerment in mind. Under the client data security policy, you are entitled to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Access your stored personal data</li>
                                        <li>Correct or update inaccurate details</li>
                                        <li>Withdraw consent or restrict data use</li>
                                        <li>Request deletion of data after service termination</li>
                                        <li>Stay informed about how your data is governed</li>
                                    </ul>
                                    <p>
                                        Support is available through the Nivesh compliance team to exercise these rights.
                                    </p>
                                </div>
                            </div>

                            {/* External Sites & Responsibilities */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    External Sites & Responsibilities
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        Nivesh is not responsible for the data handling practices of third-party websites linked through its platform. Users should independently verify the privacy terms of these services before sharing any information.
                                    </p>
                                </div>
                            </div>

                            {/* Communication & Alerts */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Communication & Alerts
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        As part of its client-centric data protection system, Nivesh sends:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Transactional notifications</li>
                                        <li>Regulatory and service updates</li>
                                        <li>Educational and promotional messages</li>
                                    </ul>
                                    <p>
                                        All communication is managed under opt-in consent models to ensure privacy.
                                    </p>
                                </div>
                            </div>

                            {/* Limitation of Liability */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Limitation of Liability
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        While Nivesh's Security Infrastructure is extensive, no digital system can be fully immune to force majeure events like natural disasters, extreme cyberattacks, or war. Nivesh will take all possible measures to protect data but cannot assume responsibility for breaches beyond its control.
                                    </p>
                                </div>
                            </div>

                            {/* Policy Review and Updates */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Policy Review and Updates
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        The client data security policy is reviewed regularly and updated as needed. The latest version is always published on the official website, and users are encouraged to review it periodically.
                                    </p>
                                </div>
                            </div>

                            {/* Final Thoughts */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Final Thoughts
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        Nivesh's commitment to privacy and cybersecurity is clear. From transparent data handling to state-of-the-art digital protection mechanisms, the Website Security Framework at Nivesh stands as a model in financial data protection. Choose a platform that values your privacy—start your secure investment journey with Nivesh today.
                                    </p>
                                </div>
                            </div>

                            {/* Frequently Asked Questions */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Frequently Asked Questions
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
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DataSecurity;

