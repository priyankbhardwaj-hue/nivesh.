import React from 'react';
import usePageStatistics from '../../hooks/usePageStatistics';

const GrowthStatistics: React.FC = () => {
    const fallbackStats = [
        { number: '9,210', description: 'Partners across India' },
        { number: '3,000+', description: 'Customers spread pincodes' },
        { number: '47,00,000 +', description: 'Transactions Executed' },
    ];
    const { stats: displayStats, loading, error } = usePageStatistics('home', fallbackStats);

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
        <section className="bg-gradient-to-br from-primary via-primary-dark to-primary text-white">
            {/* Top Section - Map and Statistics */}
            <div className="py-20 md:py-32">
                <div className="container-custom">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                            We Have Grown From Strength to Strength
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        {/* India Map Illustration */}
                        <div className="flex justify-center">
                            <div className="relative w-full max-w-md">
                                <img
                                    src="https://nivesh.com/87cf2b70a3ba03a3a968e25fe1313a92.webp"
                                    alt="India Map with Nivesh Coverage"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="space-y-6">
                            {loading ? (
                                <div className="text-white/80">Loading statistics...</div>
                            ) : error ? (
                                <div className="text-red-200">{error}</div>
                            ) : null}

                            {displayStats.map((stat, index) => {
                                const iconUrl = getIconUrl(stat);
                                return (
                                <div
                                    key={index}
                                    className="group border-2 border-white/30 rounded-2xl p-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:border-white/60 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                                {stat.number}
                                            </div>
                                            <div className="text-white/90 group-hover:text-white transition-colors duration-300">
                                                {stat.description}
                                            </div>
                                        </div>
                                        <div className="ml-4 group-hover:scale-110 transition-transform duration-300">
                                            {iconUrl ? (
                                                <img
                                                    src={iconUrl}
                                                    alt={stat.description}
                                                    className="w-14 h-14 object-contain"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = "none";
                                                    }}
                                                />
                                            ) : (
                                                <svg className="w-14 h-14 text-white/90 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthStatistics;
