import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  const showBackButton = location.pathname !== "/";

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        {showBackButton && (
          <button onClick={handleBackClick} style={styles.backButton}>
            Atgal
          </button>
        )}
      </div>

      <div style={styles.center}>
        <h1 style={styles.title}>Vilnius Tech Žemėlapis</h1>
      </div>

      <div style={styles.right}>
        <Link to="/comment" style={{ textDecoration: "none" }}>
        <button onClick={handleBackClick} style={styles.commentButton}>
          Susisiekite su mumis
        </button>
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
