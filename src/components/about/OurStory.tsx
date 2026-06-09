import React from 'react';
import OurStoryImage from '../../assets/OurStory.png';

const OurStory: React.FC = () => {
    return (
        <section className="py-16 md:py-28 bg-gradient-to-br from-[#DC2626] via-[#EF4444] to-[#F87171]">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <div className="order-1">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Our Story
                        </h2>

                        <div className="space-y-6 text-base md:text-lg text-gray-100 leading-relaxed">
                            <p>
                                <strong className="text-gray-300 font-semibold">Nivesh</strong> is an award-winning digital-first platform that empowers independent mutual funds distributors to grow their Assets Under Management (AUM) using state-of-the-art technology. The penetration of financial products like mutual funds, corporate FDs, and insurance in India is still very low, leaving an untapped market of 19.5 crore households. MFDs will play a crucial role in increasing the penetration of financial products, particularly in tier 2 & 3 cities and beyond, as India is not a "DIY" (Do It Yourself) market.
                            </p>

                            <p>
                                We provide cutting-edge technology-enabled solutions to Independent Financial Advisors (IFAs) to help them service clients and scale their businesses easily. As per the AMFI-BCG report (August 2019), the Mutual Fund industry is projected to grow to USD 1.5 trillion (Rs 100 trillion) in the next 7-8 years, with significant growth expected from investments beyond the top 30 cities. Nivesh is well-positioned to capitalize on this opportunity through its unique blend of smart technology and human touch.
                            </p>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="order-2 relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                            <img
                                src={OurStoryImage}
                                alt="Our Story"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Decorative Background for Desktop */}
                        <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-[#DC2626]/10 via-[#EF4444]/5 to-transparent rounded-3xl -z-10 transform rotate-3 translate-x-4 translate-y-4"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;

