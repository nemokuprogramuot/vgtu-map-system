import React from "react";
const Navbar = () => {

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Vilnius Tech Žemėlapis</h1>
      
        <button
        style={styles.backButton}
        >
          Atgal
        </button>
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
    justifyContent: "center",
    fontSize: "20px",
  },
  title: {
    margin: 0,
  },
  backButton: {
    backgroundColor: "blue", 
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "5px",
    position: "absolute", 
    left: "20px", 
  },
};

export default Navbar;