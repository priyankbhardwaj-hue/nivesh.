import React from 'react';

const TechHumanSection: React.FC = () => {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-primary-dark to-primary text-white mb-4">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">
                        We Help You Achieve Your Goals
                    </h2>
                    <p className="text-xl text-white/90">
                        With a Combination of Technology and Human Touch
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                    {/* Technology Card */}
                    <div className="group bg-white rounded-2xl p-8 text-neutral-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-center group-hover:text-primary transition-colors duration-300">
                            Technology
                        </h3>
                        <p className="text-center text-neutral-600 mb-6 group-hover:text-neutral-900 transition-colors duration-300">
                            An award-winning platform at your disposal
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-primary mt-1 group-hover:scale-125 inline-block transition-transform duration-300">•</span>
                                <span className="group-hover:text-neutral-900 transition-colors duration-300">Get personalized recommendations</span>
                            </li>
                            <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-primary mt-1 group-hover:scale-125 inline-block transition-transform duration-300">•</span>
                                <span className="group-hover:text-neutral-900 transition-colors duration-300">Invest in few clicks</span>
                            </li>
                            <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-primary mt-1 group-hover:scale-125 inline-block transition-transform duration-300">•</span>
                                <span className="group-hover:text-neutral-900 transition-colors duration-300">Track performance</span>
                            </li>
                            <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-primary mt-1 group-hover:scale-125 inline-block transition-transform duration-300">•</span>
                                <span className="group-hover:text-neutral-900 transition-colors duration-300">Keep yourself updated with regular updates</span>
                            </li>
                            <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-primary mt-1 group-hover:scale-125 inline-block transition-transform duration-300">•</span>
                                <span className="group-hover:text-neutral-900 transition-colors duration-300">Timely exits</span>
                            </li>
                        </ul>
                    </div>

                    {/* Human Touch Card */}
                    <div className="group bg-white rounded-2xl p-8 text-neutral-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-center group-hover:text-primary transition-colors duration-300">
                            Human Touch
                        </h3>
                        <p className="text-center text-neutral-600 mb-6 group-hover:text-neutral-900 transition-colors duration-300">
                            Through our certified partners spread across India
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-primary mt-1 group-hover:scale-125 inline-block transition-transform duration-300">•</span>
                                <span className="group-hover:text-neutral-900 transition-colors duration-300">Get expert opinion</span>
                            </li>
                            <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-primary mt-1 group-hover:scale-125 inline-block transition-transform duration-300">•</span>
                                <span className="group-hover:text-neutral-900 transition-colors duration-300">Assistance in transactions</span>
                            </li>
                            <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-primary mt-1 group-hover:scale-125 inline-block transition-transform duration-300">•</span>
                                <span className="group-hover:text-neutral-900 transition-colors duration-300">Knowledge sharing</span>
                            </li>
                            <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-primary mt-1 group-hover:scale-125 inline-block transition-transform duration-300">•</span>
                                <span className="group-hover:text-neutral-900 transition-colors duration-300">Query resolution</span>
                            </li>
                            <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-primary mt-1 group-hover:scale-125 inline-block transition-transform duration-300">•</span>
                                <span className="group-hover:text-neutral-900 transition-colors duration-300">Help in sticking to investment plan</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-neutral-100 hover:scale-110 hover:shadow-2xl transition-all duration-300 shadow-lg">
                        More About Partners
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TechHumanSection;
