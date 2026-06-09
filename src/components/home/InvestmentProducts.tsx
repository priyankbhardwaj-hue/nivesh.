import React from 'react';

interface InvestmentProduct {
    name: string;
    illustration: string;
}

const InvestmentProducts: React.FC = () => {
    const products: InvestmentProduct[] = [
        {
            name: 'Mutual Fund',
            illustration: '💰',
        },
        {
            name: 'SIP',
            illustration: '📊',
        },
        {
            name: 'MLD',
            illustration: '🏦',
        },
        {
            name: 'Fixed Deposit',
            illustration: '⏰',
        },
        {
            name: 'PMS',
            illustration: '📈',
        },
        {
            name: 'AIF',
            illustration: '🎯',
        },
        {
            name: 'NPS',
            illustration: '👴',
        },
        {
            name: 'Bond',
            illustration: '🌱',
        },
    ];

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">
                        Products Suitable for All Requirements
                    </h2>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center group"
                        >
                            {/* Illustration Container */}
                            <div className="w-full aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                {/* Decorative Background */}
                                <div className="absolute inset-0 bg-white/40"></div>

                                {/* Emoji/Icon Placeholder */}
                                <div className="relative text-9xl">
                                    {product.illustration}
                                </div>
                            </div>

                            {/* Product Name Button */}
                            <button className="w-full py-3 px-6 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
                                {product.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InvestmentProducts;
