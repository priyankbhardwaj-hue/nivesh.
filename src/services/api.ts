import { buildApiUrl, API_ENDPOINTS } from '../config/api';

// Career interface matching API response
export interface Career {
    id: string;
    title: string;
    description: string;
    requirements: string;
    location: string;
    number_of_openings: number;
    job_type: string;
    job_type_display: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CareerApplicationPayload {
    career_id: string;
    full_name: string;
    email: string;
    phone?: string;
    current_location?: string;
    experience?: string;
    cover_letter?: string;
    resume?: File | null;
}

// Testimonial interface matching API response
export interface Testimonial {
    id: string;
    testimonial_type: 'video' | 'text';
    testimonial_type_display: string;
    name: string;
    role: string | null;
    company: string | null;
    image: string | null;
    image_url: string | null;
    testimonial: string;
    rating: number;
    youtube_video_url: string | null;
    video_title: string | null;
    is_active: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

// Fetch careers from API
export const fetchCareers = async (): Promise<Career[]> => {
    try {
        const url = buildApiUrl(API_ENDPOINTS.CAREERS);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch careers: ${response.statusText}`);
        }
        
        const data: Career[] = await response.json();
        // Filter only active careers
        return data.filter(career => career.is_active);
    } catch (error) {
        console.error('Error fetching careers:', error);
        // Return empty array on error to prevent breaking the UI
        return [];
    }
};

// Fetch single career by ID
export const fetchCareerById = async (id: string): Promise<Career | null> => {
    try {
        const endpoint = `${API_ENDPOINTS.CAREER_DETAIL}${id}/`;
        const url = buildApiUrl(endpoint);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch career: ${response.statusText}`);
        }

        const data: Career = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching career by ID:', error);
        return null;
    }
};

// Submit career application
export const submitCareerApplication = async (payload: CareerApplicationPayload): Promise<{ id: string } | null> => {
    try {
        const url = buildApiUrl(API_ENDPOINTS.CAREER_APPLICATIONS);
        const formData = new FormData();
        formData.append('career_id', payload.career_id);
        formData.append('full_name', payload.full_name);
        formData.append('email', payload.email);
        if (payload.phone) formData.append('phone', payload.phone);
        if (payload.current_location) formData.append('current_location', payload.current_location);
        if (payload.experience) formData.append('experience', payload.experience);
        if (payload.cover_letter) formData.append('cover_letter', payload.cover_letter);
        if (payload.resume) formData.append('resume', payload.resume);

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to submit application: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error submitting career application:', error);
        return null;
    }
};

// Fetch testimonials from API
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
    try {
        const url = buildApiUrl(API_ENDPOINTS.TESTIMONIALS);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
        }
        
        const data: Testimonial[] = await response.json();
        // Filter only active testimonials and sort by order
        return data
            .filter(testimonial => testimonial.is_active)
            .sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Return empty array on error to prevent breaking the UI
        return [];
    }
};

// FAQ interface matching API response
export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    is_active: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

// Fetch FAQs from API
export const fetchFAQs = async (): Promise<FAQ[]> => {
    try {
        const url = buildApiUrl(API_ENDPOINTS.FAQS);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
        }
        
        const data: FAQ[] = await response.json();
        // Filter only active FAQs and sort by order
        return data
            .filter(faq => faq.is_active)
            .sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        // Return empty array on error to prevent breaking the UI
        return [];
    }
};

// Statistics interface matching API response
export interface Statistic {
    id: string;
    number: string;
    description: string;
    icon: string | null;
    icon_image: string | null;
    icon_image_url: string | null;
    page_key?: string | null;
    is_active: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

// Fetch statistics from API
export const fetchStatistics = async (pageKey?: string): Promise<Statistic[]> => {
    try {
        let url = buildApiUrl(API_ENDPOINTS.STATISTICS);
        if (pageKey) {
            const params = new URLSearchParams();
            params.append('page', pageKey);
            url += `?${params.toString()}`;
        }
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch statistics: ${response.statusText}`);
        }

        const data: Statistic[] = await response.json();
        return data
            .filter(stat => stat.is_active)
            .sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return [];
    }
};

// Banner interface matching API response
export interface Banner {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    image_url: string | null;
    is_active: boolean;
    order: number;
    link_url: string | null;
    created_at: string;
    updated_at: string;
}

// Fetch banners from API
export const fetchBanners = async (): Promise<Banner[]> => {
    try {
        const url = buildApiUrl(API_ENDPOINTS.BANNERS);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch banners: ${response.statusText}`);
        }

