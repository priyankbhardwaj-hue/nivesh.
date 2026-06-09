import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import NiveshTeams from './pages/NiveshTeams';
import Partner from './pages/partner/Partner';
import PNBHousingFinance from './pages/partners/PNBHousingFinance';
import HDFCLimited from './pages/partners/HDFCLimited';
import ICICIHomeFinance from './pages/partners/ICICIHomeFinance';
import ShriramTransportFinance from './pages/partners/ShriramTransportFinance';
import BajajFinance from './pages/partners/BajajFinance';
import MahindraFinance from './pages/partners/MahindraFinance';
import AllAboutAMFIARN from './pages/partner/AllAboutAMFIARN';
import BecomeMutualFundDistributors from './pages/partner/BecomeMutualFundDistributors';
import GrowYourMutualFund from './pages/partner/GrowYourMutualFund';
import SpecializedInvestmentFund from './pages/products/SpecializedInvestmentFund';
import MarketLinkedDebentures from './pages/products/MarketLinkedDebentures';
import PreOwnedPolicies from './pages/products/PreOwnedPolicies';
import GiftCity from './pages/products/GiftCity';
import UnlistedShares from './pages/products/UnlistedShares';
import FixedDeposit from './pages/products/FixedDeposit';
import AlternativeInvestmentFund from './pages/products/AlternativeInvestmentFund';
import NationalPensionScheme from './pages/products/NationalPensionScheme';
import Bond from './pages/products/Bond';
import LoanAgainstSecurities from './pages/products/LoanAgainstSecurities';
import PMS from './pages/products/PMS';
import NISMCertificationExam from './pages/partner/NISMCertificationExam';
import PlanForRetirement from './pages/footer/goals/PlanForRetirement';
import SaveForChildren from './pages/footer/goals/SaveForChildren';
import SaveTax from './pages/footer/goals/SaveTax';
import BuildLongTermWealth from './pages/footer/goals/BuildLongTermWealth';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import DataSecurity from './pages/footer/quicklinks/DataSecurity';
import ContactUs from './pages/footer/quicklinks/ContactUs';
import Careers from './pages/footer/quicklinks/Careers';
import CareerApply from './pages/footer/quicklinks/CareerApply';
import Calculators from './pages/footer/quicklinks/Calculators';
import TheNiveshPlatform from './pages/TheNiveshPlatform';
import ForMFDs from './pages/partner/ForMFDs';
import MutualFunds from './pages/products/MutualFunds';
import BlogCategory from './pages/blog/BlogCategory';
import BlogDetail from './pages/blog/BlogDetail';
import NFOs from './pages/nfo/NFOs';
import NFOsDetail from './pages/nfo/NFOsDetail';
import TestimonialsPage from './pages/Testimonials';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/nivesh-teams" element={<NiveshTeams />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/fixed-deposit/pnb-housing-finance-ltd" element={<PNBHousingFinance />} />
          <Route path="/fixed-deposit/hdfc-ltd" element={<HDFCLimited />} />
          <Route path="/fixed-deposit/icici-home-finance-co-ltd" element={<ICICIHomeFinance />} />
          <Route path="/fixed-deposit/shriram-transport-finance-company-ltd" element={<ShriramTransportFinance />} />
          <Route path="/fixed-deposit/bajaj-finance-ltd" element={<BajajFinance />} />
          <Route path="/fixed-deposit/mahindra-finance-limited" element={<MahindraFinance />} />
          <Route path="/partner/all-about-amfi-arn-code" element={<AllAboutAMFIARN />} />
          <Route path="/partner/become-mutual-fund-distributors" element={<BecomeMutualFundDistributors />} />
          <Route path="/partner/grow-your-mutual-fund" element={<GrowYourMutualFund />} />
          <Route path="/products/specialized-investment-fund" element={<SpecializedInvestmentFund />} />
          <Route path="/market-linked-debentures" element={<MarketLinkedDebentures />} />
          <Route path="/pre-owned-policies" element={<PreOwnedPolicies />} />
          <Route path="/gift-city" element={<GiftCity />} />
          <Route path="/unlisted-shares" element={<UnlistedShares />} />
          <Route path="/fixed-deposit" element={<FixedDeposit />} />
          <Route path="/alternative-investment-fund" element={<AlternativeInvestmentFund />} />
          <Route path="/national-pension-scheme" element={<NationalPensionScheme />} />
          <Route path="/bond" element={<Bond />} />
          <Route path="/loans/loan-against-securities" element={<LoanAgainstSecurities />} />
          <Route path="/pms" element={<PMS />} />
          <Route path="/nism-certification-exam" element={<NISMCertificationExam />} />
          <Route path="/plan-for-retirement" element={<PlanForRetirement />} />
          <Route path="/save-for-children" element={<SaveForChildren />} />
          <Route path="/save-tax" element={<SaveTax />} />
          <Route path="/build-long-term-wealth" element={<BuildLongTermWealth />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-and-policy" element={<PrivacyPolicy />} />
          <Route path="/data-security" element={<DataSecurity />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/career" element={<Careers />} />
          <Route path="/career/apply/:id" element={<CareerApply />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/the-nivesh-platform" element={<TheNiveshPlatform />} />
          <Route path="/for-mfds" element={<ForMFDs />} />
          <Route path="/mutual-funds" element={<MutualFunds />} />
          <Route path="/blog" element={<BlogCategory />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/nfos" element={<NFOs />} />
          <Route path="/nfo/:id" element={<NFOsDetail />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>
    </Layout>
    </BrowserRouter>
  );
};

export default App;
