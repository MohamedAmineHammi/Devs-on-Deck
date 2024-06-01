
import './App.css';
import { Routes, Route } from 'react-router-dom';
import DevRegister from './components/devRegister';
import OrgRegister from './components/orgRegister';
import AddPosition from './components/addPosition';
import AddSkills from './components/addSkills';
import DevDashboard from './components/devDashboard';
import DevLogin from './components/devLogin';
import JobAvailability from './components/jobAvailability';
import OrgDashboard from './components/orgDashboard';
import OrgLogin from './components/orgLogin';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<DevRegister />} />
        <Route path='/orgs/register' element={<OrgRegister />} />
        <Route path='/orgs/login' element={<OrgLogin />} />
        <Route path='/devs/login' element={<DevLogin />} />
        <Route path='/devs/dashboard/:id' element={<DevDashboard />} />
        <Route path='/orgs/dashboard/:id' element={<OrgDashboard />} />
        <Route path='/orgs/job/:id' element={<JobAvailability />} />
        <Route path='/devs/skills/:id' element={<AddSkills />} />
        <Route path='/orgs/jobs/new/:id' element={<AddPosition />} />
      </Routes>
    </div>
  );
}

export default App;
