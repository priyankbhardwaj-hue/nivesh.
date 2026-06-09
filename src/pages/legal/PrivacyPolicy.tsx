import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                                <span className="text-neutral-500">Privacy Policy</span>
                            </nav>
                        </div>

                        <h4 className="text-xl font-bold text-[#243062] mb-4 leading-tight md:hidden">
                            Privacy Policy
                        </h4>
                        <h1 className="hidden md:block text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Privacy Policy
                        </h1>

                        <p className="text-sm md:text-base text-neutral-500 mb-2">
                            Effective Date: 15 June 2023
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="relative py-2 md:py-4 bg-white">
                <div className="container-custom relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="prose prose-lg max-w-none">
                            {/* Introduction */}
                            <div className="mb-8">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                    Nivesh Platform i.e. ( Android App, Web and iOS App ) owned and operated by Providential Platforms Private Limited, values the privacy and security of our users. This Privacy Policy explains how we collect, use, and protect your personal information. By using the Nivesh Platform, you consent to the practices described in this policy.
                                </p>
                            </div>

                            {/* Section 1: Collection of Personal Information */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    1. Collection of Personal Information
                                </h3>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    1. Collection of Personal Information
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            1.1. Prior to Registration:
                                        </h3>
                                        <p>
                                            Certain sections and features of Nivesh can be accessed without registering or disclosing any personal information. However, your web browser or computer may provide us with anonymous visitor data through HTTP cookies. This data helps us understand the popularity of different areas of Nivesh and optimize our website.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            1.2. Registration:
                                        </h3>
                                        <p>
                                            To access our services, invest, and track your portfolio, you need to create an account. During registration, you will provide your Login Credentials (username and password) and disclose sensitive information such as your email address, mobile number, correspondence address, and financial details, including bank account or payment instrument information (collectively, "Registration Information").
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            1.3. Regulatory Requirements:
                                        </h3>
                                        <p>
                                            We may request you to upload images of documents such as PAN, Canceled Cheque, Proof of Address, Signature and Profile picture to comply with regulatory requirements. Additionally, if you are a partner, we may require images of additional documents, such as the ARN card. Your consent is implied for the submission of these documents.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            1.4. Additional Information:
                                        </h3>
                                        <p>
                                            From time to time, we may ask for additional personal information to meet regulatory requirements or provide enhanced services. We will only request information necessary for the stated purpose.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            1.5. Permissions:
                                        </h3>
                                        <p>
                                            The Nivesh Android App may require certain permissions from your device, including access to your Contacts and Camera. We request access to your Contacts to facilitate sharing and referral features within the app. We request access to your Camera to enable you to upload documents and images as required for regulatory compliance. Your permission for these access requests is required to use these specific features within the app.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Use of Personal Information */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    2. Use of Personal Information
                                </h3>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    2. Use of Personal Information
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        Use of Personal Information We use your personal information to contact you and carry out activities that you have authorized. Your information will be handled securely and used in accordance with applicable regulations.
                                    </p>
                                </div>
                            </div>

                            {/* Section 3: Accessing and Updating Personal Information */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    3. Accessing and Updating Personal Information
                                </h3>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    3. Accessing and Updating Personal Information
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        You have the right to access and update your personal information. To make changes, login to your account and modify the relevant details. Certain changes may require supporting documentary evidence. We may request additional proof of identity before disclosing personal data for security purposes.
                                    </p>
                                    <p>
                                        Remember to keep your Login Credentials confidential and report any suspected account compromise immediately for further assistance.
                                    </p>
                                </div>
                            </div>

                            {/* Section 4: Sharing Personal Information */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    4. Sharing Personal Information
                                </h3>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    4. Sharing Personal Information
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        We do not sell or rent your personal information to third parties for any reason. Access to your Login Credentials, Registration Information, and other personal data is restricted and subject to internal procedures that align with our security policies. Our employees are bound by confidentiality obligations and undergo stringent selection processes. Third-party vendors or service providers may be engaged to assist in delivering services, but they are contractually obligated to maintain the confidentiality of the information shared with them.
                                    </p>
                                </div>
                            </div>

                            {/* Section 5: Security Measures */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    5. Security Measures
                                </h3>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    5. Security Measures
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        Nivesh has implemented appropriate security measures to prevent unauthorized access, alteration, disclosure, or destruction of your data. All stored information is encrypted and protected against unauthorized access.
                                    </p>
                                </div>
                            </div>

                            {/* Section 6: Legal Obligations */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    6. Legal Obligations
                                </h3>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    6. Legal Obligations
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        We are committed to complying with the Indian Information Technology Act, 2000. As per Section 43A of the act, Nivesh maintains reasonable security procedures to safeguard your data. We also adhere to Regulation 4 of the Information Technology (Reasonable Security and Procedures and Sensitive Personal Data or Information) Rules, 2011, which grants registered users the right to obtain a readable copy of the information we hold about them.
                                    </p>
                                </div>
                            </div>

                            {/* Section 7: Changes to this Privacy Policy */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    7. Changes to this Privacy Policy
                                </h3>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    7. Changes to this Privacy Policy
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        This Privacy Policy is published on the Nivesh Android App to comply with Indian regulations. We periodically update this policy, and any changes will be effective immediately upon posting. We will notify you of significant changes to this Privacy Policy, and your rights under this policy will not be reduced without your explicit consent.
                                    </p>
                                </div>
                            </div>

                            {/* Grievance Officer Contact */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    Grievance Officer
                                </h3>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Grievance Officer
                                </h2>

                                <div className="space-y-4 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        If you have any questions or concerns on our services or policies, you can reach our Grievance Officer at the details provided below:
                                    </p>
                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                        <p className="mb-2">
                                            <span className="font-semibold text-[#243062]">Name:</span> Vishal Rohta
                                        </p>
                                        <p className="mb-2">
                                            <span className="font-semibold text-[#243062]">Email:</span>{' '}
                                            <a href="mailto:grievance@nivesh.com" className="text-primary hover:text-primary-dark transition-colors">
                                                grievance@nivesh.com
                                            </a>
                                        </p>
                                        <p>
                                            <span className="font-semibold text-[#243062]">Phone:</span>{' '}
                                            <a href="tel:9810840689" className="text-primary hover:text-primary-dark transition-colors">
                                                9810840689
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;

