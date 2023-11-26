import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UncontrolledForm from './components/forms/uncontrolled';
import ControlledForm from './components/forms/controlled';
import Main from './components/main';
import './index.css';
import Navigation from './components/navigation';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="container">
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/controlled-form" element={<ControlledForm />} />
      </Routes>
    </Router>
  </div>
);
