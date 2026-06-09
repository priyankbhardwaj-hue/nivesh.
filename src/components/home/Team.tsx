import React, { useState, useRef } from 'react';

interface TeamMember {
    name: string;
    role: string;
    experience: string;
    description: string;
    imageUrl: string;
}

const Team: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const teamMembers: TeamMember[] = [
        {
            name: 'Rajesh Sharma',
            role: 'Founder & CEO',
            experience: '15+ years of experience',
            description: 'On a mission to empower Indians to invest better and build lasting wealth.',
            imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
        },
        {
            name: 'Priya Mehta',
            role: 'Head of Investment Strategy',
            experience: '12+ years of experience',
            description: 'Turning complex market data into simple, actionable insights for better decisions.',
            imageUrl: 'https://randomuser.me/api/portraits/women/72.jpg',
        },
        {
            name: 'Amit Kumar',
            role: 'Head of Product',
            experience: '10+ years of experience',
            description: 'Designing intuitive experiences that make investing feel effortless.',
            imageUrl: 'https://randomuser.me/api/portraits/men/78.jpg',
        },
        {
            name: 'Neha Patel',
            role: 'Head of Customer Success',
            experience: '8+ years of experience',
            description: 'Building products to make wealth expertise accessible to everyone.',
            imageUrl: 'https://randomuser.me/api/portraits/women/89.jpg',
        },
        {
            name: 'Vikram Singh',
            role: 'Head of Engineering',
            experience: '12+ years of experience',
            description: 'Building robust systems that make wealth-building tools fast, safe, and scalable.',
            imageUrl: 'https://randomuser.me/api/portraits/men/91.jpg',
        },
        {
            name: 'Anjali Verma',
            role: 'Head of Content',
            experience: '7+ years of experience',
            description: 'Crafting stories that simplify investing and help you make decisions, all on your own.',
            imageUrl: 'https://randomuser.me/api/portraits/women/94.jpg',
        },
    ];

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const newScrollLeft =
                direction === 'left'
                    ? scrollContainerRef.current.scrollLeft - scrollAmount
                    : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth',
            });

            setTimeout(checkScrollButtons, 300);
        }
    };

    return (
        <section className="py-24 md:py-32 bg-neutral-50">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 max-w-3xl mx-auto leading-tight">
                        Built by an experienced
                        <br />
                        and passionate team
                    </h2>
                </div>

                {/* Scrollable Team Cards Container */}
                <div className="relative">
                    {/* Scroll Container */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScrollButtons}
                        className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow snap-start"
                            >
                                {/* Profile Image - Centered */}
                                <div className="flex justify-center mb-6">
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full object-cover grayscale"
                                    />
                                </div>

                                {/* Name */}
                                <h3 className="text-xl font-semibold text-neutral-900 mb-1 text-center">
                                    {member.name}
                                </h3>

                                {/* Role */}
                                <div className="text-base text-neutral-700 font-medium mb-1 text-center">
                                    {member.role}
                                </div>

                                {/* Experience */}
                                <div className="text-sm text-neutral-500 mb-4 text-center">
                                    {member.experience}
                                </div>

                                {/* Description */}
                                <p className="text-neutral-600 leading-relaxed text-center text-sm">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${canScrollLeft
                                ? 'border-primary text-primary hover:bg-primary hover:text-white'
                                : 'border-neutral-300 text-neutral-300 cursor-not-allowed'
                                }`}
                            aria-label="Scroll left"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${canScrollRight
                                ? 'border-primary text-primary hover:bg-primary hover:text-white'
                                : 'border-neutral-300 text-neutral-300 cursor-not-allowed'
                                }`}
                            aria-label="Scroll right"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Team;
