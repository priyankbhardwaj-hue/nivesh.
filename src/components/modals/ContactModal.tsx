import React, { useState, useEffect } from 'react';
import { API_WEB_ADD_LEAD } from '@/config/api';
import { getLeadSource } from '@/utils/leadSource';

const API_RESEND_OTP = 'https://api.nivesh.com/api/ResendOTPV2';
const API_CONFIRM_OTP = 'https://api.nivesh.com/api/ConfirmOTP';
const OTP_API_TOKEN = '636F8F63-06C4-4D95-8562-392B34025FB0';
const THANK_YOU_URL = 'https://lead.nivesh.com/thank-you-nivesh';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    /** Page/source name (e.g. "Mutual Funds", "Bond") - sent with form data to identify where the lead came from */
    pageSource?: string;
}

function getUtmParam(key: string, fallback = ''): string {
    if (typeof window === 'undefined') return fallback;
    const params = new URLSearchParams(window.location.search);
    const value = params.get(key);
    return value !== null ? value : fallback;
}

function parseOtpIdFromResponse(data: { message?: string; OTP_Id?: string }): string | null {
    if (data?.OTP_Id) return String(data.OTP_Id);
    const message = data?.message ?? '';
    const parts = message.split('.');
    if (parts.length < 2) return null;
    const raw = (parts[1] ?? '').replace(/@/g, '').replace(/#/g, '');
    return raw || null;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, pageSource = 'Website' }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        keepUpdated: 'yes',
    });

    const [errors, setErrors] = useState({ name: '', phone: '' });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showThankYou, setShowThankYou] = useState(false);

    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpId, setOtpId] = useState<string | null>(null);
    const [pendingPayload, setPendingPayload] = useState<{ Name: string; PhoneNo: string; TypeRequest: string; Source: string; source?: string } | null>(null);
    const [otpSubmitting, setOtpSubmitting] = useState(false);
    const [otpError, setOtpError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setShowThankYou(false);
            setOtpModalVisible(false);
            setOtp('');
            setOtpId(null);
            setPendingPayload(null);
            setSubmitError(null);
            setOtpError(null);
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const next = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
        setFormData((prev) => ({ ...prev, [name]: next }));
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
        setSubmitError(null);
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, keepUpdated: e.target.value }));
    };

    const validateForm = () => {
        const newErrors = { name: '', phone: '' };
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        setErrors(newErrors);
        return !newErrors.name && !newErrors.phone;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSubmitLoading(true);
        setSubmitError(null);

        const utmContent = getUtmParam('utm_content') || 'direct';
        const utmMedium = getUtmParam('utm_medium');
        const utmSource = getUtmParam('utm_source');
        const consent = formData.keepUpdated === 'yes' ? 1 : 0;
        const source = getLeadSource(pageSource);
        // Put source first so backend uses website_organic_<PageName> (e.g. website_organic_MutualFunds)
        const typeRequest = `LeadClientForm|${source}|${utmContent}|${utmMedium}|${utmSource}|ConsentByUser:${consent}`;

        const requestPayload = {
            Name: formData.name.trim(),
            PhoneNo: formData.phone.trim(),
            TypeRequest: typeRequest,
            Source: source,
            source: source,
        };

        try {
            const sendOtpRes = await fetch(API_RESEND_OTP, {
                method: 'POST',
                headers: {
                    token: OTP_API_TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    EmialId: '',
                    MobileNumber: formData.phone.trim(),
                    OtpType: 'LeadOtp',
                    Client_Code: '',
                    Recipient_Code: '',
                    LanguageId: 1,
                    Amount: '',
                    Schemename: '',
                    PartnerCOde: '',
                }),
            });

            const sendOtpData = await sendOtpRes.json();
            const parsedOtpId = parseOtpIdFromResponse(sendOtpData);

            if (!parsedOtpId) {
                setSubmitError('Failed to send OTP. Please try again.');
                return;
            }

            setOtpId(parsedOtpId);
            setPendingPayload(requestPayload);
            setOtpModalVisible(true);
            setOtp('');
            setOtpError(null);
        } catch (err) {
            console.error('Failed to send OTP:', err);
            setSubmitError('Failed to send OTP. Please try again.');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        const trimmedOtp = otp.replace(/\D/g, '').slice(0, 6);
        if (!trimmedOtp || trimmedOtp.length < 4) {
            setOtpError('Please enter a valid OTP');
            return;
        }
        if (!otpId || !pendingPayload) {
            setOtpError('Session expired. Please submit the form again.');
            return;
        }

        setOtpSubmitting(true);
        setOtpError(null);

        try {
            const confirmRes = await fetch(API_CONFIRM_OTP, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    OTP_Id: otpId,
                    OTP: trimmedOtp,
                    EmialId: '',
                    MobileNumber: pendingPayload.PhoneNo,
                    LanguageId: 1,
                }),
            });

            const confirmData = await confirmRes.json();
            if (confirmData?.status_code !== 200) {
                throw new Error(confirmData?.message || 'Invalid OTP');
            }

            let ip = '';
            try {
                ip = await fetch('https://api.ipify.org/').then((res) => res.text());
            } catch {
                // continue without IP
            }

            const payload = {
                ...pendingPayload,
                IPAddress: ip,
            };

            const leadRes = await fetch(API_WEB_ADD_LEAD, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!leadRes.ok) {
                throw new Error('Lead submission failed');
            }

            if (typeof window !== 'undefined' && (window as unknown as { fbq?: (a: string, b: string) => void }).fbq) {
                (window as unknown as { fbq: (a: string, b: string) => void }).fbq('track', 'Lead');
            }
            setOtpModalVisible(false);
            setOtp('');
            setOtpId(null);
            setPendingPayload(null);
            onClose();
            setTimeout(() => {
                window.open(THANK_YOU_URL, '_blank');
            }, 300);
        } catch (err) {
            console.error('OTP verification failed:', err);
            setOtpError('OTP verification or submission failed. Please try again.');
        } finally {
            setOtpSubmitting(false);
        }
    };

    const handleClose = () => {
        setShowThankYou(false);
        setOtpModalVisible(false);
        setOtp('');
        setOtpId(null);
        setPendingPayload(null);
        onClose();
    };

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) handleClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto animate-in fade-in zoom-in duration-200">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-neutral-600 hover:text-neutral-900 transition-colors z-10"
                    aria-label="Close modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {showThankYou ? (
                    <div className="p-6 md:p-8 pt-12 text-center">
                        <div className="inline-flex w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 text-green-600 items-center justify-center mb-4 sm:mb-6">
                            <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#243062] mb-2 sm:mb-3">
                            Thank you!
                        </h2>
                        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 sm:mb-8">
                            We have received your details. Our team will get in touch with you shortly.
                        </p>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-full bg-[#243062] hover:bg-[#1a2550] text-white font-bold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Close
                        </button>
                    </div>
                ) : otpModalVisible ? (
                    <div className="p-6 md:p-8 pt-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-2 pr-8">
                            Enter OTP
                        </h2>
                        <p className="text-sm text-neutral-600 mb-4">
                            We have sent a 4-digit OTP to your phone number. Please enter it below.
                        </p>
                        <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            placeholder="Enter 4 digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all ${
                                otpError ? 'border-red-500' : 'border-green-500/50 focus:border-green-600'
                            }`}
                        />
                        {otpError && <p className="mt-1 text-sm text-red-500">{otpError}</p>}
                        <button
                            type="button"
                            onClick={handleOtpSubmit}
                            disabled={otpSubmitting}
                            className="w-full mt-4 bg-[#243062] hover:bg-[#1a2550] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {otpSubmitting ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6 pr-8">
                            Get in Touch with our Wealth Experts
                        </h2>

                        <div className="mb-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all ${
                                    errors.name ? 'border-red-500' : 'border-green-500/50 focus:border-green-600'
                                }`}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter Your 10 digit Phone Number"
                                maxLength={10}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all ${
                                    errors.phone ? 'border-red-500' : 'border-green-500/50 focus:border-green-600'
                                }`}
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                        </div>

                        <div className="mb-6 p-4 border-2 border-green-500/50 rounded-lg bg-green-50/50">
                            <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                                We will contact you to give you updated information on investment options via WhatsApp, Email, SMS, phone.
                            </p>
                            <div className="space-y-3">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="keepUpdated"
                                        value="yes"
                                        checked={formData.keepUpdated === 'yes'}
                                        onChange={handleRadioChange}
                                        className="w-5 h-5 text-green-600 border-2 border-green-500/50 focus:ring-2 focus:ring-green-500/20 cursor-pointer accent-green-600"
                                    />
                                    <span className="ml-3 text-sm md:text-base text-neutral-700">Yes, keep me updated</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="keepUpdated"
                                        value="no"
                                        checked={formData.keepUpdated === 'no'}
                                        onChange={handleRadioChange}
                                        className="w-5 h-5 text-green-600 border-2 border-green-500/50 focus:ring-2 focus:ring-green-500/20 cursor-pointer accent-green-600"
                                    />
                                    <span className="ml-3 text-sm md:text-base text-neutral-700">No, I prefer no updates</span>
                                </label>
                            </div>
                        </div>

                        {submitError && <p className="mb-4 text-sm text-red-500">{submitError}</p>}

                        <button
                            type="submit"
                            disabled={submitLoading}
                            className="w-full bg-[#243062] hover:bg-[#1a2550] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {submitLoading ? 'Sending OTP...' : 'SUBMIT'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactModal;
