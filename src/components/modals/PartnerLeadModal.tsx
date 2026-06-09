import React, { useState, useEffect } from 'react';
import { API_LEAD_PARTNER, PARTNER_ONBOARDING_URL } from '@/config/api';
import { getLeadSource } from '@/utils/leadSource';

interface PartnerLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    /** Page/source name sent with form data (e.g. "Grow Your Mutual Fund", "For MFDs") */
    pageSource: string;
}

function getQueryVariable(variable: string): string | false {
    try {
        const query = window.location.search.substring(1);
        const vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            if (pair[0] === variable) {
                const value = pair[1] ?? '';
                return value ? decodeURIComponent(value) : '';
            }
        }
    } catch {
        // ignore
    }
    return false;
}

function getUtmParam(key: string, fallback = ''): string {
    const value = getQueryVariable(key);
    return value !== false ? value : fallback;
}

const PartnerLeadModal: React.FC<PartnerLeadModalProps> = ({ isOpen, onClose, pageSource }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        holderType: 'arnHolder' as 'arnHolder' | 'nonArnHolder',
        getInfo: true,
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSubmitSuccess(false);
            setSubmitError(null);
        }
    }, [isOpen]);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);
        const name = formData.fullName.trim();
        const email = formData.email.trim();
        const mobile = formData.mobile.trim();
        if (!name || !email || !mobile) {
            setSubmitError('Please fill in Full Name, Email and Mobile Number.');
            return;
        }
        setSubmitLoading(true);
        const source = getLeadSource(pageSource);
        const campaign = getUtmParam('utm_campaign');
        const content = getUtmParam('utm_content');
        const medium = getUtmParam('utm_medium');
        const payload = {
            Name: name,
            PhoneNo: mobile,
            Email: email,
            Message: formData.holderType === 'arnHolder' ? 'ARN Holder' : 'NON ARN Holder',
            IsDistributor: 0,
            TypeRequest: `LeadPartnerForm|${source}|${campaign}|${content}|${medium}`,
            Source: source,
            source: source,
        };
        try {
            const res = await fetch(API_LEAD_PARTNER, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                window.location.href = PARTNER_ONBOARDING_URL;
                return;
            }
            setSubmitError('Something went wrong. Please try again.');
        } catch {
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setSubmitLoading(false);
        }
    };

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="relative bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-[calc(100%-0.5rem)] sm:max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 md:p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors z-10"
                    aria-label="Close modal"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {submitSuccess ? (
                    <div className="p-4 md:p-8 pt-10 md:pt-12 text-center">
                        <div className="inline-flex w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 text-primary items-center justify-center mb-3 md:mb-4">
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-lg md:text-2xl font-bold text-neutral-800 mb-2">Thank you!</h2>
                        <p className="text-neutral-600 text-sm md:text-base mb-6">
                            We have received your details. Our team will get in touch with you shortly.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-[#243062] hover:bg-[#1a2347] text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form noValidate onSubmit={handleFormSubmit} className="p-4 md:p-8 pt-10 md:pt-12">
                        <h2 className="text-base md:text-2xl font-bold text-neutral-800 mb-4 md:mb-6 pr-8">
                            Fill the Form to Know More!
                        </h2>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter Full Name"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                            />
                            <input
                                type="email"
                                placeholder="Enter Email ID"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                            />
                            <input
                                type="tel"
                                placeholder="Enter Mobile Number"
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                            />

                            <div className="pt-2">
                                <p className="text-sm font-bold text-neutral-800 mb-3">Currently, you are an</p>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="holderType"
                                            value="arnHolder"
                                            checked={formData.holderType === 'arnHolder'}
                                            onChange={(e) => setFormData({ ...formData, holderType: e.target.value as 'arnHolder' })}
                                            className="w-4 h-4 text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm text-neutral-700">ARN Holder</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="holderType"
                                            value="nonArnHolder"
                                            checked={formData.holderType === 'nonArnHolder'}
                                            onChange={(e) => setFormData({ ...formData, holderType: e.target.value as 'nonArnHolder' })}
                                            className="w-4 h-4 text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm text-neutral-700">Non ARN Holder</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.getInfo}
                                        onChange={(e) => setFormData({ ...formData, getInfo: e.target.checked })}
                                        className="w-4 h-4 mt-1 text-primary focus:ring-primary"
                                    />
                                    <span className="text-xs text-neutral-600 leading-relaxed">
                                        I would like to get information on products, investment options via WhatsApp, Email, SMS, phone from Nivesh
                                    </span>
                                </label>
                            </div>

                            {submitError && <p className="text-sm text-red-600">{submitError}</p>}

                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="w-full bg-[#243062] hover:bg-[#1a2347] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {submitLoading ? 'Submitting...' : 'I Would Like To Know More'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PartnerLeadModal;
