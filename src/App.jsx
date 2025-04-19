import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from  './pages/NotFound';
import Privacy from   './pages/Privacy';
import Terms from     './pages/Terms';
import Aboutus from   './pages/Aboutus';






import ProtectedRoute from './components/ProtectedRoute';



import Docs from './pages/Docs';
import AICalculator from './pages/features/Arithmetic';
import BasicCalculation from './pages/features/Basic';
import PercentageCalculator from './pages/features/Fractionals';
import NumberTheoryQA from './pages/features/Numbers';
import DecimalCalculation from './pages/features/Decimals';
import PrimeFactorization from './pages/features/PrimeFactor';
import PhysicsAssistant from './pages/features/Physics';
import ElectricityCircuits from './pages/features/Electricity';
import BiologyAi from './pages/features/Biology';
import ChemistryAssistant from './pages/features/Chemistry';
import HistoryAi from './pages/features/Historical';
import TimeDateAi from './pages/features/Time';
import CulturalEventAi from './pages/features/Cultural';
import DemographicEventAi from './pages/features/Demographics';
import HealthAi from './pages/features/Health';
import NutritionAi from './pages/features/Nutrition';
import FinanceAi from './pages/features/Financial';
import CurrencyConverter from './pages/features/CurrencyConversion';
import DashboardC from './pages/DashboardC';


import PricingBasic from './pages/PricingBasic';
import PricingEnterprice from './pages/PricingEnterprice';
import PricingPro from './pages/PricingPro';









function App() {
  return (  
    <Routes>
     <Route path="/admin/*" element={<DashboardC />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="docs" element={<Docs />} />

          
        
          
            
          
        
          
      <Route path="pricing" element={<Pricing />} />
     
      
        <Route element={<ProtectedRoute />}>

 <Route path="pricing/basic" element={<PricingBasic />} />
                    <Route path="pricing/enterprise" element={<PricingEnterprice />} />
                    <Route path="pricing/pro" element={<PricingPro />} />

      <Route path="math/arithmetic" element={<AICalculator/>} />
      <Route path="math/basic-ops" element={<BasicCalculation />} />
      <Route path="math/percentages" element={<PercentageCalculator />} />
      <Route path="math/fractions" element={<DecimalCalculation />} />
      <Route path="math/number-theory" element={<NumberTheoryQA />} />
      <Route path="math/prime-factors" element={<PrimeFactorization />} />
      <Route path="science/physics" element={<PhysicsAssistant />} />
      <Route path="science/electricity" element={<ElectricityCircuits />} />
      <Route path="science/biology" element={<BiologyAi />} />
      <Route path="science/chemistry" element={<ChemistryAssistant />} />
      <Route path="society/history" element={<HistoryAi />} />
      <Route path="society/time" element={<TimeDateAi />} />
      <Route path="society/events" element={<CulturalEventAi />} />
      <Route path="society/demographics" element={<DemographicEventAi />} />
      <Route path="daily/health" element={<HealthAi />} />
      <Route path="daily/nutrition" element={<NutritionAi />} />
      <Route path="daily/finance" element={<FinanceAi />} />
      <Route path="daily/currency" element={<CurrencyConverter />} />
      
          



        
          
        </Route>
        
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="privacy" element={<Privacy/>} />
        <Route path="terms" element={<Terms/>} />
        <Route path="aboutus" element={<Aboutus/>} />
        
        
        <Route path="*" element={<NotFound />} />
      
      
      


      </Route>
    </Routes>
  );
}

export default App;