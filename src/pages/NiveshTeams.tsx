import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ContactModal from '@/components/modals/ContactModal';
import NiveshTeamImage from '../assets/nivesh-team.jpeg';
import { fetchFAQs } from '../services/api';
import type { FAQ } from '../services/api';
import usePageStatistics from '../hooks/usePageStatistics';

const NiveshTeams: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({});
    const [openServices, setOpenServices] = useState<{ [key: number]: boolean }>({ 0: true }); // First service open by default
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fallbackStats = [
        { number: '57%', description: 'of Indian employees report monetary issues as their primary source of stress.' },
        { number: '30%', description: 'of high-income earners continue to live precariously from one paycheck to another.' },
        { number: '74%', description: 'of employees now believe Financial Fitness support should be offered by their employers.' },
        { number: '2.2x', description: 'Employees suffering from financial stress are 2.2x more likely to quit.' },
    ];
    const { stats: displayStats, loading: statsLoading, error: statsError } = usePageStatistics(
        'nivesh-teams-financial-fitness',
        fallbackStats
    );

    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchFAQs();
                // Filter FAQs by category "nivesh-teams"
                const niveshTeamsFaqs = data.filter(faq => 
                    faq.category.toLowerCase() === 'nivesh-teams'
                );
                setFaqs(niveshTeamsFaqs);
                
                // Open first FAQ by default if available
                if (niveshTeamsFaqs.length > 0) {
                    setOpenFaqs({ 0: true });
                }
            } catch (err) {
                setError('Failed to load FAQs');
                console.error('Error loading FAQs:', err);
            } finally {
                setLoading(false);
            }
        };

        loadFAQs();
    }, []);

    const toggleFaq = (index: number) => {
        setOpenFaqs((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // Helper function to format answer text (convert newlines to paragraphs, detect links, format bullet points)
    const formatAnswer = (answer: string): React.ReactNode => {
        // Check if answer contains HTML tags (from TinyMCE)
        const htmlTagRegex = /<[^>]+>/;
        const isHtml = htmlTagRegex.test(answer);
        
        if (isHtml) {
            // Answer contains HTML - render it as HTML
            return (
                <div className="prose prose-sm max-w-none text-neutral-700" dangerouslySetInnerHTML={{ __html: answer }} />
            );
        }
        
        // Split by newlines to process line by line
        const lines = answer.split(/\n/).filter(line => line.trim());
        
        // Check if answer contains bullet points
        const hasBulletPoints = lines.some(line => {
            const trimmed = line.trim();
            return trimmed.startsWith('•') || trimmed.includes('•');
        });
        
        if (hasBulletPoints) {
            // Extract bullet points
            const bulletItems: string[] = [];
            const regularParagraphs: string[] = [];
            let inBulletList = false;
            
            lines.forEach((line) => {
                const trimmed = line.trim();
                
                if (trimmed.startsWith('•')) {
                    // Line starts with bullet
                    inBulletList = true;
                    const content = trimmed.substring(1).trim(); // Remove • and trim
                    if (content) {
                        bulletItems.push(content);
                    }
                } else if (trimmed.includes('•')) {
                    // Line contains bullet somewhere
                    inBulletList = true;
                    const parts = trimmed.split(/•/).map(p => p.trim()).filter(p => p);
                    bulletItems.push(...parts);
                } else if (trimmed) {
                    // Regular line
                    if (inBulletList && bulletItems.length > 0) {
                        // Continue last bullet item
                        bulletItems[bulletItems.length - 1] += ' ' + trimmed;
                    } else {
                        regularParagraphs.push(trimmed);
                    }
                }
            });
            
            // Render bullet list if we have items
            if (bulletItems.length > 0) {
                return (
                    <div className="space-y-4">
                        {regularParagraphs.length > 0 && (
                            <div>
                                {regularParagraphs.map((para, idx) => {
                                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                                    const parts = para.split(urlRegex);
                                    
                                    if (parts.length > 1) {
                                        return (
                                            <p key={idx} className="mb-4">
                                                {parts.map((part, partIndex) => {
                                                    if (part.match(urlRegex)) {
                                                        return (
                                                            <a
                                                                key={partIndex}
                                                                href={part}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-primary font-medium hover:underline"
                                                            >
                                                                {part}
                                                            </a>
                                                        );
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        );
                                    }
                                    return <p key={idx} className="mb-4">{para}</p>;
                                })}
                            </div>
                        )}
                        <ul className="space-y-2 mb-4">
                            {bulletItems.map((item, itemIndex) => {
                                // Check if item contains a URL
                                const urlRegex = /(https?:\/\/[^\s]+)/g;
                                const parts = item.split(urlRegex);
                                
                                if (parts.length > 1) {
                                    // Contains URL, render with link
                                    return (
                                        <li key={itemIndex} className="flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>
                                                {parts.map((part, partIndex) => {
                                                    if (part.match(urlRegex)) {
                                                        return (
                                                            <a
                                                                key={partIndex}
                                                                href={part}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-primary font-medium hover:underline"
                                                            >
                                                                {part}
                                                            </a>
                                                        );
                                                    }
                                                    return part;
                                                })}
                                            </span>
                                        </li>
                                    );
                                }
                                
                                // Regular bullet point
                                return (
                                    <li key={itemIndex} className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            }
        }
        
        // Split by double newlines to create paragraphs (fallback for non-bullet content)
        const paragraphs = answer.split(/\n\n+/).filter(p => p.trim());
        
        return (
            <div className="space-y-4">
                {paragraphs.map((paragraph, index) => {
                    // Check if paragraph contains a URL
                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                    const parts = paragraph.split(urlRegex);
                    
                    if (parts.length > 1) {
                        // Contains URL, render with link
                        return (
                            <p key={index} className="mb-4">
                                {parts.map((part, partIndex) => {
                                    if (part.match(urlRegex)) {
                                        return (
                                            <a
                                                key={partIndex}
                                                href={part}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary font-medium hover:underline"
                                            >
                                                {part}
                                            </a>
                                        );
                                    }
                                    return part;
                                })}
                            </p>
                        );
                    }
                    
                    // Regular paragraph
                    return (
                        <p key={index} className="mb-4">
                            {paragraph.trim()}
                        </p>
                    );
                })}
            </div>
        );
    };

    const toggleService = (index: number) => {
        setOpenServices((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-neutral-100 py-16 md:py-24 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <div className="mb-2">
                        <nav className="flex items-center space-x-2 text-sm">
                            <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                                Home
                            </Link>
                            <span className="text-neutral-400">/</span>
                            <span className="text-neutral-500">Nivesh Teams</span>
                        </nav>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 md:gap-6 items-center">
                        {/* Left Column - Text Content */}
                        <div className="lg:pr-6">
                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#243062] mb:mt-6 mb-2 md:mb-4 leading-tight">
                                Nivesh Teams
                            </h1>

                            {/* Introductory Paragraph */}
                            <p className="text-base md:text-lg text-neutral-700 mb-4 md:mb-4 leading-relaxed">
                                Nivesh Teams is a <strong className="text-[#243062] font-bold">Corporate Financial Fitness platform</strong> that:
                            </p>

                            {/* Bullet Points */}
                            <ul className="space-y-2 md:space-y-2 mb-4 md:mb-6">
                                {[
                                    "Develops employees' skills through interactive workshops.",
                                    'Provides goal specific recommendations.',
                                    'Equips them with smart investment and protection tools.',
                                ].map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-5 h-5 bg-[#243062] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Descriptive Paragraph */}
                            <p className="text-base md:text-lg text-neutral-700 mb-6 md:mb-8 leading-relaxed">
                            This goes beyond basic financial education — it is an integrated wellness platform that enables employees to build financial awareness and make informed decisions, while delivering tangible organisational benefits.     
                            </p>

                            {/* Call to Action Button */}
                            <div className="flex justify-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    I am Interested
                                </Button>
                            </div>
                        </div>

                        {/* Right Column - Image */}
                        <div className="relative lg:p-6">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl mr-2">
                                <img
                                    src={NiveshTeamImage}
                                    alt="Nivesh Teams"
                                    className="w-full h-[300px] md:h-[500px] lg:h-[550px] object-cover"
                                />
                                
                                
                                
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl transform -translate-x-48 translate-y-48"></div>
            </section>

            {/* Why Financial Fitness Matters Section */}
            <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <div className="container-custom">
                    <div className="max-w-5xl mx-auto">
                        {/* Main Title */}
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-4 md:mb-6 text-center leading-tight">
                            Why Does the Financial Fitness of Employees in India Matter Now More Than Ever?
                        </h2>

                        {/* Introductory Paragraphs */}
                        <div className="space-y-2 mb-6 md:mb-8">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                With the evolution of workplaces, employees have begun experiencing a greater degree of financial stress than ever before.
                            </p>
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                Most organizations take care of physical and mental wellness - yoga sessions, gym memberships, mental wellness days - while ignoring Financial Fitness.
                            </p>
                        </div>

                        {/* Statistics Section */}
                        <div className="mb-12 md:mb-16">
                            <p className="text-base md:text-lg font-bold text-[#243062] mb-6 text-center">
                                As per the Price Waterhouse Report:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                {statsLoading && (
                                    <div className="text-neutral-600">Loading statistics...</div>
                                )}
                                {statsError && (
                                    <div className="text-red-600">{statsError}</div>
                                )}
                                {displayStats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl p-4 md:p-6 shadow-lg border-2 border-primary hover:border-[#243062]/30 transition-all duration-300 text-center"
                                    >
                                        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-4">
                                            {stat.number}
                                        </div>
                                        <p className="text-xs md:text-sm text-neutral-700 leading-relaxed">
                                            {stat.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Concluding Paragraphs */}
                        <div className="space-y-4">
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                Long-term financial stress can directly transform into business risk. Inadequate Financial Fitness affects productivity, attrition, morale, and even the perception of the company's brand by its employees.
                            </p>
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                Companies who invest in their employees' Financial Fitness in India are reaping the benefits of <strong className="text-[#243062] font-bold">loyalty, performance, and engagement.</strong>
                            </p>
                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                            This is where  <strong className="text-[#243062] font-bold">Nivesh Teams</strong>, creates impact by supporting employees with financial education, informational assistance, and practical tools, delivered through an integrated platform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Why Choose Nivesh Teams?
                        </h2>
                        <p className="text-base md:text-lg text-neutral-600 max-w-3xl mx-auto">
                            Comprehensive financial solutions designed for modern HR departments
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                title: 'Employee Investment Solutions',
                                description: 'Provide your employees with access to a wide range of secure investment options including mutual funds, fixed deposits, and other financial products.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Financial Planning Tools',
                                description: 'Equip your employees with powerful financial planning tools and calculators to help them make informed investment decisions.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Expert Guidance',
                                description: 'Access to qualified financial advisors who can provide personalized investment advice and support to your employees.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Secure Platform',
                                description: 'Bank-grade security and data protection to ensure all employee financial information is kept safe and confidential.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Easy Administration',
                                description: 'Streamlined HR dashboard for easy employee management, reporting, and tracking of employee participation and engagement.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Customizable Benefits',
                                description: 'Tailor investment options and benefits packages to match your company\'s unique requirements and employee needs.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                ),
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-neutral-50 rounded-xl p-6 md:p-8 hover:bg-white hover:shadow-lg border border-neutral-100 transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-[#243062] rounded-lg flex items-center justify-center text-white mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                        Financial Fitness Necessities                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 md:mb-10 text-center leading-relaxed">
                            Here's why most financial programs fail:
                        </p>
                        <div className="space-y-4 md:space-y-5">
                            {[
                                'Lack of individual assistance - generic apps and articles do not solve real issues.',
                                'Lack of tracking - most programs do not incorporate measuring or tracking components.',
                                'Small scope - they do not provide basic products and services like insurance or investment tools.',
                                'Low participation - employees do not engage with the impersonal platforms.',
                                'Capital neglect in planning finances exposes companies to burnout, disengagement, and attrition.',
                            ].map((point, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed flex-1">
                                        {point}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            {/* <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 leading-tight">
                                Benefits for Your Organization
                            </h2>
                            <div className="space-y-4">
                                {[
                                    'Enhanced employee satisfaction and retention',
                                    'Comprehensive financial wellness program',
                                    'Reduced administrative burden on HR',
                                    'Access to expert financial advisors',
                                    'Customizable benefits packages',
                                    'Detailed analytics and reporting',
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                            {benefit}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-neutral-50 rounded-2xl p-8 md:p-12">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                Benefits for Your Employees
                            </h3>
                            <div className="space-y-4">
                                {[
                                    'Easy access to investment opportunities',
                                    'Professional financial planning guidance',
                                    'Secure and user-friendly platform',
                                    'Flexible investment options',
                                    'Educational resources and tools',
                                    'Dedicated support team',
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-[#243062] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                            {benefit}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Key Services Offered by Nivesh Teams Section */}
            <section className="py-12 md:py-20 bg-gradient-to-br from-[#243062] to-[#1a2347] text-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-bold mb-10 md:mb-12 text-center text-primary leading-tight">
                            Key Services Offered by Nivesh Teams
                        </h2>
                        <div className="space-y-4 md:space-y-5">
                            {[
                                {
                                    title: 'Financial Literacy Workshops',
                                    description: 'Move beyond standard presentations. Employees build practical financial awareness through interactive, participation-driven workshops focused on real-life scenarios, covering:',
                                    bullets: [
                                        ' Interactive sessions with qualified professionals, focused on financial concepts and best practices.',
                                        ' Understanding goal planning frameworks for life events such as home ownership, children’s education, and retirement.',
                                        'General financial planning approaches explained across different income ranges and life stages, helping employees better understand budgeting, saving, and long-term planning considerations.',
                                    ],
                                },
                                // {
                                //     title: 'Personalized Financial Consultations',
                                //     description: 'One-on-one consultations with certified financial advisors to create personalized financial roadmaps for each employee.',
                                //     bullets: [],
                                // },
                                {
                                    title: 'Customized Investment Planning in India',
                                    description: 'Tailored investment solutions aligned with Indian market conditions and employee financial goals.',
                                    bullets: [],
                                },
                                {
                                    title: 'End-to-End Financial Solutions',
                                    description: 'Comprehensive financial services covering all aspects of employee financial wellness and planning.',
                                    bullets: [],
                                },
                            ].map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleService(index)}
                                        className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-transparent border-none outline-none cursor-pointer hover:bg-neutral-50 transition-colors duration-200"
                                    >
                                        <h4 className="text-base md:text-lg font-bold text-[#243062] pr-4">
                                            {service.title}
                                        </h4>
                                        <svg
                                            className={`w-5 h-5 text-[#243062] flex-shrink-0 transition-transform duration-300 ${
                                                openServices[index] ? 'rotate-180' : ''
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {openServices[index] && (
                                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                                            <p className="text-sm md:text-base text-neutral-700 leading-relaxed mb-4">
                                                {service.description}
                                            </p>
                                            {service.bullets.length > 0 && (
                                                <ul className="space-y-2">
                                                    {service.bullets.map((bullet, bulletIndex) => (
                                                        <li key={bulletIndex} className="flex items-start gap-3">
                                                            <div className="w-5 h-5 bg-[#243062] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                                                {bullet}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How Nivesh Teams Benefits Your Business Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                            How Nivesh Teams Benefits Your Business?
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 md:mb-10 text-center leading-relaxed">
                            Employers benefit just as much as employees. Here's what your business gains:
                        </p>
                        <div className="space-y-4 md:space-y-5">
                            {[
                                'Higher Retention: Reduce talent churn by showing real care.',
                                'Better Productivity: Less stress = sharper focus.',
                                'Stronger Culture: Financial empowerment builds trust.',
                                'Improved Job Satisfaction: Employees feel supported in real ways.',
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-[#243062] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-sm md:text-base text-neutral-700 leading-relaxed flex-1">
                                        {benefit}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Real Stories, Real Change Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#243062] mb-10 md:mb-12 text-center leading-tight">
                            Real Stories, Real Change
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                {
                                    before: 'Credit card debt, no roadmap, underinsured.',
                                    after: 'Cleared high-interest debt, built a financial roadmap, insured his family, and is now investing with clarity and purpose.',
                                    client: 'Madhav, VP (Age 35)',
                                },
                                {
                                    before: 'Idle savings, no retirement planning, uninsured family.',
                                    after: 'Activated a retirement and tax-saving plan, secured her family, and now mentors younger colleagues on financial fitness.',
                                    client: 'Priya, SVP (Age 45)',
                                },
                                {
                                    before: 'Confused about savings, unaware of investment options.',
                                    after: 'Started SIPs, saved for marriage and travel, and now feels financially independent.',
                                    client: 'Amit, Manager (Age 29)',
                                },
                            ].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-neutral-100 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="mb-4">
                                        <p className="text-sm font-semibold text-red-600 mb-2">Before:</p>
                                        <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                            {testimonial.before}
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-sm font-semibold text-green-600 mb-2">After:</p>
                                        <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                            {testimonial.after}
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-neutral-200">
                                        <p className="text-sm md:text-base font-semibold text-[#243062]">
                                            {testimonial.client}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Get Started Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#243062] mb-6 md:mb-8 text-center leading-tight">
                            How to Get Started?
                        </h2>
                        <p className="text-base md:text-lg text-neutral-700 mb-8 md:mb-12 text-center leading-relaxed">
                            Starting with Nivesh is easy as 1, 2, 3 and 4! <strong className="text-[#243062] font-bold">YOU CAN</strong>
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {[
                                {
                                    step: '1',
                                    title: 'Launch Workshop',
                                    description: 'Conduct a launch workshop for awareness creation.',
                                    boldText: 'launch workshop',
                                },
                                {
                                    step: '2',
                                    title: 'Leadership Buy-in',
                                    description: 'Run a leadership buy-in session for getting the buy-in internally.',
                                    boldText: 'leadership buy-in session',
                                },
                                {
                                    step: '3',
                                    title: 'Branded Portal',
                                    description: 'Create a branded shared portal for employees to access planning tools remotely.',
                                    boldText: 'branded shared portal',
                                },
                                {
                                    step: '4',
                                    title: 'HRMS Integration',
                                    description: 'Integrate with HRMS for onboarding and tracking purposes.',
                                    boldText: 'HRMS',
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="relative bg-white rounded-xl p-6 md:p-8 shadow-lg border-2 border-[#243062]/10 hover:border-[#243062]/30 transition-all duration-300"
                                >
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-16 h-16 bg-[#243062] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                                            {item.step}
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-[#243062] mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-neutral-700 leading-relaxed flex-1">
                                            {item.description.split(item.boldText).map((part, i, arr) => (
                                                <React.Fragment key={i}>
                                                    {part}
                                                    {i < arr.length - 1 && <strong className="text-[#243062] font-bold">{item.boldText}</strong>}
                                                </React.Fragment>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Conclusion Section */}
            <section className="py-12 md:py-20 bg-gradient-to-br from-[#243062] to-[#1a2347] text-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-center leading-tight">
                            Conclusion
                        </h2>
                        <h3 className="text-xl md:text-2xl font-semibold mb-8 md:mb-12 text-center">
                            Let's Build a Financially Fit Workforce - Together
                        </h3>
                        <div className="mb-8 md:mb-12">
                            <div className="flex items-start gap-4">
                                <div className="w-1 h-auto bg-white/30 rounded-full flex-shrink-0"></div>
                                <div>
                                    <p className="text-lg md:text-2xl italic leading-relaxed mb-4">
                                        "You can't expect employees to give their best at work if they're constantly worried about money."
                                    </p>
                                    <p className="text-base md:text-lg text-white/80">
                                        - Arianna Huffington
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 text-center">
                            <p className="text-base md:text-lg text-white/90 leading-relaxed">
                                With this benefit and many more, Nivesh Teams shifts the expectation of progressive employers in India.
                            </p>
                            <p className="text-lg md:text-xl font-bold text-white leading-relaxed">
                                Nurture a culture of Financial Fitness in your organisation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Frequently Asked Questions Section */}
            <section className="py-12 md:py-20 bg-neutral-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-bold text-[#243062] mb-10 md:mb-12 text-center leading-tight">
                            Frequently Asked Questions
                        </h2>
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                <p className="mt-4 text-neutral-600">Loading FAQs...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12">
                                <p className="text-red-500 mb-4">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-primary hover:underline"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : faqs.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-neutral-600">No FAQs available at the moment.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 md:space-y-5">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={faq.id}
                                        className="bg-white rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-300 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-transparent border-none outline-none cursor-pointer hover:bg-neutral-50 transition-colors duration-200"
                                        >
                                            <h5 className="text-base md:text-lg font-bold text-[#243062] pr-4">
                                                Q{index + 1}. {faq.question}
                                            </h5>
                                            <svg
                                                className={`w-5 h-5 text-[#243062] flex-shrink-0 transition-transform duration-300 ${
                                                    openFaqs[index] ? 'rotate-180' : ''
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {openFaqs[index] && (
                                            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                                                <div className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                                    {formatAnswer(faq.answer)}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                pageSource="Nivesh Teams"
            />
        </div>
    );
};

export default NiveshTeams;

