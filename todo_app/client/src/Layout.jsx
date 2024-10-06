import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function Layout({ user, onLogout }) {
  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
