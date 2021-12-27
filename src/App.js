import React from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";
import CookiePolicy from "./components/CookiePolicy";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main className="mb-5">
        <div className="container">
          <Header/>
          <Dashboard/>
          <Reports/>
        </div>
      </main>
      <CookiePolicy/>
      <Footer/>
    </>
  );
}

export default App;