        const data: Banner[] = await response.json();
        return data
            .filter(banner => banner.is_active)
            .sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error('Error fetching banners:', error);
        return [];
    }
};

// Helper function to convert YouTube URL to embed URL
export const convertYouTubeUrlToEmbed = (url: string | null): string | null => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtu\.be\/([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
    }
    
    return null;
};

// Blog interface matching API response
export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    image: string | null;
    image_url: string | null;
    image_link_url: string | null;
    category: string;
    category_name: string | null;
    category_slug: string | null;
    author: string | null;
    published_date: string | null;
    read_time: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    conclusion: string | null;
    is_active: boolean;
    is_featured: boolean;
    views_count: number;
    created_at: string;
    updated_at: string;
}

// Blog Category interface matching API response
export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    parent: string | null;
    description: string;
    is_active: boolean;
    order: number;
    blogs_count: number;
    subcategories: BlogCategory[];
    created_at: string;
    updated_at: string;
}

// Fetch blogs from API
export const fetchBlogs = async (page: number = 1, category?: string, search?: string): Promise<{ blogs: Blog[]; count: number; next: string | null; previous: string | null }> => {
    try {
        let url = buildApiUrl(API_ENDPOINTS.BLOGS);
        const params = new URLSearchParams();
        params.append('page', page.toString());
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        if (params.toString()) url += `?${params.toString()}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch blogs: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Handle paginated response (Django REST framework format)
        if (data.results && Array.isArray(data.results)) {
            return {
                blogs: data.results.filter((blog: Blog) => blog.is_active !== false),
                count: data.count || data.results.length,
                next: data.next || null,
                previous: data.previous || null,
            };
        }
        
        // Handle non-paginated response (simple array)
        if (Array.isArray(data)) {
            return {
                blogs: data.filter((blog: Blog) => blog.is_active !== false),
                count: data.length,
                next: null,
                previous: null,
            };
        }
        
        // Handle unexpected format
        return { blogs: [], count: 0, next: null, previous: null };
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return { blogs: [], count: 0, next: null, previous: null };
    }
};

// Fetch single blog by ID
export const fetchBlogById = async (id: string): Promise<Blog | null> => {
    try {
        // Construct URL: dashboard/api/blogs/{id}/
        const endpoint = `${API_ENDPOINTS.BLOGS}${id}/`;
        const url = buildApiUrl(endpoint);
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Failed to fetch blog: ${response.status} ${response.statusText}`);
        }
        
        const data: Blog = await response.json();
        
        if (data.is_active === false) {
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        return null;
    }
};

// Fetch blog categories from API
export const fetchBlogCategories = async (): Promise<BlogCategory[]> => {
    try {
        const url = buildApiUrl(API_ENDPOINTS.BLOG_CATEGORIES);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch blog categories: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Handle both array and paginated response formats
        let categories: BlogCategory[] = [];
        if (Array.isArray(data)) {
            categories = data;
        } else if (data.results && Array.isArray(data.results)) {
            categories = data.results;
        } else {
            console.warn('Unexpected blog categories response format:', data);
            return [];
        }
        
        // Filter only active categories (parent categories with no parent)
        // and sort by blogs_count (descending), then by order
        return categories
            .filter((category: BlogCategory) => category.is_active !== false && category.parent === null)
            .sort((a: BlogCategory, b: BlogCategory) => {
                // First sort by blogs_count (descending)
                if (b.blogs_count !== a.blogs_count) {
                    return (b.blogs_count || 0) - (a.blogs_count || 0);
                }
                // Then by order (ascending)
                return (a.order || 0) - (b.order || 0);
            });
    } catch (error) {
        console.error('Error fetching blog categories:', error);
        // Return empty array on error to prevent breaking the UI
        return [];
    }
};

// NFO interface matching API response
export interface NFO {
    id: string;
    title: string;
    slug: string;
    image: string | null;
    image_url: string | null;
    content: string | null;
    category: string | null;
    category_name: string | null;
    category_slug: string | null;
    nfo_period_start: string | null;
    nfo_period_end: string | null;
    is_active: boolean;
    is_featured: boolean;
    views_count: number;
    created_at: string;
    updated_at: string;
}

