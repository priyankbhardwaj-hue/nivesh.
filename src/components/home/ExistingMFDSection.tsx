import React from "react";
import Button from "../ui/Button";
import DashboardImg from "../../assets/dashboard_webImg.jpeg";
import DashboardMobile from "../../assets/dashboard_mobile.webp";

const ExistingMFDSection: React.FC = () => {
  return (
    <section className="py-12 md:py-32 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* CONTENT */}
          <div className="order-1">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-base md:text-lg font-semibold mb-6">
              For Existing MFDs
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Transform Your Practice Into A{" "}
              <span className="text-primary">Digital Wealth Brand.</span>
            </h2>

            <div className="space-y-4 mb-8">
              {[
                "Free up your time for client acquisition",
                "Stop managing clients through WhatsApp and spreadsheets",
                "Accelerate client onboarding to minutes",
                "Reduce your expenses on software and people",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-base md:text-lg text-neutral-600">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-lg md:text-xl font-medium text-neutral-800 mb-8">
              With Nivesh, automate your backend, strengthen client trust, and
              grow 10x faster.
            </p>

            <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-r-xl mb-8">
              <p className="text-base md:text-lg font-medium text-neutral-800 italic">
                “Platforms don’t replace distributors...they evolve them.”
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = 'https://app.nivesh.com/partner_onboarding'}
            >
              Get My Free Platform →
            </Button>
          </div>

          {/* ================= MOBILE IMAGES ================= */}
          <div className="order-2 lg:hidden mt-12 flex flex-col items-center gap-10">
            {/* iOS */}
            <div className="flex flex-col items-center">
              <img
                src={DashboardMobile}
                alt="iOS Dashboard"
                className="w-64 max-w-full rounded-2xl shadow-xl border border-neutral-200 bg-white"
              />
              <span className="mt-2 text-sm font-medium text-neutral-700">
                iOS
              </span>
            </div>

            {/* Web */}
            <div className="flex flex-col items-center">
              <img
                src={DashboardImg}
                alt="Web Dashboard"
                className="w-full max-w-md rounded-2xl shadow-xl border border-neutral-200 bg-white"
              />
              <span className="mt-2 text-sm font-medium text-neutral-700">
                Web
              </span>
            </div>

            {/* Android */}
            <div className="flex flex-col items-center">
              <img
                src={DashboardMobile}
                alt="Android Dashboard"
                className="w-64 max-w-full rounded-2xl shadow-xl border border-neutral-200 bg-white"
              />
              <span className="mt-2 text-sm font-medium text-neutral-700">
                Android
              </span>
            </div>
          </div>

          {/* ================= DESKTOP IMAGE (UNCHANGED) ================= */}
          <div className="order-2 hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl transform rotate-6"></div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 bg-white px-12 md:px-16 lg:px-24">
              {/* iOS */}
              <div className="absolute left-2 bottom-2 flex flex-col items-center z-10">
                <img
                  src={DashboardMobile}
                  alt="iOS App"
                  className="w-28 rounded-xl shadow-lg border bg-white"
                />
                <span className="mt-1 text-xs text-neutral-600">iOS</span>
              </div>

              {/* Android */}
              <div className="absolute right-2 bottom-2 flex flex-col items-center z-10">
                <img
                  src={DashboardMobile}
                  alt="Android App"
                  className="w-28 rounded-xl shadow-lg border bg-white"
                />
                <span className="mt-1 text-xs text-neutral-600">Android</span>
              </div>

              {/* Web */}
              <div className="flex flex-col items-center">
                <img
                  src={DashboardImg}
                  alt="Web Dashboard"
                  className="w-full h-auto object-cover"
                />
                <span className="mt-2 text-sm font-medium text-neutral-700">
                  Web
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExistingMFDSection;