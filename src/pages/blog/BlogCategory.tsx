import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchBlogs, fetchBlogCategories, type Blog, type BlogCategory as BlogCategoryType } from '../../services/api';

const BlogCategory: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [categories, setCategories] = useState<BlogCategoryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [previousPage, setPreviousPage] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const category = searchParams.get('category') || '';
        const search = searchParams.get('search') || '';
        
        setCurrentPage(page);
        setSelectedCategory(category);
        setSearchQuery(search);
        
        loadBlogs(page, category, search);
        loadCategories();
    }, [searchParams]);

    const loadBlogs = async (page: number, category?: string, search?: string) => {
        setLoading(true);
        try {
            const result = await fetchBlogs(page, category, search);
            setBlogs(result.blogs || []);
            setNextPage(result.next);
            setPreviousPage(result.previous);
            // Calculate total pages (assuming 6 blogs per page based on image)
            const blogsPerPage = 6;
            const totalCount = result.count || 0;
            setTotalPages(Math.max(1, Math.ceil(totalCount / blogsPerPage)));
        } catch (error) {
            console.error('Error loading blogs:', error);
            setBlogs([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const data = await fetchBlogCategories();
            setCategories(data || []);
        } catch (error) {
            console.error('Error loading categories:', error);
            setCategories([]);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (selectedCategory) params.set('category', selectedCategory);
        params.set('page', '1');
        setSearchParams(params);
    };

    const handleCategoryClick = (categorySlug: string) => {
        const params = new URLSearchParams();
        if (categorySlug) params.set('category', categorySlug);
        if (searchQuery) params.set('search', searchQuery);
        params.set('page', '1');
        setSearchParams(params);
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams();
        if (selectedCategory) params.set('category', selectedCategory);
        if (searchQuery) params.set('search', searchQuery);
        params.set('page', page.toString());
        setSearchParams(params);
    };

    const getImageUrl = (blog: Blog): string => {
        // Prioritize image_url, then image, then fallback
        if (blog.image_url && blog.image_url.trim() !== '') {
            return blog.image_url;
        }
        if (blog.image && blog.image.trim() !== '') {
            return blog.image;
        }
        return '/placeholder-blog.jpg'; // Fallback placeholder
    };


    const getExcerpt = (blog: Blog): string | null => {
        if (blog.excerpt && blog.excerpt.trim() !== '') {
            return blog.excerpt;
        }
        if (!blog.content) {
            return null;
        }
        const text = blog.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        if (!text) {
            return null;
        }
        const maxLength = 140;
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return (
        <div className="min-h-screen bg-neutral-50 overflow-x-hidden">
            {/* Hero Section */}
            <section className="pt-4 pb-6 md:pt-6 md:pb-8 lg:pt-8 lg:pb-10 bg-white border-b border-neutral-200">
                <div className="container-custom px-4 md:px-6">
                    <nav className="flex items-center space-x-2 text-xs md:text-sm mb-3 md:mb-4 mt-12 md:mt-12 lg:mt-16">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                            Home
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500">Blog</span>
                    </nav>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#243062] text-center">Blog</h2>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-4 md:py-6 lg:py-8">
                <div className="container-custom px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 md:gap-5 lg:gap-6">
                        {/* Left Column - Blog Posts */}
                        <div className="min-w-0">
                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                                    {[...Array(6)].map((_, index) => (
                                        <div key={index} className="bg-white rounded-lg border border-neutral-200 animate-pulse overflow-hidden shadow-sm">
                                            <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-neutral-200"></div>
                                            <div className="p-3 sm:p-4 md:p-5">
                                                <div className="h-3 sm:h-4 md:h-5 bg-neutral-200 rounded w-3/4 mb-2"></div>
                                                <div className="h-3 sm:h-4 md:h-5 bg-neutral-200 rounded w-full"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : blogs.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mb-4 md:mb-6">
                                        {blogs.map((blog) => {
                                            const excerpt = getExcerpt(blog);
                                            return (
                                                <div
                                                    key={blog.id}
                                                    className="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300 group min-w-0 shadow-sm"
                                                >
                                                    <div className="relative h-36 sm:h-44 md:h-48 lg:h-60 overflow-hidden bg-neutral-100">
                                                        {blog.is_featured && (
                                                            <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                                                                Featured
                                                            </div>
                                                        )}
                                                        <Link to={`/blog/${blog.id}`} className="block h-full">
                                                            <img
                                                                src={getImageUrl(blog)}
                                                                alt={blog.title}
                                                                className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-300"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    target.src = '/placeholder-blog.jpg';
                                                                }}
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="p-3 sm:p-3 md:p-4 space-y-2">
                                                        <Link
                                                            to={`/blog/${blog.id}`}
                                                            className="block text-xs sm:text-sm md:text-base font-bold text-[#243062] line-clamp-2 group-hover:text-primary transition-colors break-words leading-tight"
                                                        >
                                                            {blog.title}
                                                        </Link>
                                                        {excerpt && (
                                                            <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2">
                                                                {excerpt}
                                                            </p>
                                                        )}
                                                        <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs text-neutral-500">
                                                            {blog.read_time && <span>{blog.read_time}</span>}
                                                            {blog.author && <span>By {blog.author}</span>}
                                                        </div>
                                                        <div>
                                                            <Link
                                                                to={`/blog/${blog.id}`}
                                                                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                                                            >
                                                                Read More
                                                                <span aria-hidden="true">→</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mt-4 md:mt-6 flex-wrap">
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={!previousPage || currentPage === 1}
                                                className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 text-neutral-700 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                « Previous
                                            </button>
                                            
                                            <span className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-xs sm:text-sm font-semibold text-neutral-700 bg-neutral-50 rounded-lg border border-neutral-300">
                                                {currentPage}
                                            </span>
                                            
                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={!nextPage || currentPage === totalPages}
                                                className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-xs sm:text-sm rounded-lg border border-neutral-300 text-neutral-700 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Next »
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-white rounded-lg border border-neutral-200 p-6 sm:p-8 text-center">
                                    <p className="text-sm sm:text-base text-neutral-600">No blog posts found.</p>
                                </div>
                            )}
                        </div>

                        {/* Right Sidebar - Search & Categories */}
                        <div className="lg:sticky lg:top-6 lg:h-fit space-y-3 md:space-y-4 min-w-0">
                            {/* Search Blog Section */}
                            <div className="bg-white rounded-lg border border-neutral-200 p-3 sm:p-4">
                                <h3 className="text-sm sm:text-base font-bold text-[#243062] mb-2 sm:mb-3">
                                    Search Blog
                                </h3>
                                <form onSubmit={handleSearch} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search..."
                                        className="flex-1 min-w-0 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <button
                                        type="submit"
                                        className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex-shrink-0 flex items-center justify-center"
                                        aria-label="Search"
                                    >
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </form>
                            </div>

                            {/* Blog Categories Section */}
                            <div className="bg-white rounded-lg border border-neutral-200 p-3 sm:p-4">
                                <h3 className="text-sm sm:text-base font-bold text-[#243062] mb-2 sm:mb-3">
                                    Blog Categories
                                </h3>
                                <ul className="space-y-1 sm:space-y-1.5">
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <button
                                                onClick={() => handleCategoryClick(category.slug)}
                                                className={`w-full text-left px-2 py-1 rounded hover:bg-primary/10 transition-colors text-xs sm:text-sm break-words ${
                                                    selectedCategory === category.slug
                                                        ? 'bg-primary/20 text-primary font-semibold'
                                                        : 'text-neutral-700'
                                                }`}
                                            >
                                                <span className="text-primary mr-1 sm:mr-1.5 flex-shrink-0">•</span>
                                                <span className="break-words">{category.name}</span> <span className="whitespace-nowrap">({category.blogs_count || 0})</span>
                                            </button>
                                            {/* Render subcategories if they exist */}
                                            {category.subcategories && category.subcategories.length > 0 && (
                                                <ul className="ml-3 sm:ml-4 mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1">
                                                    {category.subcategories
                                                        .filter((subcat) => subcat.is_active !== false)
                                                        .map((subcategory) => (
                                                            <li key={subcategory.id}>
                                                                <button
                                                                    onClick={() => handleCategoryClick(subcategory.slug)}
                                                                    className={`w-full text-left px-2 py-0.5 rounded hover:bg-primary/10 transition-colors text-xs break-words ${
                                                                        selectedCategory === subcategory.slug
                                                                            ? 'bg-primary/20 text-primary font-semibold'
                                                                            : 'text-neutral-600'
                                                                    }`}
                                                                >
                                                                    <span className="text-primary mr-1 sm:mr-1.5 flex-shrink-0">•</span>
                                                                    <span className="break-words">{subcategory.name}</span> <span className="whitespace-nowrap">({subcategory.blogs_count || 0})</span>
                                                                </button>
                                                            </li>
                                                        ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                    {categories.length === 0 && (
                                        <li className="text-xs sm:text-sm text-neutral-500">No categories available</li>
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

export default BlogCategory;

