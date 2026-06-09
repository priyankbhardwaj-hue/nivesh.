import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const AspiringMFDSection: React.FC = () => {
    const navigate = useNavigate();
    return (
        <section className="py-12 md:py-20 bg-neutral-50 overflow-hidden">
            <div className="container-custom">
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-base md:text-lg font-semibold mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        For Aspiring MFDs
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-neutral-900 mb-6">
                        Start Your Wealth Journey With Nivesh.
                    </h2>
                    <p className="text-base md:text-lg text-neutral-600">
                        We help you become a MFDs ... from AMFI certification to your first client.
                    </p>
                </div>

                {/* Step Flow */}
                <div className="relative max-w-5xl mx-auto mb-16">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-200 -translate-y-1/2 hidden md:block z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {/* Step 1 */}
                        <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-neutral-100 text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                1
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-2 md:mb-3">Get trained and certified</h3>
                            <p className="text-neutral-600 text-xs md:text-sm">
                                Complete AMFI/NISM certification with our expert guidance and study material.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-neutral-100 text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                2
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-2 md:mb-3">Get your own ARN</h3>
                            <p className="text-neutral-600 text-xs md:text-sm">
                                We assist you in obtaining your AMFI Registration Number (ARN) quickly.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-neutral-100 text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                3
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-2 md:mb-3">Launch your business</h3>
                            <p className="text-neutral-600 text-xs md:text-sm">
                                Go live with the Nivesh platform and start onboarding clients immediately.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-lg md:text-xl font-medium text-neutral-800 italic mb-6 md:mb-8">
                        "From learner to leader...your MFD journey starts here."
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => navigate('/partner/become-mutual-fund-distributors')}
                    >
                        Become an MFD →
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default AspiringMFDSection;
