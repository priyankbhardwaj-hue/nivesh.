import React from 'react';
import Button from '../ui/Button';

export interface InterestRate {
    institution: string;
    rates: {
        '1 Year': string | number;
        '2 Year': string | number;
        '3 Year': string | number;
        '5 Year': string | number;
    };
    investLink?: string;
}

interface InterestRatesComparisonProps {
    title?: string;
    rates: InterestRate[];
    onInvestClick?: (institution: string, link?: string) => void;
}

const InterestRatesComparison: React.FC<InterestRatesComparisonProps> = ({
    title = 'Corporate Fixed Deposit Interest Rates Comparison',
    rates,
    onInvestClick,
}) => {
    const handleInvestClick = (institution: string, link?: string) => {
        if (onInvestClick) {
            onInvestClick(institution, link);
        } else if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
        } else {
            window.open('https://app.nivesh.com', '_blank', 'noopener,noreferrer');
        }
    };

    const formatRate = (rate: string | number): string => {
        if (rate === 0 || rate === '0' || rate === null || rate === undefined) {
            return '0%';
        }
        if (typeof rate === 'number') {
            return `${rate}%`;
        }
        return rate.toString().includes('%') ? rate.toString() : `${rate}%`;
    };

    return (
        <section className="py-12 md:py-20 bg-neutral-50">
            <div className="container-custom">
                <h2 className="text-2xl md:text-4xl font-bold text-[#243062] mb-12 text-center">
                    {title}
                </h2>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg border border-neutral-100">
                    <div className="min-w-full bg-white">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#243062] text-white">
                                    <th className="px-6 py-4 text-left font-bold text-sm md:text-base rounded-tl-2xl">Financial Institution</th>
                                    <th className="px-6 py-4 text-center font-bold text-sm md:text-base">1 Year</th>
                                    <th className="px-6 py-4 text-center font-bold text-sm md:text-base">2 Year</th>
                                    <th className="px-6 py-4 text-center font-bold text-sm md:text-base">3 Year</th>
                                    <th className="px-6 py-4 text-center font-bold text-sm md:text-base">5 Year</th>
                                    <th className="px-6 py-4 text-center font-bold text-sm md:text-base rounded-tr-2xl">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rates.map((rate, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                                        } hover:bg-primary/5 transition-colors duration-200 border-b border-neutral-100 last:border-b-0`}
                                    >
                                        <td className="px-6 py-4 font-semibold text-sm md:text-base text-neutral-900">
                                            {rate.institution}
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm md:text-base text-neutral-700 font-medium">
                                            {formatRate(rate.rates['1 Year'])}
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm md:text-base text-neutral-700 font-medium">
                                            {formatRate(rate.rates['2 Year'])}
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm md:text-base text-neutral-700 font-medium">
                                            {formatRate(rate.rates['3 Year'])}
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm md:text-base text-neutral-700 font-medium">
                                            {formatRate(rate.rates['5 Year'])}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => handleInvestClick(rate.institution, rate.investLink)}
                                                className="text-xs md:text-sm"
                                            >
                                                Invest Now
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {rates.map((rate, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100">
                                <h3 className="font-bold text-base text-neutral-900">{rate.institution}</h3>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleInvestClick(rate.institution, rate.investLink)}
                                    className="text-xs"
                                >
                                    Invest Now
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-neutral-50 rounded-lg p-3">
                                    <div className="text-xs text-neutral-600 mb-1">1 Year</div>
                                    <div className="font-bold text-neutral-900 text-base">{formatRate(rate.rates['1 Year'])}</div>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-3">
                                    <div className="text-xs text-neutral-600 mb-1">2 Year</div>
                                    <div className="font-bold text-neutral-900 text-base">{formatRate(rate.rates['2 Year'])}</div>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-3">
                                    <div className="text-xs text-neutral-600 mb-1">3 Year</div>
                                    <div className="font-bold text-neutral-900 text-base">{formatRate(rate.rates['3 Year'])}</div>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-3">
                                    <div className="text-xs text-neutral-600 mb-1">5 Year</div>
                                    <div className="font-bold text-neutral-900 text-base">{formatRate(rate.rates['5 Year'])}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InterestRatesComparison;

