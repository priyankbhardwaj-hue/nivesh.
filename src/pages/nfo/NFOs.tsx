import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchNFOs, type NFO } from '../../services/api';

const NFOs: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [nfos, setNfos] = useState<NFO[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [previousPage, setPreviousPage] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const page = parseInt(searchParams.get('page') || '1', 10);
        setCurrentPage(page);
        loadNFOs(page);
    }, [searchParams]);

    const loadNFOs = async (page: number) => {
        setLoading(true);
        try {
            const result = await fetchNFOs(page);
            setNfos(result.nfos || []);
            setNextPage(result.next);
            setPreviousPage(result.previous);
            // Calculate total pages (6 NFOs per page - 3 columns x 2 rows)
            const nfosPerPage = 6;
            const totalCount = result.count || 0;
            setTotalPages(Math.max(1, Math.ceil(totalCount / nfosPerPage)));
        } catch (error) {
            console.error('Error loading NFOs:', error);
            setNfos([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        setSearchParams(params);
    };

    const getImageUrl = (nfo: NFO): string => {
        // Prioritize image_url, then image, then fallback
        if (nfo.image_url && nfo.image_url.trim() !== '') {
            return nfo.image_url;
        }
        if (nfo.image && nfo.image.trim() !== '') {
            return nfo.image;
        }
        return '/placeholder-nfo.jpg'; // Fallback placeholder
    };

    return (
        <div className="min-h-screen bg-neutral-50 overflow-x-hidden">
            {/* Hero Section */}
            <section className="py-8 md:py-10 bg-white border-b border-neutral-200">
                <div className="container-custom px-4 md:px-6">
                    <nav className="flex items-center space-x-2 text-sm mb-4 mt-10">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                            Home
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500">NFOs</span>
                    </nav>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#243062] text-center">
                        Category: NFOs (New Fund Offer)
                    </h3>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-6 md:py-8">
                <div className="container-custom px-4 md:px-6">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="bg-white rounded-lg border border-neutral-200 animate-pulse overflow-hidden shadow-sm">
                                    <div className="h-48 md:h-56 bg-neutral-200"></div>
                                    <div className="p-3 md:p-4">
                                        <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-neutral-200 rounded w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : nfos.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 m-10 mt-6">
                                {nfos.map((nfo) => (
                                    <Link
                                        key={nfo.id}
                                        to={`/nfo/${nfo.id}`}
                                        className="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300 group min-w-0 shadow-sm"
                                    >
                                        <div className="relative h-48 md:h-56 overflow-hidden bg-neutral-100">
                                            <img
                                                src={getImageUrl(nfo)}
                                                alt={nfo.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/placeholder-nfo.jpg';
                                                }}
                                            />
                                        </div>
                                        <div className="p-3 md:p-4">
                                            <h4 className="text-sm md:text-base font-bold text-[#243062] line-clamp-2 group-hover:text-primary transition-colors break-words leading-tight">
                                                {nfo.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-6 flex-wrap">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={!previousPage || currentPage === 1}
                                        className="px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-neutral-300 text-neutral-700 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        « Previous
                                    </button>
                                    
                                    {[...Array(totalPages)].map((_, index) => {
                                        const page = index + 1;
                                        // Show first page, last page, current page, and pages around current
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 1 && page <= currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border transition-colors ${
                                                        currentPage === page
                                                            ? 'bg-primary text-white border-primary'
                                                            : 'border-neutral-300 text-neutral-700 hover:bg-primary hover:text-white hover:border-primary'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                                            return <span key={page} className="px-1 md:px-2 text-sm">...</span>;
                                        }
                                        return null;
                                    })}
                                    
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={!nextPage || currentPage === totalPages}
                                        className="px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-neutral-300 text-neutral-700 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next »
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center">
                            <p className="text-base text-neutral-600">No NFOs found.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default NFOs;

