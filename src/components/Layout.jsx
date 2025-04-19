import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const { pathname } = useLocation();

  
  const colors = {
    primary: "#9333EA", // Deep Purple
    secondary: "#C05898", // Light purple
    background: "#09090B", // Almost Black
    text: "#E2E8F0", // Light Gray
    paragraph: "#A1A1AA", // Muted Gray
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      style={{ backgroundColor: "white" }}
    className="flex  flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;