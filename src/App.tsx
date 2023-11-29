import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import UncontrolledForm from './components/forms/uncontrolled';
import ControlledForm from './components/forms/controlled';
import Main from './components/main';
import './index.scss';
import Navigation from './components/navigation';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
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
  </Provider>
);
