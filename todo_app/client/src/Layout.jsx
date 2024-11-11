import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

function Layout({ user, onLogout }) {
  return (
    <div
      className="flex flex-col min-h-screen w-full"
      // style={{minWidth:"500px",width:"auto"}}
    >
      <ScrollToTop />
      <Header user={user} onLogout={onLogout} />
      <main className="flex-grow w-full max-w-screen-3xl mx-auto px-8 sm:px-16 lg:px-4 py-2 lg:py-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Layout;
