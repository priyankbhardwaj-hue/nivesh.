import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Favicon from '../../assets/Favicon.png';
import { fetchTestimonials, convertYouTubeUrlToEmbed } from '../../services/api';
import type { Testimonial } from '../../services/api';

const TextTestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 150; // Character limit for preview
    const shouldTruncate = testimonial.testimonial.length > maxLength;
    const displayRole = testimonial.company || testimonial.role || 'Partner';

    return (
        <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            {/* Content */}
            <div className={`flex-grow mb-6 relative ${isExpanded ? 'overflow-y-auto max-h-60 pr-2' : ''}`}>
                <p className="text-lg text-neutral-700 italic leading-relaxed">
                    "{isExpanded ? testimonial.testimonial : `${testimonial.testimonial.slice(0, maxLength)}${shouldTruncate ? '...' : ''}`}"
                </p>
                {shouldTruncate && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-primary font-semibold text-sm mt-2 hover:underline focus:outline-none"
                    >
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-neutral-100 pt-4 mt-auto">
                <img
                    src={testimonial.image_url || Favicon}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full bg-neutral-100 object-contain"
                />
                <div>
                    <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                    <div className="text-sm text-neutral-500">{displayRole}</div>
                </div>
            </div>
        </Card>
    );
};

const VideoTestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
    const embedUrl = convertYouTubeUrlToEmbed(testimonial.youtube_video_url);
    const displayRole = testimonial.company || testimonial.role || 'Partner';

    if (!embedUrl) {
        return null;
    }

    return (
        <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
            {/* Video */}
            <div className="mb-4 rounded-lg overflow-hidden bg-neutral-100 relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                    src={embedUrl}
                    title={testimonial.video_title || 'Testimonial Video'}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            {/* Video Title */}
            {testimonial.video_title && (
                <h4 className="text-lg font-semibold text-neutral-900 mb-4">{testimonial.video_title}</h4>
            )}

            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-neutral-100 pt-4 mt-auto">
                <img
                    src={testimonial.image_url || Favicon}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full bg-neutral-100 object-contain"
                />
                <div>
                    <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                    <div className="text-sm text-neutral-500">{displayRole}</div>
                </div>
            </div>
        </Card>
    );
};



interface TestimonialsProps {
    variant?: 'home' | 'default';
    /** When false, hides the "See All" button (e.g. on the full Testimonials page). */
    showSeeAll?: boolean;
    /** 'carousel' = horizontal scroll; 'grid' = normal grid layout (e.g. for full Testimonials page). */
    layout?: 'carousel' | 'grid';
}

const Testimonials: React.FC<TestimonialsProps> = ({ variant = 'home', showSeeAll = true, layout = 'carousel' }) => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTestimonials = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchTestimonials();
                setTestimonials(data);
            } catch (err) {
                setError('Failed to load testimonials');
                console.error('Error loading testimonials:', err);
            } finally {
                setLoading(false);
            }
        };

        loadTestimonials();
    }, []);

    // Separate video and text testimonials
    const videoTestimonials = testimonials.filter(t => t.testimonial_type === 'video' && t.youtube_video_url);
    const textTestimonials = testimonials.filter(t => t.testimonial_type === 'text' && t.testimonial);

    const renderHeader = () => {
        if (variant === 'home') {
            return (
                <h2 className="text-2xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                    Distributors Across India Are <br />
                    <span className="text-primary">Scaling Faster With Nivesh.</span>
                </h2>
            );
        } else {
            return (
                <h2 className="text-2xl md:text-5xl font-bold text-[#243062] mb-6 leading-tight">
                    Testimonials
                </h2>
            );
        }
    };

    if (loading) {
        return (
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        {renderHeader()}
                    </div>
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <p className="mt-4 text-neutral-600">Loading testimonials...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        {renderHeader()}
                    </div>
                    <div className="text-center py-12">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-primary hover:underline"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    {renderHeader()}
                </div>

                {/* Video Testimonials */}
                {videoTestimonials.length > 0 && (
                    <div className="mb-12">
                        {layout === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                                {videoTestimonials.map((testimonial) => (
                                    <div key={testimonial.id}>
                                        <VideoTestimonialCard testimonial={testimonial} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide max-w-6xl mx-auto scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
                                {videoTestimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="flex-shrink-0 w-[90%] sm:w-[400px] md:w-[450px]">
                                        <VideoTestimonialCard testimonial={testimonial} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Text Testimonials */}
                {textTestimonials.length > 0 && (
                    <div>
                        {layout === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                                {textTestimonials.map((testimonial) => (
                                    <div key={testimonial.id}>
                                        <TextTestimonialCard testimonial={testimonial} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide max-w-6xl mx-auto scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
                                {textTestimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="flex-shrink-0 w-[90%] sm:w-[400px] md:w-[450px]">
                                        <TextTestimonialCard testimonial={testimonial} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {testimonials.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-neutral-600">No testimonials available at the moment.</p>
                    </div>
                )}

                {/* See All - bottom center */}
                {testimonials.length > 0 && showSeeAll && (
                    <div className="text-center mt-12">
                        <Link
                            to="/testimonials"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-200"
                        >
                            See All
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
