import React from 'react';
// Try with ?url suffix first, if that doesn't work, remove ?url
import Investor1Logo from './images/investor1.svg';
import Investor2Logo from './images/investor2.svg';
import Investor3Logo from './images/investor3.svg';

const Investors: React.FC = () => {
    const investors = [
        {
            name: 'Windrose Capital',
            logo: Investor1Logo,
        },
        {
            name: "Let's Venture",
            logo: Investor2Logo,
        },
        {
            name: 'Indian Angel Network Fund',
            logo: Investor3Logo,
        },
    ];

    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                        Investors
                    </h2>
                    <p className="text-base md:text-lg text-neutral-600 max-w-3xl mx-auto">
                        We are supported by marquee investors, who believe in our vision.
                    </p>
                </div>

                {/* Investor Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12 ml-4 mr-4">
                    {investors.map((investor, index) => (
                        <div
                            key={index}
                            className="rounded-2xl p-6 md:p-8  flex flex-col items-center justify-center text-center group hover:bg-white hover:shadow-lg border border-neutral-100 hover:border-primary/20 transition-all duration-300 min-h-[200px] md:min-h-[240px]"
                        >
                            {/* Logo */}
                            {investor.logo && (
                                <div className="mb-6 flex items-center justify-center w-full h-36 md:h-44">
                                    <img
                                        src={investor.logo}
                                        alt={investor.name}
                                        className="h-full w-auto max-w-full object-cover group-hover:grayscale-0 transition-all duration-300"
                                        style={{ maxHeight: '180px' }}
                                    />
                                </div>
                            )}

                            {/* Investor Name */}
                            <h3 className="text-lg md:text-xl font-bold text-[#243062] leading-tight">
                                {investor.name}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Additional Investors Text */}
                <div className="text-center">
                    <p className="text-sm md:text-base text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                        And other Prominent angel investors who are successful entrepreneurs, venture capitalists and fund managers
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Investors;
