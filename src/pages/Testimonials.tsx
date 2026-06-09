import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/home/Testimonials';

const TestimonialsPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumbs */}
            <div className="container-custom pt-16 md:pt-24">
                <nav className="flex items-center space-x-2 text-sm">
                    <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                        Home
                    </Link>
                    <span className="text-neutral-400">/</span>
                    <span className="text-neutral-500">Testimonials</span>
                </nav>
            </div>

            {/* All testimonials from API, in grid layout */}
            <Testimonials
                variant="default"
                showSeeAll={false}
                layout="grid"
            />
        </div>
    );
};

export default TestimonialsPage;
