import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [selectedState, setSelectedState] = useState('Registered Office');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const officeData: {
        [key: string]: Array<{
            title?: string;
            manager?: string;
            address: string;
            phone?: string;
            email?: string;
        }>;
    } = {
        'Registered Office': [
            {
                address: 'Private No-S-203, 20, ABC Complex, Veer Savarkar Block, Shakarpur, Shahdara, Delhi-110092',
            },
        ],
        Rajasthan: [
            {
                title: 'Bharatpur',
                manager: 'Ashish Kumar Gupta',
                address: '34/132, Khandelwal Dharmsala Ke Peeche , Bharatpur, Rajasthan-321001',
                phone: '9211995613',
                email: 'bharatpurbranch@nivesh.com',
            },
            {
                title: 'Alwar Branch',
                manager: 'Harshit Jain',
                address: '4-Cha-14 Manu Marg Housing Board Alwar Rajasthan-301001',
                phone: '9211995617',
                email: 'harshitjain@nivesh.com',
            },
            {
                title: 'Jaipur 1 Branch',
                manager: 'Avinash Kumar Gupta',
                address: '4/99 Vidhadhar Nagar, Jaipur, Rajasthan-302023',
                phone: '9211995618',
                email: 'jaipur1branch@nivesh.com',
            },
        ],
        Maharashtra: [
            {
                title: 'Dhayari Pune Branch',
                manager: 'Vijay Sakharam Chaudhary',
                address: 'Shop No.01, Benkarwasti Road, Opposite Gokhale Complex, Madhav Nagar, Dhayari, Pune - 411041',
                phone: '9211995615',
                email: 'Dhayari.Pune@nivesh.com',
            },
            {
                title: 'Nagpur Branch',
                manager: 'Jaimala Dilip Peshne',
                address: 'Block no. 2 Nagar Akhada Complex, Near Nain Kalar Samaj Reshimbhag Chowk Nagpur - 440024',
                phone: '9211995621',
                email: 'nagpurbranch@nivesh.com',
            },
            {
                title: 'Andheri West-Mumbai Branch',
                manager: 'Amitabh Puri',
                address: 'Flat 308, Gold Crown Chs Ltd. Jai Prakash Road, Seven Bungalows, Andheri West, Opp. Central Bank of India, Mumbai 400061',
                phone: '9211995619',
                email: 'andheriwest.mumbai@nivesh.com',
            },
        ],
        Punjab: [
            {
                title: 'Model Town Jalandhar Branch',
                manager: 'Shubham Investment',
                address: 'SCO 18, 1st Floor, Infinity Mall, Model Town, Jalandhar, Punjab-144003',
                phone: '9211995625',
                email: 'modeltown.jalandhar@nivesh.com',
            },
        ],
        Goa: [
            {
                title: 'Margao, Goa',
                manager: 'Rajesh Anant Naik Gaonkar',
                address: 'Fine answers Services S-1, 2nd floor, C building, Apna Bazaar, Margao, Goa PIN- 403601',
                phone: '9211995614',
                email: 'margaobranch@nivesh.com',
            },
        ],
        Jharkhand: [
            {
                title: 'Giridih, Jharkhand',
                manager: 'Niranjan Deo Sharma',
                address: 'Thakurbadi Tola, Village Sabalpur Thana, Giridih, Jharkhand-825320',
                phone: '9211995616',
                email: 'giridihbranch@nivesh.com',
            },
        ],
    };

    const states = Object.keys(officeData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        });
        alert('Thank you for contacting us! We will get back to you soon.');
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
                                <span className="text-neutral-500">Contact Us</span>
                            </nav>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Contact Us
                        </h1>

                        <p className="text-base md:text-lg text-neutral-600 mb-8 leading-relaxed">
                            Have questions or need assistance? We're here to help. Reach out to us through any of the channels below, and we'll get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="relative py-8 md:py-12 bg-white">
                <div className="container-custom relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                            {/* Left Column - Contact Information */}
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-8">
                                    Get in Touch
                                </h2>

                                <div className="space-y-8">
                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#243062] mb-2">Email</h3>
                                            <a href="mailto:Contact@nivesh.com" className="text-base text-neutral-700 hover:text-primary transition-colors break-all">
                                                Contact@nivesh.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Support Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#243062] mb-2">Support</h3>
                                            <a href="mailto:support@nivesh.com" className="text-base text-neutral-700 hover:text-primary transition-colors break-all">
                                                support@nivesh.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#243062] mb-2">Phone</h3>
                                            <a href="tel:+917290029202" className="text-base text-neutral-700 hover:text-primary transition-colors">
                                                +91 7290029202
                                            </a>
                                        </div>
                                    </div>

                                    {/* Grievance Officer */}
                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 mt-8">
                                        <h3 className="text-lg font-semibold text-[#243062] mb-4">Grievance Officer</h3>
                                        <div className="space-y-2 text-sm md:text-base text-neutral-700">
                                            <p>
                                                <span className="font-semibold">Name:</span> Anant Sharma
                                            </p>
                                            <p>
                                                <span className="font-semibold">Email:</span>{' '}
                                                <a href="mailto:grievance@nivesh.com" className="text-primary hover:text-primary-dark transition-colors">
                                                    grievance@nivesh.com
                                                </a>
                                            </p>
                                            <p>
                                                <span className="font-semibold">Phone:</span>{' '}
                                                <a href="tel:9810840689" className="text-primary hover:text-primary-dark transition-colors">
                                                    +91-9910909243
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Contact Form */}
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-8">
                                    Send us a Message
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-[#243062] mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-[#243062] mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Enter your email address"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-[#243062] mb-2">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-[#243062] mb-2">
                                            Subject <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="support">Technical Support</option>
                                            <option value="investment">Investment Related</option>
                                            <option value="partner">Partner Inquiry</option>
                                            <option value="complaint">Complaint</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-[#243062] mb-2">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Enter your message"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Locations Section */}
            <section className="relative py-8 md:py-12 bg-neutral-50">
                <div className="container-custom relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="flex flex-col lg:flex-row">
                                {/* Sidebar */}
                                <div className="w-full lg:w-64 bg-neutral-100 border-r border-neutral-200 p-6">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-6">
                                        States & Registered Office
                                    </h4>
                                    <div className="space-y-2">
                                        {states.map((state) => (
                                            <button
                                                key={state}
                                                onClick={() => setSelectedState(state)}
                                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                                                    selectedState === state
                                                        ? 'bg-primary text-white border-2 border-orange-500'
                                                        : 'text-neutral-700 hover:bg-neutral-200'
                                                }`}
                                            >
                                                {state}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 md:p-8">
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                        {selectedState}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {officeData[selectedState].map((branch, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                {branch.title && (
                                                    <h4 className="text-xl font-semibold text-[#243062] mb-4">
                                                        {branch.title}
                                                    </h4>
                                                )}
                                                {branch.manager && (
                                                    <p className="text-sm text-neutral-600 mb-3">
                                                        <span className="font-semibold">Branch Manager:</span> {branch.manager}
                                                    </p>
                                                )}
                                                <p className="text-base text-neutral-700 mb-4 leading-relaxed">
                                                    {branch.address}
                                                </p>
                                                {branch.phone && (
                                                    <p className="text-sm text-neutral-700 mb-2 flex items-center gap-2">
                                                        <svg
                                                            className="w-4 h-4 text-primary"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                            />
                                                        </svg>
                                                        <a
                                                            href={`tel:${branch.phone}`}
                                                            className="text-primary hover:text-primary-dark transition-colors"
                                                        >
                                                            {branch.phone}
                                                        </a>
                                                    </p>
                                                )}
                                                {branch.email && (
                                                    <p className="text-sm text-neutral-700 flex items-center gap-2">
                                                        <svg
                                                            className="w-4 h-4 text-primary"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        <a
                                                            href={`mailto:${branch.email}`}
                                                            className="text-primary hover:text-primary-dark transition-colors break-all"
                                                        >
                                                            {branch.email}
                                                        </a>
                                                    </p>
                                                )}
                                            </div>
                                        ))}
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

export default ContactUs;

