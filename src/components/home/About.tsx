import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 md:py-32 bg-neutral-50">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-neutral-900 mb-6">
                            Why Choose
                            <span className="text-primary"> Nivesh?</span>
                        </h2>
                        <p className="text-lg text-neutral-600 mb-6">
                            We believe everyone deserves access to expert financial guidance and tools
                            to build lasting wealth. Our mission is to democratize investment advisory
                            and make professional wealth management accessible to all.
                        </p>
                        <p className="text-lg text-neutral-600 mb-8">
                            With over 15 years of market expertise and cutting-edge technology, we help
                            you navigate the complexities of investing with confidence.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-neutral-900 mb-1">Proven Track Record</h4>
                                    <p className="text-neutral-600">Consistent returns backed by data-driven strategies</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-neutral-900 mb-1">Personalized Approach</h4>
                                    <p className="text-neutral-600">Tailored strategies that match your financial goals</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-neutral-900 mb-1">Transparent & Secure</h4>
                                    <p className="text-neutral-600">Clear pricing and bank-level security for your peace of mind</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Stats Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <div className="text-4xl font-bold text-primary mb-2">98%</div>
                            <div className="text-neutral-600">Client Satisfaction</div>
                        </div>
                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                            <div className="text-neutral-600">Expert Support</div>
                        </div>
                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <div className="text-4xl font-bold text-primary mb-2">₹500Cr+</div>
                            <div className="text-neutral-600">AUM</div>
                        </div>
                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                            <div className="text-neutral-600">Active Users</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
