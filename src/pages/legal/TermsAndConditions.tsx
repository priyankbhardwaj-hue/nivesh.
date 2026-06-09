import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-16 md:pt-24 overflow-hidden bg-white">
                <div className="container-custom relative z-10">
                    <div className="max-w-6xl mx-auto">
                        {/* Breadcrumbs */}
                        <div className="mb-6">
                            <nav className="flex items-center space-x-2 text-sm">
                                <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                                    Home
                                </Link>
                                <span className="text-neutral-400">/</span>
                                <span className="text-neutral-500">Terms and Conditions</span>
                            </nav>
                        </div>

                        <h2 className="text-2xl font-bold text-[#243062] mb-4 leading-tight md:hidden">
                            Terms and Conditions
                        </h2>
                        <h1 className="hidden md:block text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Terms and Conditions
                        </h1>

                        <p className="text-sm md:text-base text-neutral-500 mb-2">
                            Last Updated: 10 March, 2018
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="relative py-2 md:py-4 bg-white">
                <div className="container-custom relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="prose prose-lg max-w-none">
                            {/* Introduction */}
                            <div className="mb-8">
                                <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                    If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our Privacy Policy, govern PROVIDENTIAL PLATFORMS PRIVATE LIMITED's (earlier known as Providential Advisory Services Private Limited) relationship with you. The term "PROVIDENTIAL PLATFORMS PRIVATE LIMITED" (or "Providential"/"us"/"we") refers to the owner of the website. The term "you" refers to the user or viewer of our website.
                                </p>
                            </div>

                            {/* Main Terms Section */}
                            <div className="mb-12">
                                <h4 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    The Use Of This Website Is Subject To The Following Terms Of Use
                                </h4>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    The Use Of This Website Is Subject To The Following Terms Of Use
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        You understand and accept that Providential maintains the website https://www.nivesh.com and related websites and mobile applications (going ahead referred to as "Site" or "Website") to provide visitors with information about Providential, its services, and products and to facilitate communication with Providential and availing its services. You also accept that visitors to the Site are required to read the below terms, and use of the Site constitutes your acceptance and agreement to be bound by such terms, and the changes therein to the Terms from time to time, relating to your usage of the website as communicated or made available on the website.
                                    </p>

                                    <p>
                                        You are aware and accept that all information, content, materials, products (including, but not limited to text, content, photographs, graphics, video and audio content) on the website is protected by copyright either in the favour of Providential or third parties whom the appropriate permissions have been taken under applicable copyright laws and is also protected otherwise under general intellectual property law. You understand and accept that all information, except your personal information, submitted by you through the Site shall be deemed the property of Providential, and Providential shall be free to use any ideas, concepts, know-how or techniques provided by you at the Site, in any manner whatsoever.
                                    </p>

                                    <p>
                                        On initiating a contact through the Site you agree to be contacted by Providential or any other entities with whom Providential has entered into an arrangement. You agree that you shall not copy, reproduce, sell, redistribute, publish, enter into a database, display, perform, modify, transmit, license, create derivatives from, transfer or in any way exploit any part of any information, content, materials, services available from or through the Site, except that which you may download for your own personal, non-commercial use. You agree that you will not use Providential's website for any purpose that is unlawful or prohibited by these Terms. You also agree you will not use the Site in any manner that could damage, disable or impair the website or interfere with any other party's use, legal rights, or enjoyment of the website.
                                    </p>

                                    <p>
                                        You acknowledge that the software and hardware underlying the Site as well as other Internet related software which are required for accessing the website are the legal property of the respective Vendors. The permission given by Providential to access the website will not convey any proprietary or ownership rights in the above software/hardware. You agree that you shall not attempt to modify, translate, disassemble, decompile or reverse engineer the software/hardware underlying the website or create any derivative product based on the software/hardware. You understand that the data and information provided on the Website does not constitute advice and shall not be relied upon by you while making investment decisions.
                                    </p>

                                    <p>
                                        You understand and accept that not all the products and services offered on this website are available in all geographic areas and you may not be eligible for all the products or services offered by Providential on the Site. Providential reserves the right to determine the availability and eligibility for any product or service. You understand and accept that Providential is not responsible for the availability of content or other services on third party sites linked from the website. You are aware that access of hyperlinks to other internet sites are at your own risk and the content, accuracy, opinions expressed, and other links provided by these sites are not verified, monitored or endorsed by Providential in any way.
                                    </p>

                                    <p>
                                        Providential does not make any warranties and expressly disclaims all warranties express or implied, including without limitation, those of merchantability and fitness for a particular purpose, title or non-infringement with respect to any information or services or products that are available or advertised or sold through these third party websites. Providential shall not be liable if any transaction does not fructify or may not be completed or for any failure on part of the Providential to perform any of its obligations under these terms and conditions or those applicable specifically to its services/facilities if performance is prevented, hindered or delayed by a Force Majeure event (defined below) and in such case its obligations shall be suspended for so long as the Force Majeure event continues.
                                    </p>

                                    <p>
                                        "Force Majeure Event" means any event due to any cause beyond the reasonable control of Providential, including without limitations, unavailability of any communication systems, breach, or virus in the processes or payment or delivery mechanism, sabotage, fire, flood, explosion, acts of god, civil commotion, strikes or industrial action of any kind, riots, insurrection, war, acts of government, computer hacking, unauthorised access to computer data and storage devices, computer crashes, malfunctioning in the computer terminal or the systems getting affected by any malicious, destructive or corrupting code or program, mechanical or technical errors/failures or power shut down, faults or failures in telecommunication etc. By using the services provided through this Website, you shall be deemed to have accepted the Terms and Conditions herein including the amended terms and conditions published on the website.
                                    </p>

                                    <p>
                                        You hereby irrevocably and unconditionally grant no objection to Providential and the respective mutual funds / RTAs to collate the transaction details relating to the investments in mutual fund units done by you on the online technology platform of Providential and provide such transaction data to Providential for further processing of your transactions You understand and accept that Providential has the absolute discretion to amend or supplement any of the terms at any time, and will give a prior notice of 30 days for such changes. The changed terms and conditions shall be communicated to you on the website, and by other acceptable modes of communication. By using Providential's services, you shall be deemed to have accepted the changed terms and conditions. You accept that the Courts in Noida alone shall have exclusive jurisdiction as regards to any claims or matters arising out of dealings with Providential.
                                    </p>

                                    <p>
                                        All disputes will be governed by the laws of India. In the event of dispute between You and Providential on accuracy of transaction details provided by you on the Providential Website, the transaction logs maintained by Providential back office will be the only source of data to verify the accuracy of such transactions. You understand and agree that these terms are in addition to, and not in derogation of, the applicable terms and conditions relating to your usage of any Providential services that you may be currently availing, or may avail in the future.
                                    </p>
                                </div>
                            </div>

                            {/* Liability Section */}
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Liability Of Providential
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        Providential shall not, in the absence of gross negligence on the part of Providential, be liable to you for any act, omission or delay by the mutual fund or for any claims which you may suffer or incur as a result of or in course or discharge by Providential or its employees, officers, directors, nominee or agent of Providential's duties. Without prejudice to the above, Providential shall not be held liable for any loss or damage or failure to comply or delay in complying with its obligations under the Terms & Conditions which is caused directly or indirectly by any event or circumstances beyond Providential's reasonable control. These include system failure, network errors, delay or loss of data due to the above and in circumstances of acts of God, floods, epidemics, quarantine, riot, civil commotion and/or war. You further agree that Providential shall not be held liable for any losses, damages, expenses, costs, liabilities and claims of whatsoever nature caused by fraudulent or unauthorized use or access of your personal information, and/or signatures. Providential will be under no duty to verify compliance with any restrictions on your investment powers. Providential will not be liable for any loss, damage, cost, charges or expenses directly or indirectly caused by reasons of any defects or imperfections or mechanical or other failure with relation to computer, cable, telex, telephone or postal system. While Providential will make every effort to have its computer systems available at all times, Providential makes no guarantees with respect to the availability of such systems. Providential will make every effort to resolve availability issues such as network problems, virus attacks etc. in an expeditious manner. Notwithstanding these, Providential will as such not be liable for any loss, damage, cost, charges or expenses directly or indirectly caused by reasons of lack of such availability. Providential shall not be liable for any loss or damage caused by reason of failures or delay of the mutual fund to deliver any units purchased even though payments have been made for the same, or failure or delay in making payment in respect of any units sold, though they may have been delivered and you shall hold Providential harmless and free from any claim in respect thereof. Providential shall also not be liable for any delay, failure or refusal of the mutual fund in registering or transferring units to your names or for any interest, dividend or other loss caused to you arising therefrom. In instances of third party claims, Providential shall not be liable for any failure/delay, wherein such claims/losses are arising due to a reason entirely attributable to an error or gross negligence of the mutual funds/BSE/AMC/RTA. Any information contained in Providential brochures or other materials or otherwise communicated by Providential shall not be construed as investment advice and that all decisions to purchase or sell units made by you shall be on the basis of personal judgment arrived at after due consideration. Providential does not in any manner:
                                    </p>

                                    <ul className="list-disc list-inside space-y-3 ml-4">
                                        <li>Guarantee payments on any units; or</li>
                                        <li>Guarantee liquidity of any units; or</li>
                                        <li>Make any offer to buy back any units; or</li>
                                        <li>Guarantees the redemption or repayment of any units on maturity; or</li>
                                        <li>Guarantees the payments of interest or dividend; or</li>
                                        <li>Promise, indicate or guarantee any returns; or</li>
                                        <li>Guarantee any good delivery; or</li>
                                        <li>Subscribe to units of mutual funds on behalf or in name of user or collects payments from user for the units so purchased by user for remitting it further to the AMCs; or</li>
                                        <li>Receive any account statement from mutual funds/AMCs, on behalf of or in the users name pertaining to the units; or</li>
                                        <li>Redeem /sell the units held by user or on its behalf or in its name; or</li>
                                        <li>Unilaterally instruct the mutual fund and/or the corresponding AMCs with regards to nomination/changes in investments plan/any other changes; or</li>
                                        <li>Sign any document on behalf of or in the name of user for purchase, sale or redemption of units; or</li>
                                        <li>Collect, receive and / or give receipts and discharges for any sum including dividend, interest or income arising from the units and does not sign and/or endorse dividend and interest warrants on my/our behalf or in my/our name; or</li>
                                        <li>Correspond with or gives notice to the mutual fund/AMCs on behalf of or in the name of user, except for transmission of transactions done or purported to be done by user on the online technology platform.</li>
                                    </ul>

                                    <p>
                                        Providential does not make any promises to the user basis the graphical representation provided on the Website. The data collected from you to calculate the prospective investments amount is in relation to the past investment history of the user and shall not be construed as an authoritative advice to the user. Providential does not offer any advice and nothing herein or on the Providential Website shall be construed as investment advice by user. Any sum invested through Providential registered account is not a deposit with Providential and is not bank insured. The same is not endorsed or guaranteed and does not constitute obligations of Providential or any of the subsidiaries associates or affiliates companies whose role is only as described in the Terms & Conditions. Investments in mutual funds are subject to market risks, including the possible loss of principal amount invested. The value of the units purchased or not purchased will fluctuate. If you redeems the units/shares purchased, you may receive more or less than what you have/had paid depending upon NAV of the units in the fund or trust at the time of redemption. Past results are not a guarantee to future performance. Past performance may or may not be sustained in the future.
                                    </p>
                                </div>
                            </div>

                            {/* Commission Disclosure Section */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    COMMISSION DISCLOSURE
                                </h3>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    COMMISSION DISCLOSURE
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        As per SEBI circular dated 30-06-2009, distributors should disclose all the commissions (including in the form of trail commission or any other mode) payable to them for different competing schemes of various mutual funds from among which a scheme is recommended to the client. You are requested to refer to the scheme details section on our mobile application and web portal while doing transaction to know the commission structures of the scheme.
                                    </p>
                                </div>
                            </div>

                            {/* Partner Onboarding Fee Cancellation Policy Section */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    Partner Onboarding Fee Cancellation Policy
                                </h3>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Partner Onboarding Fee Cancellation Policy
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            Cancellation timeline:
                                        </h3>
                                        <p>
                                            The partner can request for cancellation within 3 working days of payment of the fee. On cancellation, the partner will be required to return all the material shared by Nivesh.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            Cancellation process:
                                        </h3>
                                        <p>
                                            To cancel an order, customers must contact our customer support team at distributorsupport@nivesh.com with the order details. The customer support team will verify the eligibility of the order for cancellation and process the cancellation if applicable.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            Cancellation charges:
                                        </h3>
                                        <p>
                                            A processing fee of Rs. 200 will be charged on each cancellation.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Refund Section */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-[#243062] mb-6 md:hidden">
                                    Refund of Partner Onboarding Fee
                                </h3>
                                <h2 className="hidden md:block text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                    Refund of Partner Onboarding Fee
                                </h2>

                                <div className="space-y-6 text-base md:text-lg text-neutral-700 leading-relaxed">
                                    <p>
                                        Refund will be applicable only on valid cancellations
                                    </p>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            Refund method:
                                        </h3>
                                        <p>
                                            Refunds will be processed through the same payment method that was used to make the initial purchase.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            Refund timeline:
                                        </h3>
                                        <p>
                                            Refunds will be processed within 7 business days from the date of the refund request.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-[#243062] mb-4">
                                            Refund amount:
                                        </h3>
                                        <p>
                                            The refund amount will be equal to the original purchase price, minus any applicable fees or charges wherever applicable
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsAndConditions;

