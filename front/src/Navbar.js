import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    setAuth(isAuthenticated());
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/');
  };

  const showBackButton = location.pathname !== "/";
  const showLoginButton = location.pathname === "/" && !auth;
  const showCommentsButton = location.pathname === "/" && auth;
  const showLogoutButton = location.pathname === "/comments" && auth;

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        {showBackButton && (
          <button onClick={() => navigate(-1)} style={styles.backButton}>
            Atgal
          </button>
        )}
        {showLoginButton && (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button style={styles.loginButton}>Prisijungti</button>
          </Link>
        )}
        {showCommentsButton && (
          <Link to="/comments" style={{ textDecoration: "none" }}>
            <button style={styles.loginButton}>Komentarai</button>
          </Link>
        )}
        {showLogoutButton && (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Atsijungti
          </button>
        )}
      </div>

      <div style={styles.center}>
        <h1 style={styles.title}>Vilnius Tech Žemėlapis</h1>
      </div>

      <div style={styles.right}>
        <Link to="/comment" style={{ textDecoration: "none" }}>
          <button style={styles.commentButton}>Susisiekite su mumis</button>
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#1E90FF",
    padding: "10px 20px",
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  left: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
  },
  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  title: {
    margin: 0,
    fontSize: "20px",
  },
  backButton: {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  loginButton: {
    backgroundColor: "white",
    color: "blue",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  logoutButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  commentButton: {
    backgroundColor: "white",
    color: "blue",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Navbar;