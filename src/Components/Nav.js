import React from "react";
import { Link } from 'react-router-dom';
import "../Css/Nav.css";

function Nav() {
  return (
    
    <nav class="navbar">

    <button type="button" class="navbar-burger">
      <span class="material-icons">HamMeny</span>
    </button>

    <h1 class="navbar-title"> </h1>
    <nav class="navbar-menu">
      <button type="button"><Link to="/games">Games</Link></button>
      <button type="button" class="active"><Link to="/characters">Characters</Link></button>
      <button type="button"><Link to="/developers">Developers</Link></button>
      <button type="button"><Link to ="/quiz">Game Quiz</Link></button>
    </nav>
  </nav>
  );
}

export default Nav;