import React from 'react';
import DashboardWeb from '../../assets/dashboard_webImg.jpeg';
import FormImage from '../../assets/formImg.jpg';

const MFDRevolution: React.FC = () => {
    return (
        <section className="py-20 md:py-32 bg-white overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-base md:text-lg font-semibold mb-6">
                            The MFD Revolution
                        </div>
                        <h2 className="text-2xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                            The Business Of MFDs Is Changing. <br />
                            <span className="text-primary">Don't Get Left Behind.</span>
                        </h2>
                        <p className="text-base md:text-lg text-neutral-600 mb-8 leading-relaxed">
                        Clients today expect goal-based,teach-enabled, multi-product solutions. With Nivesh, MFDs evolve into trusted individuals combining personal trust with digital scale.
                        </p>

                        <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-r-xl">
                            <p className="text-base md:text-lg font-medium text-neutral-800 italic">
                                "The future belongs to MFDs who put clients at the center...and tech at their fingertips."
                            </p>
                        </div>
                    </div>

                    {/* Right Visual - Split Screen Old vs New */}
                    <div className="relative">
                        {/* Background Blob */}
                        <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>

                        <div className="relative grid grid-cols-2 gap-4">
                            {/* Old Way Card */}
                            <div className="bg-neutral-100 rounded-2xl p-4 transform rotate-[-2deg] translate-y-4 opacity-80 scale-95 hover:opacity-100 hover:scale-100 hover:rotate-0 transition-all duration-500 shadow-lg border border-neutral-200">
                                <div className="flex items-center gap-2 mb-4 text-neutral-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm font-semibold uppercase tracking-wider">The Old Way</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-36 w-full rounded-lg overflow-hidden">
                                        <img
                                            src={FormImage}
                                            alt="Form"
                                            className="w-full h-auto object-fit"
                                        />
                                    </div>
                                    <div className="mt-4 p-1 bg-white rounded border border-neutral-200">
                                        <div className="flex items-center gap-2 text-red-500 text-[12px] md:text-sm font-medium">
                                            <span>⚠ Manual Tracking</span>
                                        </div>
                                    </div>
                                    <div className="p-1 bg-white rounded border border-neutral-200">
                                        <div className="flex items-center gap-2 text-red-500 text-[12px] md:text-sm font-medium">
                                            <span>⚠ Excel Sheets</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* New Way Card */}
                            <div className="bg-white rounded-2xl p-4 transform rotate-[2deg] -translate-y-4 shadow-2xl border border-primary/10 z-10 hover:rotate-0 transition-all duration-500">
                                <div className="flex items-center gap-2 mb-2 text-primary">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-sm font-semibold uppercase tracking-wider">The Nivesh Way</span>
                                </div>
                                <div className="space-y-4">
                                    {/* Chart Placeholder */}
                                    <div className="h-44 w-full rounded-lg overflow-hidden border border-neutral-100">
                                        <img
                                            src={DashboardWeb}
                                            alt="Nivesh Dashboard"
                                            className="w-full h-full object-cover object-top mt-2"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="flex-1 p-2 bg-green-50 rounded text-center">
                                            <div className="text-xs text-green-600 font-medium">Digital</div>
                                        </div>
                                        <div className="flex-1 p-2 bg-blue-50 rounded text-center">
                                            <div className="text-xs text-blue-600 font-medium">Automated</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -right-4 -bottom-4 bg-neutral-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    10x Faster
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MFDRevolution;
