import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { fetchCareerById, submitCareerApplication, type Career } from '../../../services/api';

const CareerApply: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [job, setJob] = useState<Career | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        current_location: '',
        experience: '',
        cover_letter: '',
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const loadJob = async () => {
            if (!id) {
                setError('Job not found.');
                setLoading(false);
                return;
            }

            setLoading(true);
            const data = await fetchCareerById(id);
            if (!data) {
                setError('Job not found.');
            } else {
                setJob(data);
            }
            setLoading(false);
        };

        loadJob();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);

        if (!id) {
            setSubmitError('Job not found.');
            return;
        }

        const result = await submitCareerApplication({
            career_id: id,
            full_name: formData.full_name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            current_location: formData.current_location.trim(),
            experience: formData.experience.trim(),
            cover_letter: formData.cover_letter.trim(),
            resume: resumeFile,
        });

        if (!result) {
            setSubmitError('Failed to submit application. Please try again.');
            return;
        }

        setSubmitSuccess(true);
        setFormData({
            full_name: '',
            email: '',
            phone: '',
            current_location: '',
            experience: '',
            cover_letter: '',
        });
        setResumeFile(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <div className="container-custom px-4 md:px-6 py-16">
                    <div className="text-center text-neutral-600">Loading job details...</div>
                </div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <div className="container-custom px-4 md:px-6 py-16 text-center">
                    <p className="text-neutral-600 mb-4">{error || 'Job not found.'}</p>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={() => navigate('/career')}
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold"
                    >
                        Back to Careers
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <section className="pt-16 md:pt-24 pb-8 bg-white border-b border-neutral-200">
                <div className="container-custom px-4 md:px-6">
                    <nav className="flex items-center space-x-2 text-sm mb-4">
                        <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                            Home
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <Link to="/career" className="text-primary hover:text-primary-dark transition-colors">
                            Careers
                        </Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-500">Apply</span>
                    </nav>
                    <h1 className="text-2xl md:text-4xl font-bold text-[#243062] mb-3">
                        Apply for {job.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                        {job.location && <span>{job.location}</span>}
                        <span>{job.job_type_display}</span>
                        {job.number_of_openings > 0 && (
                            <span>{job.number_of_openings} openings</span>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-14">
                <div className="container-custom px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
                        <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">Job Description</h2>
                            <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-line">
                                {job.description}
                            </p>
                            {job.requirements && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-[#243062] mb-3">Requirements</h3>
                                    <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-line">
                                        {job.requirements}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl md:text-2xl font-bold text-[#243062] mb-4">Application Form</h2>
                            {submitSuccess && (
                                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">
                                    Application submitted successfully. We will get back to you soon.
                                </div>
                            )}
                            {submitError && (
                                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">
                                    {submitError}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    required
                                    placeholder="Full Name"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <input
                                    type="email"
                                    required
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Current Location"
                                    value={formData.current_location}
                                    onChange={(e) => setFormData({ ...formData, current_location: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Total Experience"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <textarea
                                    placeholder="Cover Letter"
                                    value={formData.cover_letter}
                                    onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[140px]"
                                />
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Resume (optional)</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                                        className="w-full text-sm text-neutral-600"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold w-full"
                                >
                                    Submit Application
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CareerApply;
