import React, { useState } from "react";
import { Link } from "react-router-dom";
import footer1 from "@/assets/footer1.png";
import footer2 from "@/assets/footer2.png";
import footer3 from "@/assets/footer3.jpeg";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <img
              src="/logo.png"
              alt="Nivesh"
              className="h-7 md:h-8 lg:h-10 mb-3 md:mb-4 lg:mb-6"
            />
            <p className="text-neutral-400 text-xs leading-relaxed mb-3 md:mb-4">
              Digital First Wealth Platform
            </p>
            <div className="space-y-2 text-xs text-neutral-400">
              <p>
                <span className="font-semibold">
                  Registered Office Address:
                </span>{" "}
                Private No-S-203, 20, ABC Complex, Veer Savarkar Block,
                Shakarpur, Shahdara, Delhi-110092
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/about"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/calculators"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Calculators
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/career"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="/data-security"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Data Security
                </Link>
              </li>
              <li>
                <Link
                  to="/nfos"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  NFOs
                </Link>
              </li>
              <li>
                <a
                  href="https://www.amfiindia.com/otherdata/scheme-details"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-1 py-1 hover:border-primary-dark hover:text-primary text-neutral-400 border border-primary rounded-lg text-xs"
                >
                  Scheme Details
                </a>
              </li>
            </ul>
          </div>

          {/* Goals */}
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm">
              Goals
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/plan-for-retirement"
                  className="text-neutral-400 hover:text-primary transition-colors flex items-start"
                >
                  <span>Retirement Plan</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/save-for-children"
                  className="text-neutral-400 hover:text-primary transition-colors flex items-start"
                >
                  <span>Save For Children</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/save-tax"
                  className="text-neutral-400 hover:text-primary transition-colors flex items-start"
                >
                  <span>Save Tax</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/build-long-term-wealth"
                  className="text-neutral-400 hover:text-primary transition-colors flex items-start"
                >
                  <span>Build Long Term Wealth</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm">
              Product
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/mutual-funds"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Mutual Funds
                </Link>
              </li>
              <li>
                <Link
                  to="/products/specialized-investment-fund"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  SIF
                </Link>
              </li>
              <li>
                <Link
                  to="/market-linked-debentures"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  MLD
                </Link>
              </li>
              <li>
                <Link
                  to="/pre-owned-policies"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Pre-owned Policies
                </Link>
              </li>
              <li>
                <Link
                  to="/gift-city"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Gift City
                </Link>
              </li>
              <li>
                <Link
                  to="/unlisted-shares"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Unlisted Shares
                </Link>
              </li>
              <li>
                <Link
                  to="/fixed-deposit"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Fixed Deposit
                </Link>
              </li>
              <li>
                <Link
                  to="/pms"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  PMS
                </Link>
              </li>
              <li>
                <Link
                  to="/alternative-investment-fund"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  AIF
                </Link>
              </li>
              <li>
                <Link
                  to="/national-pension-scheme"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  NPS
                </Link>
              </li>
              <li>
                <Link
                  to="/bond"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Bond
                </Link>
              </li>
              <li>
                <Link
                  to="/loans/loan-against-securities"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Loan Against Securities
                </Link>
              </li>
            </ul>
          </div>

          {/* Partner */}
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm">
              Partner
            </h3>
            <ul className="space-y-2 text-xs mb-4">
              <li>
                <Link
                  to="/partner"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Be a Nivesh Partner
                </Link>
              </li>
              <li>
                <Link
                  to="/partner/become-mutual-fund-distributors"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Become Mutual Fund Distributors
                </Link>
              </li>
              <li>
                <Link
                  to="/for-mfds"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Transform Your Distribution Business
                </Link>
              </li>

              <li>
                <Link
                  to="/partner/grow-your-mutual-fund"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  Grow Your Mutual Fund Business
                </Link>
              </li>
              <li>
                <Link
                  to="/nism-certification-exam"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  NISM Certification Exam
                </Link>
              </li>
              <li>
                <Link
                  to="/partner/all-about-amfi-arn-code"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  All About AMFI ARN Code
                </Link>
              </li>
              <li>
                <Link
                  to="/the-nivesh-platform"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  The Nivesh Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-white font-semibold mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm">
              Get in Touch
            </h3>
            <div className="space-y-2 md:space-y-3 text-xs">
              <div>
                <p className="text-neutral-500 mb-1">Email</p>
                <a
                  href="mailto:info@nivesh.com"
                  className="text-neutral-400 hover:text-primary transition-colors break-all"
                >
                  Contact@nivesh.com
                </a>
              </div>
              <div>
                <p className="text-neutral-500 mb-1">Support</p>
                <a
                  href="mailto:support@nivesh.com"
                  className="text-neutral-400 hover:text-primary transition-colors break-all"
                >
                  support@nivesh.com
                </a>
              </div>
              <div>
                <p className="text-neutral-500 mb-1">Phone</p>
                <a
                  href="tel:+917290029202"
                  className="text-neutral-400 hover:text-primary transition-colors"
                >
                  +91 7290029202
                </a>
              </div>

              {/* Social Media */}
              <div className="pt-2 md:pt-3">
                <p className="text-neutral-500 mb-2 text-xs">Follow Us</p>
                <div className="flex gap-2 md:gap-3">
                  <a
                    href="https://www.facebook.com/niveshapp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/niveshapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-primary transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/nivesh__official/?igsh=MXg5NXR2Mjl0ODAwbw%3D%3D#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/nivesh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/c/NiveshOfficial/channels"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-primary transition-colors"
                    aria-label="YouTube"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Download App - QR Code Section */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-white font-semibold mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm">
              Download Our App
            </h3>

            {/* App Store Buttons */}
            <div className="space-y-2">
              <a
                href="https://apps.apple.com/in/app/nivesh-wealth-management-app/id6740700135"
                className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-3 py-2 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-neutral-400">
                    Download on the
                  </div>
                  <div className="text-xs font-semibold">App Store</div>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.nivesh.production"
                className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-3 py-2 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-neutral-400">Get it on</div>
                  <div className="text-xs font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Company Registration & AMFI Info */}
      <div className="border-t border-neutral-800 bg-neutral-900">
        <div className="container-custom py-6 px-4 sm:px-6 md:py-8 md:px-0 lg:py-10">
          <div
            className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-3 md:space-y-2"
            style={{ fontSize: "12px" }}
          >
            <p className="text-white font-medium">
              Providential Platforms Private Limited
            </p>
            <p className="text-white font-medium">CIN: U74999DL2016PTC303830</p>
            <p className="text-white font-medium">ARN: 115287</p>
            <p className="text-white font-medium w-fit mx-auto pb-3 border-b border-neutral-500 border-dotted">
              AMFI-Registered Mutual Fund Distributor & SIF Distributor
            </p>
            {/* <p className="text-sm md:text-base text-white font-medium">
                            ARN Code: ARN-115287
                        </p> */}
            <p className="text-white font-medium">
              Date of Initial Registration: 20 September, 2016
            </p>
            <p className="text-white font-medium">
              Current validity of ARN: 19 September, 2028
            </p>
            {/* <p className="text-[11px] sm:text-xs md:text-sm text-neutral-400 leading-relaxed max-w-3xl mx-auto pt-2">
                            Disclaimer: Mutual funds and securities investments are subject to market risks. Past performance does not indicate future performance of the schemes of the fund. Please read offer documents carefully before investing.
                        </p>
                        <p className="text-[11px] sm:text-xs md:text-sm text-neutral-400">
                            Copyright © 2024 Providential Platforms Private Limited
                        </p> */}
          </div>
        </div>
      </div>

      {/* Regulatory Info */}
      <div className="border-t border-neutral-800 bg-neutral-900">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* AMFI */}
            <div className="flex flex-col items-center">
              <div className="h-16 mb-4 flex items-center justify-center px-2">
                <img
                  src={footer1}
                  alt="AMFI"
                  className="h-full object-contain"
                />
              </div>
              <p className="text-xs text-neutral-400 uppercase leading-relaxed mb-1">
                Association of Mutual Funds in India
              </p>
              <p className="text-xs text-neutral-400 uppercase">
                Registered MFD
              </p>
            </div>

            {/* BSE */}
            <div className="flex flex-col items-center">
              <div className="h-16 mb-4 flex items-center justify-center px-2">
                <img
                  src={footer2}
                  alt="BSE Star MF"
                  className="h-full object-contain"
                />
              </div>
              <p className="text-xs text-neutral-400 uppercase leading-relaxed mb-1">
                Registered with BSE Star MF
              </p>
              <p className="text-sm font-semibold text-white">
                Member ID: 11758
              </p>
            </div>

            {/* APMI */}
            <div className="flex flex-col items-center">
              <div className="h-16 mb-4 flex items-center justify-center px-2">
                <img
                  src={footer3}
                  alt="APMI"
                  className="h-full object-contain"
                />
              </div>
              <p className="text-xs text-neutral-400 uppercase leading-relaxed mb-1">
                Association of Portfolio Managers in India
              </p>
              <p className="text-sm font-semibold text-white">
                APRN Code: APRN02811
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <Link
                to="/privacy-and-policy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <button
                onClick={() => setIsDisclaimerOpen(true)}
                className="hover:text-primary transition-colors text-left"
              >
                Disclaimer
              </button>
            </div>
            <p className="text-center md:text-right">
              © {currentYear} Nivesh. All rights reserved.
            </p>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Design & Develop by <a href="https://www.kritidigital.com/" className="underline">Kriti digital Solution</a>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Modal */}
      {isDisclaimerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white text-neutral-900 rounded-2xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsDisclaimerOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="text-2xl font-bold mb-6 text-center">Disclaimer</h3>

            <div className="space-y-4 text-neutral-600 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
              <p>
                Mutual fund investments are subject to market risks. Please read
                the scheme information and other related documents carefully
                before investing. Past performance is not indicative of future
                returns. Please consider your specific investment requirements
                before choosing a fund, or designing a portfolio that suits your
                needs.
              </p>
              <p>
                Providential Platforms Pvt. Ltd., earlier known as Providential
                Advisory Services Pvt. Ltd. (with ARN code 115287) makes no
                warranties or representations, express or implied, on products
                offered through the platform. It accepts no liability for any
                damages or losses, however caused, in connection with the use
                of, or on the reliance of its product or related services. Terms
                and conditions of the website are applicable.
              </p>
              <p className="font-semibold text-neutral-900 pt-4">
                © PROVIDENTIAL PLATFORMS PRIVATE LIMITED
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
