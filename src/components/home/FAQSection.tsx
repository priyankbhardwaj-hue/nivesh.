import React, { useState, useEffect } from 'react';
import { fetchFAQs } from '../../services/api';
import type { FAQ } from '../../services/api';

interface FAQCategory {
    name: string;
    faqs: FAQ[];
}

const FAQSection: React.FC = () => {
    const [categories, setCategories] = useState<FAQCategory[]>([]);
    const [activeCategory, setActiveCategory] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchFAQs();
                
                // Group FAQs by category
                const categoryMap = new Map<string, FAQ[]>();
                data.forEach((faq) => {
                    const categoryName = faq.category || 'General';
                    if (!categoryMap.has(categoryName)) {
                        categoryMap.set(categoryName, []);
                    }
                    categoryMap.get(categoryName)!.push(faq);
                });
                
                // Only show these three categories, in this order
                const allowedCategories = ['Partner', 'Platform Features', 'Products & Services'];
                const allCategories: FAQCategory[] = Array.from(categoryMap.entries())
                    .map(([name, faqs]) => {
                        // Deduplicate by question text (same Q&A shown only once)
                        const seen = new Set<string>();
                        const uniqueFaqs = faqs.filter((faq) => {
                            const key = (faq.question || '').trim().toLowerCase();
                            if (seen.has(key)) return false;
                            seen.add(key);
                            return true;
                        });
                        return { name, faqs: uniqueFaqs };
                    })
                
                const filteredCategories = allCategories
                    .filter((cat) => {
                        const normalized = cat.name.trim().toLowerCase();
                        return allowedCategories.some(
                            (allowed) => normalized === allowed.toLowerCase()
                        );
                    })
                    .sort((a, b) => {
                        const indexA = allowedCategories.findIndex(
                            (c) => c.toLowerCase() === a.name.trim().toLowerCase()
                        );
                        const indexB = allowedCategories.findIndex(
                            (c) => c.toLowerCase() === b.name.trim().toLowerCase()
                        );
                        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
                    });

                const categoryArray = filteredCategories.length > 0
                    ? filteredCategories
                    : allCategories.sort((a, b) => a.name.localeCompare(b.name));

                setCategories(categoryArray);
                
                // Set first category as active if available
                if (categoryArray.length > 0) {
                    setActiveCategory(0);
                    setOpenIndex(0);
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

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Helper function to format answer text (convert newlines to paragraphs, detect links, format bullet points)
    const formatAnswer = (answer: string): React.ReactNode => {
        // Check if answer contains HTML tags (from TinyMCE)
        const htmlTagRegex = /<[^>]+>/;
        const isHtml = htmlTagRegex.test(answer);
        
        if (isHtml) {
            // Answer contains HTML - render it as HTML
            return (
                <div className="prose prose-sm max-w-none text-neutral-300" dangerouslySetInnerHTML={{ __html: answer }} />
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

    if (loading) {
        return (
            <section className="py-20 md:py-32 bg-neutral-900 text-white mb-4">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-semibold mb-4">
                            Frequently asked
                            <br />
                            questions
                        </h2>
                    </div>
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <p className="mt-4 text-neutral-300">Loading FAQs...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 md:py-32 bg-neutral-900 text-white mb-4">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-semibold mb-4">
                            Frequently asked
                            <br />
                            questions
                        </h2>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-red-400 mb-4">{error}</p>
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

    if (categories.length === 0) {
        return (
            <section className="py-20 md:py-32 bg-neutral-900 text-white mb-4">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-semibold mb-4">
                            Frequently asked
                            <br />
                            questions
                        </h2>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-neutral-300">No FAQs available at the moment.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 md:py-32 bg-neutral-900 text-white mb-4">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-4">
                        Frequently asked
                        <br />
                        questions
                    </h2>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setActiveCategory(index);
                                setOpenIndex(0);
                            }}
                            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                activeCategory === index
                                ? 'bg-primary text-white'
                                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {categories[activeCategory]?.faqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className="border border-neutral-800 rounded-lg overflow-hidden"
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800 transition-colors"
                            >
                                <span className="text-lg font-medium pr-8">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                                        openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Answer */}
                            {openIndex === index && (
                                <div className="px-6 pb-6 text-neutral-300">
                                    {formatAnswer(faq.answer)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
