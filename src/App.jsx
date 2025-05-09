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
import StepByStepCalculator from './pages/features/Step';
import ElementaryMathTool from './pages/features/Elementarymath';
import Algebra from './pages/features/Algebra';
import GraphPlotter from './pages/features/Plots';
import CalculusSolver from './pages/features/Calculus';
import Geometry from './pages/features/Geometry';
import DifferentialEquationSolver from './pages/features/Differential';
import Statistics from './pages/features/Static';
import PhysicsAssistant from './pages/features/Physics';
import ChemistryAssistant from './pages/features/Chemistry';
import UnitConverter from './pages/features/Units';
import EngineeringAssistant from './pages/features/Engineering';
import ComputationalScienceAssistant from './pages/features/ComputationalS';
import EarthScienceAssistant from './pages/features/EarthSciences';
import MaterialScienceAssistant from './pages/features/MaterialSciences';
import TransportationAssistant from './pages/features/Transportation';
import HistoryAi from './pages/features/Historical';
import NutritionAi from './pages/features/Nutrition';
import DemographicEventAi from './pages/features/Demographics';
import MoneyFinanceAi from './pages/features/Money';
import DateTimeAi from './pages/features/Dates';
import WordsLinguisticsAi from './pages/features/Words';
import ArtsMediaAi from './pages/features/Arts';
import HealthAi from './pages/features/Health';
import FinanceAi from './pages/features/Financial';
import SurpriseAi from './pages/features/Surprices';
import EntertainmentAi from './pages/features/Entertainment';
import HouseholdAi from './pages/features/HouseScience';
import HouseholdMath from './pages/features/HouseHoldMath';
import HobbiesAi from './pages/features/Hobbies';
import WorldNewsAi from './pages/features/WorldNewsAi';





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
                    <Route path="pricing/standard" element={<PricingEnterprice />} />
                    <Route path="pricing/premium" element={<PricingPro />} />
<Route path="/math/step-by-step" element={<StepByStepCalculator />} />
      <Route path="/math/elementary" element={<ElementaryMathTool />} />
      <Route path="/math/algebra" element={<Algebra/>} />
      <Route path="/math/plotting" element={<GraphPlotter />} />
      <Route path="/math/calculus" element={<CalculusSolver />} />
      <Route path="/math/geometry" element={<Geometry/>} />
      <Route path="/math/differential-equations" element={<DifferentialEquationSolver />} />
      <Route path="/math/statistics" element={<Statistics />} />


      <Route path="/science/units" element={<UnitConverter/>} />
      <Route path="/science/physics" element={<PhysicsAssistant />} />
      <Route path="/science/chemistry" element={<ChemistryAssistant />} />
      <Route path="/science/engineering" element={<EngineeringAssistant />} />
      <Route path="/science/computational" element={<ComputationalScienceAssistant />} />
      <Route path="/science/earth" element={<EarthScienceAssistant />} />
      <Route path="/science/materials" element={<MaterialScienceAssistant />} />
      <Route path="/science/transportation" element={<TransportationAssistant />} />



      <Route path="/society/history" element={<HistoryAi />} />
      <Route path="/society/food" element={<NutritionAi />} />
      <Route path="/society/geography" element={<DemographicEventAi />} />
      <Route path="/society/money" element={<MoneyFinanceAi />} />
      <Route path="/society/dates" element={<DateTimeAi />} />
      <Route path="/society/linguistics" element={<WordsLinguisticsAi />} />
      <Route path="/society/arts" element={<ArtsMediaAi />} />


      <Route  path="/daily/health" element={<HealthAi />} />
      <Route path="/daily/personal-finance" element={<FinanceAi />} />
      <Route path="/daily/surprises" element={<SurpriseAi />} />
      <Route path="/daily/entertainment" element={<EntertainmentAi />} />
      <Route path="/daily/household-science" element={<HouseholdAi />} />
      <Route path="/daily/household-math" element={<HouseholdMath/>} />
      <Route path="/daily/hobbies" element={<HobbiesAi />} />
      <Route path="/daily/world" element={<WorldNewsAi />} />



        
      
          



        
          
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