// Fetch NFOs from API
export const fetchNFOs = async (page: number = 1, category?: string, search?: string): Promise<{ nfos: NFO[]; count: number; next: string | null; previous: string | null }> => {
    try {
        let url = buildApiUrl(API_ENDPOINTS.NFOS);
        const params = new URLSearchParams();
        params.append('page', page.toString());
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        if (params.toString()) url += `?${params.toString()}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch NFOs: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Handle paginated response (Django REST framework format)
        if (data.results && Array.isArray(data.results)) {
            return {
                nfos: data.results.filter((nfo: NFO) => nfo.is_active !== false),
                count: data.count || data.results.length,
                next: data.next || null,
                previous: data.previous || null,
            };
        }
        
        // Handle non-paginated response (simple array)
        if (Array.isArray(data)) {
            return {
                nfos: data.filter((nfo: NFO) => nfo.is_active !== false),
                count: data.length,
                next: null,
                previous: null,
            };
        }
        
        // Handle unexpected format
        return { nfos: [], count: 0, next: null, previous: null };
    } catch (error) {
        console.error('Error fetching NFOs:', error);
        return { nfos: [], count: 0, next: null, previous: null };
    }
};

// Fetch single NFO by ID
export const fetchNFOById = async (id: string): Promise<NFO | null> => {
    try {
        const url = buildApiUrl(`${API_ENDPOINTS.NFOS}${id}/`);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch NFO: ${response.statusText}`);
        }
        
        const data: NFO = await response.json();
        
        if (data.is_active === false) {
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching NFO by ID:', error);
        return null;
    }
};

// Fund Category interface matching API response
export interface FundCategory {
    id: string;
    main_category: string;
    sub_category: string;
    sebi_category_id: string | null;
    sebi_sub_category_id: string | null;
}

// Scheme Data interface for funds
export interface SchemeData {
    Product_category_id: number;
    UniqueNo: string;
    SchemeCode: string;
    RTASchemeCode: string;
    AMCSchemeCode: string;
    ISIN: string;
    AMCCode: string;
    SchemeType: string;
    SchemePlan: string;
    SchemeName: string;
    PurchaseAllowed: string;
    OneYearReturn: number;
    TwoYearReturn: number;
    ThreeYearReturn: number;
    FiveYearReturn: number;
    InvestURL: string;
    [key: string]: any;
}

// Fund Response interface
export interface FundResponse {
    response: {
        status_code: number;
        status: string;
        message: string;
    };
    Message: string | null;
    ObjectResponse: {
        SchemeDataList: SchemeData[];
        productCategoryList: any[];
        TitleResponse: Array<{
            Title: string;
            TitleDescription: string | null;
            MetaKeyword: string | null;
            MetaDescription: string | null;
            MetaTitle: string | null;
            MetaKeywords: string | null;
        }>;
    };
    DataObject: any | null;
}

// Fund Category Detail interface matching API response
export interface FundCategoryDetail {
    id: string;
    main_category: string;
    sub_category: string;
    is_active: boolean;
    order: number;
    page_content: {
        id: string;
        page_title: string;
        description: string;
        hero_image: string;
        is_active: boolean;
    } | null;
    funds: FundResponse[];
    features: Array<{
        id: string;
        title: string;
        description: string;
        icon: string | null;
        is_active: boolean;
        order: number;
    }>;
    benefits: Array<{
        id: string;
        title: string;
        description: string;
        is_active: boolean;
        order: number;
    }>;
    suitability: {
        id: string;
        title: string;
        description: string;
        is_active: boolean;
    } | null;
    faqs: Array<{
        question: string;
        answer: string;
    }>;
}

// Fetch fund categories from API
export const fetchFundCategories = async (): Promise<FundCategory[]> => {
    try {
        const url = buildApiUrl(API_ENDPOINTS.FUND_CATEGORIES);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch fund categories: ${response.statusText}`);
        }
        
        const data: FundCategory[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching fund categories:', error);
        // Return empty array on error to prevent breaking the UI
        return [];
    }
};

// Fetch fund category detail by UUID id
export const fetchFundCategoryDetailById = async (
    categoryId: string
): Promise<FundCategoryDetail | null> => {
    try {
        const url = buildApiUrl(`fund/api/category/${categoryId}/`);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch fund category detail: ${response.statusText}`);
        }
        
        const data: FundCategoryDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching fund category detail by ID:', error);
        return null;
    }
};

// Fetch fund category detail by sebi_category_id and sebi_sub_category_id
export const fetchFundCategoryDetail = async (
    sebiCategoryId: string,
    sebiSubCategoryId: string
): Promise<FundCategoryDetail | null> => {
    try {
        // Build URL with query parameters (without /id/ in path)
        const baseUrl = buildApiUrl('fund/api/category/');
        const url = `${baseUrl}?sebi_category_id=${encodeURIComponent(sebiCategoryId)}&sebi_sub_category_id=${encodeURIComponent(sebiSubCategoryId)}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch fund category detail: ${response.statusText}`);
        }
        
        const data: FundCategoryDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching fund category detail:', error);
        return null;
    }
};

