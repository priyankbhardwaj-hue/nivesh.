import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

// Import Award Images
import award1 from '../../assets/award1.jpeg';
import award2 from '../../assets/award2.webp';
import award3 from '../../assets/award3.webp';
import award4 from '../../assets/award4.webp';
import award5 from '../../assets/award5.webp';
// import award6 from '../../assets/award6.png';
// import award7 from '../../assets/award7.jpg';
// import award8 from '../../assets/award8.jpg';
import award9 from '../../assets/award9.jpeg';

const CallToAction: React.FC = () => {
    const navigate = useNavigate();
    
    const awards = [
        { img: award1, title: "Recognized by AMFI for Growth & Inclusion (2025)" },
        { img: award2, title: "BFSI 50 Most Trusted Brands" },
        { img: award3, title: "WEALTHTECH100 (2020)" },
        { img: award4, title: "Excellence in Finance (2019)" },
        { img: award5, title: "Startup Superhero Hunt (2018)" },
        { img: award9, title: "BSE Best Performer in MFD (2023, 2024, 2025)" },
        // { img: award7, title: "Best SIP Performer in MFD Category" },
        // { img: award8, title: "Best Performer in MFD Category - North Region" }
    ];

    return (
        <section className="py-24 md:py-32 bg-gradient-to-br from-primary via-primary-dark to-primary text-white">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl text-gray-300 font-bold mb-8 leading-tight">
                        Your Journey From MFDs To <br />
                        <span className="text-white">Digital Wealth Brand Starts Here.</span>
                    </h2>

                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Whether you’re starting fresh or scaling up, Nivesh gives you the platform, products, and partner ecosystem to grow faster and smarter.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button 
                            variant="primary" 
                            size="lg" 
                            className="bg-black text-primary hover:bg-neutral-800 shadow-lg border-none"
                            onClick={() => navigate('/partner')}
                        >
                            Join as MFD
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white text-white hover:bg-white/10"
                            onClick={() => navigate('/partner/become-mutual-fund-distributors')}
                        >
                            Become an MFD →
                        </Button>
                    </div>
                </div>

                {/* Awards Section */}
                <div className="bg-white rounded-3xl p-12 shadow-xl">
                    <h3 className="text-2xl md:text-4xl font-bold text-center text-neutral-900 mb-12">
                        Recognized & Awarded Both in India and Internationally
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                        {awards.map((award, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="h-32 flex items-end justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                                    <img
                                        src={award.img}
                                        alt={award.title}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                                <p className="text-sm md:text-base font-semibold text-neutral-800 leading-tight">
                                    {award.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
