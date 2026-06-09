import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { fetchCareers } from '../../../services/api';
import type { Career } from '../../../services/api';
import ImageCarousel from '../../../components/careers/ImageCarousel';

const Careers: React.FC = () => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        loadCareers();
    }, []);

    const loadCareers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchCareers();
            setCareers(data);
        } catch (err) {
            setError('Failed to load job openings. Please try again later.');
            console.error('Error loading careers:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyClick = (job: Career) => {
        navigate(`/career/apply/${job.id}`);
    };


    const benefits = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            title: 'Innovation',
            description: 'We embrace creativity to build cutting-edge solutions.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: 'Collaboration',
            description: 'Teamwork is at the heart of everything we do.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'Growth',
            description: 'We empower our employees to reach their full potential.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: 'Impact',
            description: 'Your work contributes to real-world outcomes.',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-16 md:pt-24 overflow-hidden bg-white">
                <div className="container-custom relative z-10">
                    <div className="max-w-6xl mx-auto">
                        {/* Breadcrumbs */}
                        <div className="mb-6">
                            <nav className="flex items-center space-x-2 text-sm">
                                <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                                    Home
                                </Link>
                                <span className="text-neutral-400">/</span>
                                <span className="text-neutral-500">Careers</span>
                            </nav>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Join Our Team
                        </h1>

                        <p className="text-base md:text-lg text-neutral-600 mb-8 leading-relaxed">
                            At Nivesh, we're building the future of financial services. Join us in our mission to make investing accessible, simple, and rewarding for everyone. We're looking for passionate individuals who want to make a difference.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Work With Us Section */}
            <section className="relative py-8 md:py-12 bg-neutral-50">
                <div className="container-custom relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-8 text-center">
                            Why Work With Us?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="text-primary mb-4">{benefit.icon}</div>
                                    <h3 className="text-xl font-semibold text-[#243062] mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Openings Section */}
            <section className="relative py-8 md:py-12 bg-white">
                <div className="container-custom relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-8 text-center">
                            Open Positions
                        </h2>
                        
                        {loading && (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                <p className="mt-4 text-neutral-600">Loading job openings...</p>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                                <p className="text-red-600">{error}</p>
                                <Button
                                    variant="primary"
                                    size="md"
                                    onClick={loadCareers}
                                    className="mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold"
                                >
                                    Retry
                                </Button>
                            </div>
                        )}

                        {!loading && !error && careers.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-lg text-neutral-600 mb-4">No job openings available at the moment.</p>
                                <p className="text-base text-neutral-500">Check back later or send us your resume for future opportunities.</p>
                            </div>
                        )}

                        {!loading && !error && careers.length > 0 && (
                            <div className="space-y-6">
                                {careers.map((job) => (
                                    <div
                                        key={job.id}
                                        className="bg-white border border-neutral-200 rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl md:text-2xl font-bold text-[#243062] mb-2">
                                                    {job.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-3">
                                                    <span className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {job.location}
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {job.job_type_display}
                                                    </span>
                                                    {job.number_of_openings > 0 && (
                                                        <span className="flex items-center gap-2">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            {job.number_of_openings} {job.number_of_openings === 1 ? 'opening' : 'openings'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                variant="primary"
                                                size="lg"
                                                onClick={() => handleApplyClick(job)}
                                                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                                            >
                                                Apply Now
                                            </Button>
                                        </div>
                                        <p className="text-base text-neutral-700 leading-relaxed">
                                            {job.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Life at Nivesh Section */}
            <section className="relative py-12 md:py-16 bg-white">
                <div className="container-custom relative z-10">
                    <div className="max-w-6xl mx-auto">
                        

                        {/* Life at Nivesh Content */}
                        <div className="mt-12 max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#243062] mb-6 text-center">
                                Life at Nivesh: Where Passion Meets Purpose
                            </h2>
                            <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                <p>
                                    At Nivesh, we believe that a career should be more than just a paycheck—it should be a journey of growth, discovery, and meaningful contribution. Our people are at the heart of everything we do, and we strive to create an environment where talent is nurtured, ideas are welcomed, and innovation thrives.
                                </p>
                                <p>
                                    Here, you'll find a culture that values collaboration over hierarchy, curiosity over convention, and integrity over shortcuts. We encourage open communication, continuous learning, and bold thinking, empowering every team member to bring their best self to work each day. Whether it's through mentorship programs, skill-building workshops, or cross-functional projects, we are committed to helping you unlock your potential and chart your career path with confidence.
                                </p>
                                <p>
                                    But it's not all work—at Nivesh, we celebrate each other's successes, promote well-being, and create spaces for connection, creativity, and fun. We believe that when people feel supported, respected, and inspired, they can achieve extraordinary results both personally and professionally.
                                </p>
                                <p>
                                    Join us at Nivesh and be part of a community that's shaping the future—where passion meets purpose, and every day offers new opportunities to learn, lead, and make a difference.
                                </p>
                            </div>
                        </div>

                        {/* Image Carousel */}
                        <ImageCarousel />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Careers;

