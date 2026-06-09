import React from 'react';
import usePageStatistics from '../../hooks/usePageStatistics';

const Statistics: React.FC = () => {
    const fallbackStats = [
        { number: '9,186', description: 'Partners in 776 cities across India' },
        { number: '58,886', description: 'Customers spread over 3,000 pincodes' },
        { number: '49,15,512', description: 'Transactions Executed' },
        { number: 'Rs. 6,529', description: 'Crore- Transaction Value' },
    ];
    const { stats: displayStats, loading, error } = usePageStatistics('about', fallbackStats);

    const getIconUrl = (stat: typeof displayStats[number]): string | null => {
        if ("icon_image_url" in stat && stat.icon_image_url) {
            return stat.icon_image_url;
        }
        if ("icon_image" in stat && stat.icon_image) {
            return stat.icon_image;
        }
        return null;
    };

    return (
        <section className="py-12 md:py-20 bg-gradient-to-b from-[#243062] to-[#1a2550]">
            <div className="container-custom">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {loading ? (
                            <div className="text-white/90">Loading statistics...</div>
                        ) : error ? (
                            <div className="text-red-200">{error}</div>
                        ) : null}

                        {displayStats.map((stat, index) => {
                            const iconUrl = getIconUrl(stat);
                            return (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 md:p-8 text-center hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                            >
                                {iconUrl && (
                                    <div className="mb-3 md:mb-4 flex justify-center">
                                        <img
                                            src={iconUrl}
                                            alt={stat.description}
                                            className="w-12 h-12 md:w-14 md:h-14 object-contain"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = "none";
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight">
                                    {stat.number}
                                </div>
                                <div className="text-sm md:text-base text-white/90 leading-relaxed">
                                    {stat.description}
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statistics;

