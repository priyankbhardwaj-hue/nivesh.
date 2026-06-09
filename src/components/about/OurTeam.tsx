import React from 'react';

// Import team member images
import AbhijeetAwasthiImg from './images/Abhijeet Awasthi.jpg';
import AkankshaSrivastavaImg from './images/Akanksha Srivastava.jpg';
import AkhileshChandakImg from './images/Akhilesh Chandak.jpg';
import AnantSharmaImg from './images/Anant Sharma.png';
import AnkitNihaniaImg from './images/Ankit Nihania.jpg';
import AnuragGargImg from './images/Anurag Garg.png';
import DevendraSinghImg from './images/Devendra Singh.jpg';
import HiraJaiswalImg from './images/Hira Jaiswal.png';
import KamalKumarImg from './images/Kamal Kumar.jpeg';
import NishantPandeyImg from './images/Nishant Pandey.jpg';
import PoojaRatudiImg from './images/Pooja Ratudi.jpg';
import PuneetAgarwalImg from './images/Puneet Agarwal.jpg';
import RajeshKumarRamImg from './images/Rajesh Kumar Ram.png';
import SarikaBhadauriaImg from './images/Sarika Bhadauria.jpg';
import ShivaniBaghelImg from './images/Shivani Baghel.jpg';
import ShivaniShrivastavImg from './images/Shivani Shrivastav.png';
import ShridharImg from './images/Shridhar.png';
import SnehaGhagImg from './images/Sneha Ghag.jpg';
import PankajKumarJhaImg from './images/Pankaj Kumar Jha.jpeg';
import HemantKhadaseImg from './images/Hemant Khadase.jpeg';

interface TeamMember {
    name: string;
    role: string;
    linkedinUrl?: string;
    imageUrl?: string;
}

