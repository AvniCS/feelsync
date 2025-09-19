import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard.jsx";
import Journal from "./pages/journal.jsx";
import Community from "./pages/community.jsx";
import Meditation from "./pages/meditation.jsx";
import Travel from "./pages/travel.jsx";
import Planner from "./pages/planner.jsx";
import Layout from "./layout.jsx";
import FinanceDashboard from './pages/finance.jsx';
import StudyPlanner from "./pages/study-planner.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/community" element={<Community />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/finance" element={<FinanceDashboard />} />
        <Route path="/study-planner" element={<StudyPlanner />} />
      </Routes>
    </Layout>
  );
}

export default App;






