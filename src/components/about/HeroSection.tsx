import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-neutral-100 py-16 md:py-20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container-custom relative z-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm mb-10">
                    <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                        Home
                    </Link>
                    <span className="text-neutral-400">/</span>
                    <span className="text-neutral-500">About</span>
                </nav>
                
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
                        About Nivesh
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl lg:text-2xl text-black/90 mb-8 leading-relaxed">
                        Empowering Independent Financial Advisors with Technology
                    </p>

                    {/* Description */}
                    <p className="text-base md:text-lg text-black/80 max-w-3xl mx-auto leading-relaxed">
                        We are an award-winning digital-first platform dedicated to helping mfds
                        grow their Assets Under Management (AUM) through cutting-edge technology and personalized support.
                    </p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl transform -translate-x-48 translate-y-48"></div>
        </section>
    );
};

export default HeroSection;
