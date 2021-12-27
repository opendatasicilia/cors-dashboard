import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";
import CookiePolicy from "./components/CookiePolicy";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <main className="mb-5">
        <div className="container">
          <Header/>
          <Routes>
            <Route exact path="/" element={<Dashboard/>} />
            <Route path="/comune/:input" element={<Dashboard />} />
            <Route path='*' element={<Dashboard />} />
          </Routes>
          <Reports/>
        </div>
      </main>
      <CookiePolicy/>
      <Footer/>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);