const OurTeam: React.FC = () => {
    const teamMembers: TeamMember[] = [
        {
            name: 'Anurag Garg',
            role: 'Founder & Chief Executive Officer',
            linkedinUrl: 'https://www.linkedin.com/in/anuraggarg3/',
            imageUrl: AnuragGargImg,
        },
        {
            name: 'Sridhar Srinivasan',
            role: 'Co-Founder & CTO',
            linkedinUrl: 'https://www.linkedin.com/in/srisri0/',
            imageUrl: ShridharImg,
        },
        {
            name: 'Dr Hira Jaiswal',
            role: 'Principal Officer & General Manager- Insurance',
            linkedinUrl: 'https://www.linkedin.com/in/dr-hira-jaiswal-6377b9249/',
            imageUrl: HiraJaiswalImg,
        },
        {
            name: 'Rajesh Kumar Ram',
            role: 'VP - Engineering - Technology',
            linkedinUrl: 'https://in.linkedin.com/in/rajesh-kumar-77734572',
            imageUrl: RajeshKumarRamImg,
        },
        {
            name: 'Anant Sharma',
            role: 'Business Head - Product & Research',
            linkedinUrl: 'https://www.linkedin.com/in/anant-sharma-2087a118/',
            imageUrl: AnantSharmaImg,
        },
        {
            name: 'Sarika Bhadauria',
            role: 'Manager - HR & Admin',
            linkedinUrl: 'https://www.linkedin.com/in/sarika-bhadauria-1a738722/',
            imageUrl: SarikaBhadauriaImg,
        },
        {
            name: 'Kamal Kumar',
            role: 'Company Secretary, Accounts and Legal',
            linkedinUrl: 'https://www.linkedin.com/in/cskamalkumar/',
            imageUrl: KamalKumarImg,
        },
        {
            name: 'Puneet Agarwal',
            role: 'Manager - Partner Relations',
            linkedinUrl: 'https://www.linkedin.com/in/puneet-agarwal-10b30332/',
            imageUrl: PuneetAgarwalImg,
        },
        {
            name: 'Ankit Nihania',
            role: 'Senior Area Manager - Partner Relations',
            linkedinUrl: 'https://www.linkedin.com/in/ankit-nihania-97aa6b153/',
            imageUrl: AnkitNihaniaImg,
        },
        {
            name: 'Devendra Singh',
            role: 'Senior Area Manager - Partner Relations',
            linkedinUrl: 'https://www.linkedin.com/in/devendra-singh-rawat-67556079/',
            imageUrl: DevendraSinghImg,
        },
        {
            name: 'Akanksha Srivastava',
            role: 'Product Manager - Technology',
            linkedinUrl: 'https://www.linkedin.com/in/akanksha8/',
            imageUrl: AkankshaSrivastavaImg,
        },
        {
            name: 'Abhijeet Awasthi',
            role: 'Technical Architect - Technology',
            linkedinUrl: 'https://www.linkedin.com/in/abhijeet-awasthi-63bb22143/',
            imageUrl: AbhijeetAwasthiImg,
        },
        {
            name: 'Pooja Ratudi',
            role: 'Manager - Partner Support',
            linkedinUrl: 'https://www.linkedin.com/in/pooja-ratudi-0845a412a/',
            imageUrl: PoojaRatudiImg,
        },
        {
            name: 'Sneha Ghag',
            role: 'Lead Engineer - Technology',
            linkedinUrl: 'https://www.linkedin.com/in/sneha-ghag-671198bb/',
            imageUrl: SnehaGhagImg,
        },
        {
            name: 'Shivani Shrivastav',
            role: 'Manager - Team Lead, Customer Success Manager',
            linkedinUrl: 'https://www.linkedin.com/in/i-am-shivani-shrivastav/',
            imageUrl: ShivaniShrivastavImg,
        },
        {
            name: 'Akhilesh Chandak',
            role: 'Principal Software Engineer - Technology',
            linkedinUrl: 'https://www.linkedin.com/in/akhilesh-chandak-ab9059b5/',
            imageUrl: AkhileshChandakImg,
        },
        {
            name: 'Shivani Baghel',
            role: 'Manager - Client Wealth',
            linkedinUrl: 'https://www.linkedin.com/in/shivani-baghel-b20856125/',
            imageUrl: ShivaniBaghelImg,
        },
        {
            name: 'Nishant Pandey',
            role: 'Senior Area Manager - Partner Relations',
            linkedinUrl: undefined, // No LinkedIn URL provided in reference code
            imageUrl: NishantPandeyImg,
        },
        {
            name: 'Pankaj Kumar Jha',
            role: 'Senior Android Developer - Technology',
            linkedinUrl: 'https://www.linkedin.com/in/pankaj-jha529/',
            imageUrl: PankajKumarJhaImg,
        },
        {
            name: 'Hemant Khadase',
            role: 'Senior Software Engineer - Technology',
            linkedinUrl: 'https://www.linkedin.com/in/hemant-khadase-b5775545/',
            imageUrl: HemantKhadaseImg,
        },
    ];

    // Group team members into rows
    const groupIntoRows = (members: TeamMember[], colsPerRow: number) => {
        const rows: TeamMember[][] = [];
        for (let i = 0; i < members.length; i += colsPerRow) {
            rows.push(members.slice(i, i + colsPerRow));
        }
        return rows;
    };

    return (
        <section className="py-12 md:py-16 bg-black/90">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        Our Amazing Team
                    </h2>
                    <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto">
                        Meet the talented individuals driving innovation and excellence at Nivesh
                    </p>
                </div>

                {/* Team Grid - Grouped by Rows */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="space-y-3 md:space-y-4">
                        {(() => {
                            // Use xl:grid-cols-4 as the base for row grouping
                            const rows = groupIntoRows(teamMembers, 4);
                            return rows.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 border border-primary rounded-l-2xl rounded-r-2xl p-3 md:p-4 bg-white/10 backdrop-blur-sm"
                                >
                                {row.map((member, memberIndex) => (
                                    <div
                                        key={memberIndex}
                                        className="bg-white rounded-xl p-4 md:p-5 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full"
                                    >
                            {/* Circular Headshot */}
                            <div className="mb-3 md:mb-4 relative">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#DC2626]/10 to-[#EF4444]/5 border-2 border-white shadow-md flex items-center justify-center overflow-hidden group-hover:border-[#DC2626]/20 group-hover:shadow-lg transition-all duration-300 relative">
                                    {member.imageUrl ? (
                                        <img
                                            src={member.imageUrl}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#DC2626] to-[#EF4444] flex items-center justify-center">
                                            <span className="text-2xl md:text-3xl font-bold text-white">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {/* Decorative ring */}
                                <div className="absolute inset-0 rounded-full border-2 border-[#DC2626]/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
                            </div>

                            {/* Name */}
                            <h3 className="text-base md:text-lg font-bold text-[#243062] mb-1.5 leading-tight">
                                {member.name}
                            </h3>

                            {/* Role */}
                            <p className="text-xs md:text-sm text-gray-600 mb-4 min-h-[2.5rem] flex items-center justify-center leading-snug flex-grow">
                                {member.role}
                            </p>

                            {/* LinkedIn Link - Icon Only */}
                            {member.linkedinUrl && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Open LinkedIn profile in new tab
                                        if (member.linkedinUrl) {
                                            window.open(member.linkedinUrl, '_blank', 'noopener,noreferrer');
                                        }
                                    }}
                                    className="inline-flex items-center justify-center w-10 h-10 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110 mt-auto cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2"
                                    aria-label={`View ${member.name}'s LinkedIn profile`}
                                    title={`View ${member.name}'s LinkedIn profile`}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </button>
                                    )}
                                    </div>
                                ))}
                            </div>
                        ));
                    })()}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurTeam;

