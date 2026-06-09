import React from 'react';
import bse from '../../assets/bse.jpeg';
import cams from '../../assets/cams.jpeg';
import gupshup from '../../assets/gupshup.jpeg';
import karvy from '../../assets/karvy.jpeg';
import ondc from '../../assets/ONDC.jpeg';
import mf from '../../assets/mf.jpeg';
import sendgrid from '../../assets/sendgrid.jpeg';
import whatsapp from '../../assets/whatsapp.jpeg';

const BenefitsSection: React.FC = () => {
    const benefits = [
        "No upfront cost for joining Nivesh",
        "Seamless integration with top R&TAs and AMCs",
        "Dedicated RM",
        "Clean, intuitive UI",
        "Scalable, compliant, and always up-to-date"
    ];

    const partners = [
        { name: 'BSE', logo: bse },
        { name: 'CAMS', logo: cams },
        { name: 'Gupshup', logo: gupshup },
        { name: 'Karvy', logo: karvy },
        { name: 'ONDC', logo: ondc },
        { name: 'MF Utilities', logo: mf },
        { name: 'SendGrid', logo: sendgrid },
        { name: 'WhatsApp', logo: whatsapp },
    ];

    return (
        <section className="py-20 md:py-20 bg-neutral-50">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-lg font-semibold mb-6">
                            Why Choose Nivesh
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                            Built For MFDs. <br />
                            <span className="text-primary">Designed For Growth.</span>
                        </h2>

                        <ul className="space-y-6 mb-12">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-lg text-neutral-700 font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Visual - Partner Logos */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
                        <div className="text-center mb-8">
                            <h4 className="text-[18px] mb-1 font-semibold text-neutral-900">WE WORK WITH LEADING PROVIDERS</h4>
                            <p className="text-sm text-neutral-500">Integrated with leading AMCs & R&TAs</p>
                        </div>

                        {/* Desktop/Tablet Grid View */}
                        <div className="hidden md:grid grid-cols-4 gap-4 items-center opacity-100">
                            {partners.map((partner, index) => (
                                <div key={index} className="h-24 flex items-center justify-center p-2 bg-white rounded-lg hover:shadow-md transition-shadow duration-300">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Mobile Carousel View */}
                        <div className="md:hidden overflow-hidden relative">
                            <div className="flex animate-scroll-horizontal">
                                {/* First set of logos */}
                                {partners.map((partner, index) => (
                                    <div key={index} className="flex-shrink-0 w-20 h-20 flex items-center justify-center p-2 bg-white rounded-lg mx-2">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                ))}
                                {/* Duplicate set for seamless loop */}
                                {partners.map((partner, index) => (
                                    <div key={`duplicate-${index}`} className="flex-shrink-0 w-20 h-20 flex items-center justify-center p-2 bg-white rounded-lg mx-2">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;

