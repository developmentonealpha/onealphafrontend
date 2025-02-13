import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

const Navigation = () => {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  // const isLoggedIn =
  //   location.pathname === "/dashboard" || location.pathname === "/comparison";

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const links = [
    { name: "Home", path: "/", show: isHome ? false : true },
    { name: "The Works", path: "/works", show: isHome ? false : true },
    {
      name: "Get Enlightened",
      path: "/enlightened",
      show: isHome ? false : true,
    },
    { name: "The People", path: "/people", show: isHome ? false : true },
    {
      name: isAuthenticated ? "Dashboard" : null,
      path: isAuthenticated ? "/dashboard" : null,
      show: isHome ? false : true,
    },
    {
      name: isAuthenticated ? "Logout" : "Login",
      path: isAuthenticated ? "/" : "/login",
      show: true,
      onClick: isAuthenticated ? handleLogout : undefined,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-trading-background/80 backdrop-blur-lg  border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img
              src="/uploads/logo.png"
              alt="Logo"
              className="h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link font-funnel text-lg ${
                  location.pathname === link.path
                    ? "text-trading-primary active-nav-link"
                    : ""
                }`}
                onClick={link.onClick || (() => navigate(link.path))}
              >
                {link.show && link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-trading-background border-t border-white/10">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 text-white hover:text-trading-primary font-funnel ${
                  location.pathname === link.path ? "text-trading-primary" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
