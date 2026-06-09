import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import images - these will need to be added to the assets folder
// For now, using placeholder paths that match the expected structure
import g_image1 from '../../assets/g_image1.webp';
import g_image2 from '../../assets/g_image2.webp';
import g_image3 from '../../assets/g_image3.webp';
import g_image4 from '../../assets/g_image4.webp';
import g_image5 from '../../assets/g_image5.webp';

const ImageCarousel: React.FC = () => {
    const slides = [
        { src: g_image1 },
        { src: g_image2 },
        { src: g_image3 },
        { src: g_image4 },
        { src: g_image5 },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <Slider {...settings}>
                {slides.map(({ src }, idx) => (
                    <div key={idx} className="px-2">
                        <img
                            src={src}
                            alt={`Life at Nivesh ${idx + 1}`}
                            className="w-full rounded-lg object-cover"
                            style={{ height: '300px' }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageCarousel;

