import React from "react";
import { Link } from 'react-router-dom';
import "../Css/Nav.css";



function Nav() {

  let hamburgerIcon = "hamburger.png"
  let logoIcon = "logo.png"

  return (
    
    <nav class="navbar">
    <button type="button" class="navbar-burger">
    <img src={`https://localhost:7127/images/${encodeURIComponent(hamburgerIcon)}`} className="hamburger-menu"></img>
    </button>

    <img src={`https://localhost:7127/images/${encodeURIComponent(logoIcon)}`} className="logo"></img>
    <nav class="navbar-menu">
      <Link to="/games">Games</Link>
      <Link to="/characters">Characters</Link>
      <Link to="/developers">Developers</Link>
      <Link to ="/quiz">Game Quiz</Link>
    </nav>
  </nav>
  );
}

export default Nav;