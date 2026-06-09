import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchNFOById, fetchNFOs, type NFO } from '../../services/api';

const NFOsDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [nfo, setNfo] = useState<NFO | null>(null);
    const [relatedNFOs, setRelatedNFOs] = useState<NFO[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            loadNFO(id);
            loadRelatedNFOs();
        }
    }, [id]);

    const loadNFO = async (nfoId: string) => {
        setLoading(true);
        try {
            const data = await fetchNFOById(nfoId);
            setNfo(data);
        } catch (error) {
            console.error('Error loading NFO:', error);
            setNfo(null);
        } finally {
            setLoading(false);
        }
    };

    const loadRelatedNFOs = async () => {
        try {
            const result = await fetchNFOs(1, undefined, undefined);
            // Get first 5 NFOs excluding current one
            const related = (result.nfos || []).slice(0, 5);
            setRelatedNFOs(related);
        } catch (error) {
            console.error('Error loading related NFOs:', error);
            setRelatedNFOs([]);
        }
    };

    const getImageUrl = (nfoItem: NFO): string => {
        if (nfoItem.image_url && nfoItem.image_url.trim() !== '') {
            return nfoItem.image_url;
        }
        if (nfoItem.image && nfoItem.image.trim() !== '') {
            return nfoItem.image;
        }
        return '/placeholder-nfo.jpg';
    };

    // Extract headings from content for table of contents
    const extractHeadings = (htmlContent: string): string[] => {
        const headingRegex = /<h2[^>]*>([^<]+)<\/h2>/gi;
        const headings: string[] = [];
        let match;
        while ((match = headingRegex.exec(htmlContent)) !== null) {
            headings.push(match[1].trim());
        }
        return headings;
    };

    // Add IDs to h2 headings in HTML content for anchor navigation
    const addIdsToHeadings = (htmlContent: string): string => {
        if (!htmlContent) return '';
        
        let index = 0;
        return htmlContent.replace(/<h2([^>]*)>([^<]+)<\/h2>/gi, (match, attributes, text) => {
            // Check if id already exists
            if (attributes && attributes.includes('id=')) {
                return match;
            }
            // Add id attribute
            const id = `heading-${index}`;
            index++;
            return `<h2${attributes} id="${id}">${text}</h2>`;
        });
    };

    // Handle smooth scroll to section
    const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const offset = 100; // Offset for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <div className="container-custom px-4 md:px-6 py-6 md:py-8">
                    <div className="animate-pulse">
                        <div className="h-48 sm:h-64 bg-neutral-200 rounded-lg mb-4 md:mb-6"></div>
                        <div className="h-6 sm:h-8 bg-neutral-200 rounded w-3/4 mb-3 md:mb-4"></div>
                        <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!nfo) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#243062] mb-3 md:mb-4">NFO Not Found</h1>
                    <Link to="/nfos" className="text-sm sm:text-base text-primary hover:text-primary-dark">
                        ← Back to NFOs
                    </Link>
                </div>
            </div>
        );
    }

    const headings = extractHeadings(nfo.content || '');
    const imageUrl = getImageUrl(nfo);

    return (
        <div className="min-h-screen bg-neutral-50 overflow-x-hidden">
            {/* Hero Section */}
            <section className="pt-16 md:pt-20 lg:pt-24 pb-6 md:pb-8 lg:pb-12 bg-white">
                <div className="container-custom px-4 md:px-6">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center flex-wrap space-x-2 text-xs md:text-sm mb-4 md:mb-6">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                            Home
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <Link to="/nfos" className="text-primary hover:text-primary-dark transition-colors">
                            NFOs
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500 line-clamp-1">{nfo.title}</span>
                    </nav>

                    {/* NFO Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-4 md:mb-6 lg:mb-8 leading-tight text-center mx-auto max-w-4xl">
                        {nfo.title}
                    </h2>

                    {/* Hero Image */}
                    <div className="relative w-full mb-6 md:mb-8">
                        <img
                            src={imageUrl}
                            alt={nfo.title}
                            className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-contain rounded-lg"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-nfo.jpg';
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-6 md:py-8 lg:py-12">
                <div className="container-custom px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 md:gap-8">
                        {/* Left Column - Main Content */}
                        <div className="min-w-0 overflow-hidden">
                            {/* NFO Period Info */}
                            {(nfo.nfo_period_start || nfo.nfo_period_end) && (
                                <div className="bg-white rounded-lg border border-neutral-200 p-4 sm:p-6 mb-6 md:mb-8 shadow-sm">
                                    <h3 className="text-lg sm:text-xl font-bold text-[#243062] mb-3 md:mb-4">NFO Period</h3>
                                    <div className="space-y-2 text-sm sm:text-base text-neutral-700">
                                        {nfo.nfo_period_start && (
                                            <p>
                                                <span className="font-semibold">Start Date:</span>{' '}
                                                {new Date(nfo.nfo_period_start).toLocaleDateString()}
                                            </p>
                                        )}
                                        {nfo.nfo_period_end && (
                                            <p>
                                                <span className="font-semibold">End Date:</span>{' '}
                                                {new Date(nfo.nfo_period_end).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Table of Contents */}
                            {headings.length > 0 && (
                                <div className="bg-white rounded-lg border border-neutral-200 p-4 sm:p-6 mb-6 md:mb-8 shadow-sm">
                                    <h3 className="text-lg sm:text-xl font-bold text-[#243062] mb-3 md:mb-4">Table of Contents</h3>
                                    <ul className="space-y-2 md:space-y-3">
                                        {headings.map((heading, index) => (
                                            <li key={index}>
                                                <a
                                                    href={`#heading-${index}`}
                                                    onClick={(e) => handleScrollToSection(e, `heading-${index}`)}
                                                    className="text-neutral-700 hover:text-primary transition-colors text-sm sm:text-base flex items-start cursor-pointer"
                                                >
                                                    <span className="text-primary mr-2 font-semibold flex-shrink-0">{index + 1}.</span>
                                                    <span className="break-words">{heading}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* NFO Content */}
                            {nfo.content && (
                                <div className="bg-white rounded-lg border border-neutral-200 p-3 sm:p-4 md:p-6 lg:p-8 shadow-sm overflow-hidden">
                                    <div
                                        className="prose prose-lg max-w-none blog-content"
                                        dangerouslySetInnerHTML={{ __html: addIdsToHeadings(nfo.content) }}
                                        style={{
                                            color: '#030303',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontSize: 'clamp(17px, 4vw, 20px)',
                                            wordWrap: 'break-word',
                                            overflowWrap: 'break-word',
                                        }}
                                    />
                                    <style>{`
                                        .blog-content {
                                            overflow-x: hidden;
                                            word-wrap: break-word;
                                            overflow-wrap: break-word;
                                            max-width: 100%;
                                        }
                                        .blog-content * {
                                            max-width: 100%;
                                            box-sizing: border-box;
                                        }
                                        .blog-content img {
                                            max-width: 100% !important;
                                            height: auto !important;
                                            display: block;
                                            margin: 1rem 0;
                                        }
                                        .blog-content table {
                                            width: 100% !important;
                                            max-width: 100% !important;
                                            display: block;
                                            overflow-x: auto;
                                            -webkit-overflow-scrolling: touch;
                                            margin: 1rem 0;
                                        }
                                        .blog-content table td,
                                        .blog-content table th {
                                            word-break: break-word;
                                            overflow-wrap: break-word;
                                        }
                                        .blog-content pre,
                                        .blog-content code {
                                            max-width: 100%;
                                            overflow-x: auto;
                                            word-break: break-word;
                                            white-space: pre-wrap;
                                        }
                                        .blog-content iframe,
                                        .blog-content video,
                                        .blog-content embed {
                                            max-width: 100% !important;
                                            height: auto !important;
                                        }
                                        .blog-content h2[id] {
                                            scroll-margin-top: 100px;
                                        }
                                        @media (min-width: 768px) {
                                            .blog-content h2[id] {
                                                scroll-margin-top: 120px;
                                            }
                                        }
                                        .blog-content p {
                                            font-size: clamp(17px, 3.5vw, 18px);
                                            line-height: 1.6;
                                            margin-bottom: 1rem;
                                            word-wrap: break-word;
                                            overflow-wrap: break-word;
                                        }
                                        .blog-content h1 {
                                            font-size: clamp(16px, 4vw, 28px);
                                            margin-top: 1.5rem;
                                            margin-bottom: 1rem;
                                            word-wrap: break-word;
                                            overflow-wrap: break-word;
                                        }
                                        .blog-content h2 {
                                            font-size: clamp(15px, 3.5vw, 24px);
                                            margin-top: 1.5rem;
                                            margin-bottom: 1rem;
                                            word-wrap: break-word;
                                            overflow-wrap: break-word;
                                        }
                                        .blog-content h3 {
                                            font-size: clamp(12px, 3vw, 20px);
                                            margin-top: 1.25rem;
                                            margin-bottom: 0.75rem;
                                            word-wrap: break-word;
                                            overflow-wrap: break-word;
                                        }
                                        .blog-content h4,
                                        .blog-content h5,
                                        .blog-content h6 {
                                            font-size: clamp(14px, 2.5vw, 18px);
                                            margin-top: 1rem;
                                            margin-bottom: 0.5rem;
                                            word-wrap: break-word;
                                            overflow-wrap: break-word;
                                        }
                                        .blog-content ul,
                                        .blog-content ol {
                                            font-size: clamp(17px, 3.5vw, 18px);
                                            padding-left: 1.5rem;
                                            word-wrap: break-word;
                                            overflow-wrap: break-word;
                                        }
                                        .blog-content li {
                                            margin-bottom: 0.5rem;
                                            word-wrap: break-word;
                                            overflow-wrap: break-word;
                                        }
                                        .blog-content a {
                                            word-break: break-all;
                                            overflow-wrap: break-word;
                                        }
                                    `}</style>
                                </div>
                            )}

                            {/* Empty state if no content */}
                            {!nfo.content && (
                                <div className="bg-white rounded-lg border border-neutral-200 p-4 sm:p-6 md:p-8 shadow-sm">
                                    <p className="text-sm sm:text-base text-neutral-600">No content available for this NFO.</p>
                                </div>
                            )}
                        </div>

                        {/* Right Sidebar - Search and Related NFOs */}
                        <div className="lg:sticky lg:top-6 lg:h-fit space-y-4 md:space-y-6 min-w-0">
                            {/* Search NFO Title */}
                            <div className="bg-white rounded-lg border border-neutral-200 p-4 md:p-6 shadow-sm">
                                <h3 className="text-base sm:text-lg font-bold text-[#243062] mb-3 md:mb-4">Search NFO Title</h3>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (searchQuery.trim()) {
                                            navigate(`/nfos?search=${encodeURIComponent(searchQuery.trim())}`);
                                        }
                                    }}
                                    className="flex gap-2"
                                >
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search..."
                                        className="flex-1 min-w-0 px-3 sm:px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs sm:text-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center flex-shrink-0"
                                        aria-label="Search"
                                    >
                                        <svg
                                            className="w-4 h-4 sm:w-5 sm:h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </div>

                            {/* Related NFOs */}
                            <div className="bg-white rounded-lg border border-neutral-200 p-4 md:p-6 shadow-sm">
                                <h3 className="text-base sm:text-lg font-bold text-[#243062] mb-3 md:mb-4">Related NFOs</h3>
                                <ul className="space-y-2 md:space-y-3">
                                    {relatedNFOs
                                        .filter((n) => n.id !== nfo.id)
                                        .slice(0, 5)
                                        .map((relatedNFO) => (
                                            <li key={relatedNFO.id}>
                                                <Link
                                                    to={`/nfo/${relatedNFO.id}`}
                                                    className="block group hover:bg-primary/5 p-2 rounded transition-colors"
                                                >
                                                    <h4 className="text-xs sm:text-sm font-semibold text-[#243062] group-hover:text-primary transition-colors line-clamp-2 break-words">
                                                        {relatedNFO.title}
                                                    </h4>
                                                </Link>
                                            </li>
                                        ))}
                                    {relatedNFOs.length === 0 && (
                                        <li className="text-xs sm:text-sm text-neutral-500">No related NFOs available</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NFOsDetail;

